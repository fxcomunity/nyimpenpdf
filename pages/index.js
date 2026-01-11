import { useState } from "react";
import Head from "next/head";
import files from "../data/files";

// FeedbackPopup Component - Floating button in bottom right
function FeedbackPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      alert("Mohon isi nama dan keluhan terlebih dahulu!");
      return;
    }

    // Format message for WhatsApp
    const waMessage = `*Feedback dari PDF Library*\n\nNama: ${name}\nKeluhan: ${message}`;
    const waNumber = "6289540414752";
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
    
    // Open WhatsApp
    window.open(waUrl, "_blank");
    
    // Reset form and close
    setName("");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "clamp(1rem, 3vw, 2rem)",
          right: "clamp(1rem, 3vw, 2rem)",
          width: "clamp(56px, 15vw, 64px)",
          height: "clamp(56px, 15vw, 64px)",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          color: "white",
          border: "none",
          boxShadow: "0 4px 20px rgba(34, 197, 94, 0.4)",
          cursor: "pointer",
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s",
          zIndex: 999
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)";
          e.target.style.boxShadow = "0 6px 30px rgba(34, 197, 94, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 4px 20px rgba(34, 197, 94, 0.4)";
        }}
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Popup Form */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "clamp(5rem, 20vw, 6rem)",
            right: "clamp(1rem, 3vw, 2rem)",
            width: "min(90vw, 380px)",
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(51, 65, 85, 0.8)",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
            zIndex: 998,
            animation: "slideUp 0.3s ease-out"
          }}
        >
          <h3 style={{
            color: "#e2e8f0",
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "0.5rem"
          }}>
            💬 Feedback & Keluhan
          </h3>
          <p style={{
            color: "#94a3b8",
            fontSize: "0.875rem",
            marginBottom: "1rem"
          }}>
            Ada masalah atau saran? Hubungi admin
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "0.75rem" }}>
              <input
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "rgba(30, 41, 59, 0.5)",
                  border: "2px solid #334155",
                  borderRadius: "0.5rem",
                  color: "#e2e8f0",
                  outline: "none",
                  transition: "all 0.2s",
                  fontSize: "0.875rem",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                onBlur={(e) => e.target.style.borderColor = "#334155"}
              />
            </div>
            
            <div style={{ marginBottom: "0.75rem" }}>
              <textarea
                placeholder="Tulis keluhan atau saran..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "rgba(30, 41, 59, 0.5)",
                  border: "2px solid #334155",
                  borderRadius: "0.5rem",
                  color: "#e2e8f0",
                  outline: "none",
                  transition: "all 0.2s",
                  fontSize: "0.875rem",
                  boxSizing: "border-box",
                  resize: "vertical",
                  fontFamily: "inherit"
                }}
                onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                onBlur={(e) => e.target.style.borderColor = "#334155"}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "600",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.background = "#16a34a"}
              onMouseLeave={(e) => e.target.style.background = "#22c55e"}
            >
              Kirim ke WhatsApp
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

