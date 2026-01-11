import Head from "next/head";
import files from "../../data/files";

export async function getServerSideProps({ params }) {
  const file = files.find(f => f.slug === params.slug);
  if (!file) return { notFound: true };
  return { props: { file } };
}

export default function FilePage({ file }) {
  return (
    <>
      <Head>
        <title>{file.seoTitle}</title>
      </Head>

      <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
        <h1>{file.title}</h1>
        <p>Kategori: {file.category}</p>

        <iframe
          src={`https://drive.google.com/file/d/${file.id}/preview`}
          width="100%"
          height="600"
          style={{ border: "none", borderRadius: 8 }}
        />

        <br /><br />

        <a
          href={`https://drive.google.com/uc?id=${file.id}&export=download`}
          target="_blank"
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none"
          }}
        >
          ⬇ Download PDF
        </a>
      </div>
    </>
  );
}
