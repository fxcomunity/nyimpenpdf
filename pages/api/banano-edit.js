import axios from "axios";
import crypto from "crypto";
import FormData from "form-data";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const {
      prompt,
      imageBase64,
      mimeType = "image/jpeg",
      language = "id",
      version = "4",
      age = "18+-+24",
      gender = "Laki-laki",
    } = req.body || {};

    if (!prompt || !imageBase64) {
      return res.status(400).json({ error: "prompt dan imageBase64 wajib diisi" });
    }

    const deviceId = crypto.randomBytes(16).toString("hex");
    const devices = ["Infinix X6833B", "Samsung SM-A536E", "Xiaomi Redmi Note 12", "Oppo A78"];
    const deviceName = devices[Math.floor(Math.random() * devices.length)];

    const api = axios.create({
      baseURL: "https://api.bananoai.store",
      headers: { "user-agent": "Linux", "accept-encoding": "gzip" },
      timeout: 30_000,
    });

    const { data: auth } = await api.post(`/user/login?language=${language}&version=${version}`, {
      device_id: deviceId,
      platform: "android",
      device_name: deviceName,
      provider: "guest",
      uid: "",
      name: "",
      avatar: "",
      exp: {},
    });

    if (!auth?.token) return res.status(500).json({ error: "Failed to authenticate", detail: auth });

    api.defaults.headers.authorization = `Bearer ${auth.token}`;

    const imgBuffer = Buffer.from(imageBase64, "base64");
    const form = new FormData();
    form.append("prompt", prompt);
    form.append("image_portrait", imgBuffer, {
      filename: `image_${Date.now()}.${mimeType.includes("png") ? "png" : mimeType.includes("webp") ? "webp" : "jpg"}`,
      contentType: mimeType,
    });

    const { data: task } = await api.post(
      `/image/generate_ai_studio?language=${language}&age=${encodeURIComponent(age)}&gender=${encodeURIComponent(
        gender
      )}&version=${version}`,
      form,
      { headers: form.getHeaders() }
    );

    const orderCode = task?.data?.order_code;
    if (!orderCode) return res.status(500).json({ error: "Failed to start generation", detail: task });

    // ✅ balikin order_code aja (cepat, tidak polling)
    return res.status(200).json({ ok: true, order_code: orderCode });
  } catch (e) {
    return res.status(500).json({ error: "Server error", detail: e?.message || String(e) });
  }
}