// Main Home Component
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
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>📂 PDF Library - Trading & ICT Resources</title>
        <meta name="description" content="Koleksi lengkap materi trading, ICT, crypto, dan market analysis" />
      </Head>

      <div style={{ 
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Animated background effects */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: "25%",
            width: "min(384px, 50vw)",
            height: "min(384px, 50vw)",
            background: "rgba(59, 130, 246, 0.1)",
            borderRadius: "50%",
            filter: "blur(96px)",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          }}></div>
          <div style={{
            position: "absolute",
            bottom: 0,
            right: "25%",
            width: "min(384px, 50vw)",
            height: "min(384px, 50vw)",
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
          padding: "clamp(1rem, 5vw, 3rem) clamp(0.75rem, 3vw, 1rem)",
          width: "100%",
          boxSizing: "border-box"
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 3rem)" }}>
            <h1 style={{
              fontSize: "clamp(2rem, 8vw, 3.75rem)",
              fontWeight: "bold",
              background: "linear-gradient(to right, #60a5fa, #a78bfa, #f472b6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: "clamp(0.5rem, 2vw, 1rem)",
              lineHeight: "1.2"
            }}>
              📂 PDF Library
            </h1>
            <p style={{ 
              color: "#94a3b8", 
              fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
              padding: "0 1rem",
              maxWidth: "600px",
              margin: "0 auto"
            }}>
              Koleksi lengkap materi trading, ICT, crypto, dan market analysis
            </p>
            <div style={{ 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(1rem, 3vw, 1.5rem)",
              marginTop: "clamp(1rem, 3vw, 1.5rem)",
              fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
              flexWrap: "wrap"
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
            padding: "clamp(1rem, 3vw, 1.5rem)",
            marginBottom: "clamp(1.5rem, 4vw, 2rem)"
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
              gap: "clamp(0.75rem, 2vw, 1rem)"
            }}>
              {/* Search Input */}
              <input
                type="text"
                placeholder="Cari dokumen..."
                value={q}
                onChange={e => setQ(e.target.value)}
                style={{
                  width: "100%",
                  padding: "clamp(0.75rem, 2vw, 0.875rem) clamp(0.875rem, 2.5vw, 1rem)",
                  background: "rgba(15, 23, 42, 0.5)",
                  border: "2px solid #334155",
                  borderRadius: "0.75rem",
                  color: "#e2e8f0",
                  outline: "none",
                  transition: "all 0.2s",
                  fontSize: "clamp(0.875rem, 2vw, 1rem)",
                  boxSizing: "border-box"
                }}
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e => e.target.style.borderColor = "#334155"}
              />

              {/* Category Select */}
              <select
                value={cat}
                onChange={e => setCat(e.target.value)}
                style={{
                  width: "100%",
                  padding: "clamp(0.75rem, 2vw, 0.875rem) clamp(0.875rem, 2.5vw, 1rem)",
                  background: "rgba(15, 23, 42, 0.5)",
                  border: "2px solid #334155",
                  borderRadius: "0.75rem",
                  color: "#e2e8f0",
                  outline: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontSize: "clamp(0.875rem, 2vw, 1rem)",
                  boxSizing: "border-box"
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

            {/* Stats */}
            <div style={{ 
              marginTop: "clamp(0.75rem, 2vw, 1rem)", 
              fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)", 
              color: "#94a3b8",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span>
                Menampilkan <span style={{ color: "#60a5fa", fontWeight: "600" }}>{filtered.length}</span> dari {files.length} dokumen
                {cat !== "All" && <span> dalam <span style={{ color: "#a78bfa", fontWeight: "600" }}>{cat}</span></span>}
              </span>
              {q && (
                <button
                  onClick={() => setQ("")}
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "transparent",
                    color: "#94a3b8",
                    border: "1px solid #334155",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => {
                    e.target.style.color = "#e2e8f0";
                    e.target.style.borderColor = "#60a5fa";
                  }}
                  onMouseLeave={e => {
                    e.target.style.color = "#94a3b8";
                    e.target.style.borderColor = "#334155";
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Results Grid */}
          {filtered.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: "clamp(0.75rem, 2vw, 1rem)"
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
                      padding: "clamp(1rem, 3vw, 1.25rem)",
                      textDecoration: "none",
                      transition: "all 0.3s",
                      cursor: "pointer",
                      display: "block",
                      boxSizing: "border-box"
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
                      transition: "color 0.2s",
                      fontSize: "clamp(0.875rem, 2.2vw, 1rem)",
                      lineHeight: "1.4",
                      wordBreak: "break-word"
                    }}>
                      {f.title.replace('.pdf', '')}
                    </h3>
                    <span style={{
                      display: "inline-block",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "0.375rem",
                      fontSize: "clamp(0.7rem, 1.8vw, 0.75rem)",
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
              padding: "clamp(2rem, 8vw, 3rem)",
              textAlign: "center"
            }}>
              <h3 style={{
                fontSize: "clamp(1rem, 3vw, 1.25rem)",
                fontWeight: "600",
                color: "#e2e8f0",
                marginBottom: "0.5rem"
              }}>
                Tidak ada dokumen ditemukan
              </h3>
              <p style={{ 
                color: "#94a3b8", 
                marginBottom: "1rem",
                fontSize: "clamp(0.875rem, 2vw, 1rem)"
              }}>
                Coba ubah kata kunci atau filter kategori
              </p>
              <button
                onClick={() => { setQ(""); setCat("All"); }}
                style={{
                  padding: "clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)",
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  fontSize: "clamp(0.875rem, 2vw, 1rem)"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#2563eb"}
                onMouseLeave={e => e.currentTarget.style.background = "#3b82f6"}
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Footer */}
          <div style={{
            marginTop: "clamp(2rem, 5vw, 3rem)",
            textAlign: "center",
            color: "#64748b",
            fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)",
            padding: "1rem 0"
          }}>
            <p>📚 Terus belajar dan tingkatkan skill trading Anda</p>
          </div>
        </div>

        {/* Floating Feedback Popup */}
        <FeedbackPopup />

        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }

          @media (max-width: 640px) {
            h1 {
              word-break: break-word;
            }
          }

          * {
            -webkit-tap-highlight-color: transparent;
          }
        `}</style>
      </div>
    </>
  );
}
