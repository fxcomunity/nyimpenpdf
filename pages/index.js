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

  const getCategoryColor = (category) => {
    const colors = {
      "Trading": "bg-blue-500",
      "ICT": "bg-purple-500",
      "Crypto": "bg-amber-500",
      "Market Update": "bg-green-500",
      "Mindset": "bg-pink-500"
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
      position: "relative"
    }}>
      {/* Animated background effects */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: "25%",
          width: "384px",
          height: "384px",
          background: "rgba(59, 130, 246, 0.1)",
          borderRadius: "50%",
          filter: "blur(96px)",
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: 0,
          right: "25%",
          width: "384px",
          height: "384px",
          background: "rgba(168, 85, 247, 0.1)",
          borderRadius: "50%",
          filter: "blur(96px)",
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          animationDelay: "1s"
        }}></div>
      </div>

      <div style={{ 
        position: "relative",
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "3rem 1rem"
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{
            fontSize: "3.75rem",
            fontWeight: "bold",
            background: "linear-gradient(to right, #60a5fa, #a78bfa, #f472b6)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "1rem"
          }}>
            📂 PDF Library
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.125rem" }}>
            Koleksi lengkap materi trading, ICT, crypto, dan market analysis
          </p>
          <div style={{ 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            marginTop: "1.5rem",
            fontSize: "0.875rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: "8px",
                height: "8px",
                background: "#22c55e",
                borderRadius: "50%",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
              }}></div>
              <span style={{ color: "#94a3b8" }}>{files.length} Dokumen</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: "8px",
                height: "8px",
                background: "#3b82f6",
                borderRadius: "50%",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
              }}></div>
              <span style={{ color: "#94a3b8" }}>{categories.length - 1} Kategori</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Box */}
        <div style={{
          background: "rgba(30, 41, 59, 0.5)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(51, 65, 85, 0.5)",
          borderRadius: "1rem",
          padding: "1.5rem",
          marginBottom: "2rem"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem"
          }}>
            {/* Search Input */}
            <div style={{ gridColumn: "span 2" }}>
              <input
                type="text"
                placeholder="Cari dokumen..."
                value={q}
                onChange={e => setQ(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  background: "rgba(15, 23, 42, 0.5)",
                  border: "2px solid #334155",
                  borderRadius: "0.75rem",
                  color: "#e2e8f0",
                  outline: "none",
                  transition: "all 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e => e.target.style.borderColor = "#334155"}
              />
            </div>

            {/* Category Select */}
            <div>
              <select
                value={cat}
                onChange={e => setCat(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  background: "rgba(15, 23, 42, 0.5)",
                  border: "2px solid #334155",
                  borderRadius: "0.75rem",
                  color: "#e2e8f0",
                  outline: "none",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e => e.target.style.borderColor = "#334155"}
              >
                {categories.map(c => (
                  <option key={c} value={c} style={{ background: "#0f172a" }}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats */}
          <div style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#94a3b8" }}>
            Menampilkan <span style={{ color: "#60a5fa", fontWeight: "600" }}>{filtered.length}</span> dari {files.length} dokumen
            {cat !== "All" && <span> dalam kategori <span style={{ color: "#a78bfa", fontWeight: "600" }}>{cat}</span></span>}
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem"
          }}>
            {filtered.map(f => {
              const colorClass = getCategoryColor(f.category);
              const bgColor = colorClass.replace("bg-", "");
              
              return (
                <a
                  key={f.slug}
                  href={`/file/${f.slug}`}
                  style={{
                    background: "rgba(30, 41, 59, 0.5)",
                    border: "1px solid rgba(51, 65, 85, 0.5)",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    textDecoration: "none",
                    transition: "all 0.3s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(30, 41, 59, 1)";
                    e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.5)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(30, 41, 59, 0.5)";
                    e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.5)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <h3 style={{
                    fontWeight: "600",
                    color: "#e2e8f0",
                    marginBottom: "0.5rem",
                    transition: "color 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                  onMouseLeave={e => e.currentTarget.style.color = "#e2e8f0"}
                  >
                    {f.title.replace('.pdf', '')}
                  </h3>
                  <span style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    background: bgColor === "blue-500" ? "rgba(59, 130, 246, 0.2)" :
                               bgColor === "purple-500" ? "rgba(168, 85, 247, 0.2)" :
                               bgColor === "amber-500" ? "rgba(245, 158, 11, 0.2)" :
                               bgColor === "green-500" ? "rgba(34, 197, 94, 0.2)" :
                               bgColor === "pink-500" ? "rgba(236, 72, 153, 0.2)" :
                               "rgba(107, 114, 128, 0.2)",
                    color: bgColor === "blue-500" ? "#60a5fa" :
                          bgColor === "purple-500" ? "#a78bfa" :
                          bgColor === "amber-500" ? "#fbbf24" :
                          bgColor === "green-500" ? "#4ade80" :
                          bgColor === "pink-500" ? "#f472b6" :
                          "#9ca3af"
                  }}>
                    {f.category}
                  </span>
                </a>
              );
            })}
          </div>
        ) : (
          <div style={{
            background: "rgba(30, 41, 59, 0.5)",
            border: "1px solid rgba(51, 65, 85, 0.5)",
            borderRadius: "1rem",
            padding: "3rem",
            textAlign: "center"
          }}>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#e2e8f0",
              marginBottom: "0.5rem"
            }}>
              Tidak ada dokumen ditemukan
            </h3>
            <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>
              Coba ubah kata kunci atau filter kategori
            </p>
            <button
              onClick={() => { setQ(""); setCat("All"); }}
              style={{
                padding: "0.5rem 1.5rem",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#2563eb"}
              onMouseLeave={e => e.currentTarget.style.background = "#3b82f6"}
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
