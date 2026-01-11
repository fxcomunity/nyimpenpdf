import { useState } from "react";
import files from "../data/files";

export default function Home() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const categories = ["All", ...new Set(files.map(f => f.category))];

  const filtered = files.filter(
    f =>
      (cat === "All" || f.category === cat) &&
      f.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1000, margin: "auto", padding: 20 }}>
      <h1>📂 PDF Library</h1>

      <input
        placeholder="Search PDF..."
        onChange={e => setQ(e.target.value)}
        style={{ padding: 10, width: "100%", marginBottom: 10 }}
      />

      <select onChange={e => setCat(e.target.value)} style={{ padding: 10 }}>
        {categories.map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <ul>
        {filtered.map(f => (
          <li key={f.slug}>
            <a href={`/file/${f.slug}`}>{f.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
