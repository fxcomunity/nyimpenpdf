import { useRouter } from "next/router";
import Head from "next/head";
import files from "../../data/files";

export default function FileDetail() {
  const router = useRouter();
  const { slug } = router.query;

  // Cari file berdasarkan slug
  const file = files.find((f) => f.slug === slug);

  if (!file) {
    return <h1 style={{ padding: 20 }}>❌ File tidak ditemukan</h1>;
  }

  const pdfUrl = `/pdf/${file.filename}`;

  return (
    <>
      {/* SEO */}
      <Head>
        <title>{file.seoTitle}</title>
        <meta name="description" content={`Download ${file.title}`} />
      </Head>

      <div style={styles.container}>
        <h1>{file.title}</h1>
        <p>Kategori: {file.category}</p>
        <p>Download: {file.downloads}x</p>

        {/* VIEW PDF */}
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          style={{ borderRadius: 10 }}
        />

        {/* DOWNLOAD */}
        <a
          href={pdfUrl}
          download
          onClick={() => {
            file.downloads++;
          }}
          style={styles.download}
        >
          ⬇ Download PDF
        </a>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 900,
    margin: "auto",
  },
  download: {
    display: "inline-block",
    marginTop: 20,
    padding: "12px 20px",
    background: "#2563eb",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: "bold",
  },
};
