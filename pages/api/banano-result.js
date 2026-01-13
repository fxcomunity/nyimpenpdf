import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const {
      order_code,
      language = "id",
      version = "4",
      age = "18+-+24",
      gender = "Laki-laki",
      token,
    } = req.query;

    if (!order_code) return res.status(400).json({ error: "order_code wajib" });
    if (!token) return res.status(400).json({ error: "token wajib (Bearer token dari start step)" });

    const api = axios.create({
      baseURL: "https://api.bananoai.store",
      headers: {
        "user-agent": "Linux",
        "accept-encoding": "gzip",
        authorization: `Bearer ${token}`,
      },
      timeout: 20_000,
    });

    const { data } = await api.get("/image/generate_result", {
      params: { order_code, language, age, gender, version },
    });

    const status = data?.data?.status;

    if (status === 1 && Array.isArray(data?.data?.image_result) && data.data.image_result.length) {
      return res.status(200).json({ ok: true, status: 1, resultUrl: data.data.image_result[0] });
    }

    // masih proses
    if (status === -1) return res.status(200).json({ ok: true, status: -1 });

    return res.status(200).json({ ok: false, status, detail: data });
  } catch (e) {
    return res.status(500).json({ error: "Server error", detail: e?.message || String(e) });
  }
}
