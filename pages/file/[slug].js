import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import files from "../../data/files";

export default function FilePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundFile = files.find(f => f.slug === slug);
      setFile(foundFile);
      setLoading(false);
    }
  }, [slug]);

  // Loading state
  if (loading || !slug) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ color: "#60a5fa", fontSize: "1.25rem" }}>Loading...</div>
      </div>
    );
  }

  // If file not found
  if (!file) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <title>File Not Found - PDF Library</title>
        </Head>
        <div style={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem"
        }}>
          <div style={{
            background: "rgba(30, 41, 59, 0.5)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(51, 65, 85, 0.5)",
            borderRadius: "1rem",
            padding: "3rem 2rem",
            textAlign: "center",
            maxWidth: "500px"
          }}>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              marginBottom: "1rem",
              color: "#e2e8f0"
            }}>404</h1>
            <h2 style={{
              color: "#e2e8f0",
              fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
              marginBottom: "0.5rem",
              fontWeight: "600"
            }}>
              File Tidak Ditemukan
            </h2>
            <p style={{
              color: "#94a3b8",
              marginBottom: "2rem",
              fontSize: "clamp(0.875rem, 2vw, 1rem)"
            }}>
              Maaf, file "{slug}" tidak tersedia.
            </p>
            <button
              onClick={() => router.push("/")}
              style={{
                padding: "0.75rem 2rem",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "500",
                transition: "background 0.2s"
              }}
              onMouseEnter={e => e.target.style.background = "#2563eb"}
              onMouseLeave={e => e.target.style.background = "#3b82f6"}
            >
              ← Kembali ke Home
            </button>
          </div>
        </div>
      </>
    );
  }

  // Convert Google Drive link to embeddable format
  const embedUrl = `https://drive.google.com/file/d/${file.id}/preview`;
  const driveUrl = `https://drive.google.com/file/d/${file.id}/view`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>{file.seoTitle || file.title} - PDF Library</title>
        <meta name="description" content={`Baca dan download ${file.title} - Materi ${file.category}`} />
      </Head>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
        position: "relative"
      }}>
        {/* Header */}
        <div style={{
          background: "rgba(30, 41, 59, 0.8)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(51, 65, 85, 0.5)",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}>
          <div style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap"
          }}>
            <button
              onClick={() => router.push("/")}
              style={{
                padding: "0.5rem 1rem",
                background: "rgba(59, 130, 246, 0.1)",
                color: "#60a5fa",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "clamp(0.875rem, 2vw, 0.95rem)",
                fontWeight: "500",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
              onMouseEnter={e => {
                e.target.style.background = "rgba(59, 130, 246, 0.2)";
                e.target.style.borderColor = "rgba(59, 130, 246, 0.5)";
              }}
              onMouseLeave={e => {
                e.target.style.background = "rgba(59, 130, 246, 0.1)";
                e.target.style.borderColor = "rgba(59, 130, 246, 0.3)";
              }}
            >
              ← Kembali
            </button>

            <div style={{ flex: "1", minWidth: "200px" }}>
              <h1 style={{
                color: "#e2e8f0",
                fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
                fontWeight: "600",
                margin: 0,
                wordBreak: "break-word"
              }}>
                {file.title.replace('.pdf', '')}
              </h1>
              <span style={{
                display: "inline-block",
                marginTop: "0.25rem",
                padding: "0.25rem 0.75rem",
                borderRadius: "0.375rem",
                fontSize: "clamp(0.7rem, 1.8vw, 0.75rem)",
                fontWeight: "500",
                background: file.category === "Trading" ? "rgba(59, 130, 246, 0.2)" :
                           file.category === "ICT" ? "rgba(168, 85, 247, 0.2)" :
                           file.category === "Crypto" ? "rgba(245, 158, 11, 0.2)" :
                           file.category === "Market Update" ? "rgba(34, 197, 94, 0.2)" :
                           "rgba(236, 72, 153, 0.2)",
                color: file.category === "Trading" ? "#60a5fa" :
                      file.category === "ICT" ? "#a78bfa" :
                      file.category === "Crypto" ? "#fbbf24" :
                      file.category === "Market Update" ? "#4ade80" :
                      "#f472b6"
              }}>
                {file.category}
              </span>
            </div>

            <a
              href={driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "0.5rem 1rem",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "clamp(0.875rem, 2vw, 0.95rem)",
                fontWeight: "500",
                textDecoration: "none",
                transition: "background 0.2s",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={e => e.target.style.background = "#2563eb"}
              onMouseLeave={e => e.target.style.background = "#3b82f6"}
            >
              Buka di Drive
            </a>
          </div>
        </div>

        {/* PDF Viewer */}
        <div style={{
          width: "100%",
          height: "calc(100vh - 80px)",
          position: "relative",
          background: "#1e293b"
        }}>
          <iframe
            src={embedUrl}
            style={{
              width: "100%",
              height: "100%",
              border: "none"
            }}
            allow="autoplay"
            title={file.title}
          />
        </div>
      </div>
    </>
  );
}
