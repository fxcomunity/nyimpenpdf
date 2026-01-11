export default function Home() {
  return (
    <main style={styles.main}>
      <h1>🔥 Website Gw 🔥</h1>
      <p>Hosting di Vercel • Next.js</p>

      <div style={styles.card}>
        <h2>Tentang Gw</h2>
        <p>Ini website pertama gw yang di-deploy ke Vercel.</p>
      </div>

      <a href="#" style={styles.button}>Hubungi Gw</a>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
    color: "white",
    gap: "20px",
    fontFamily: "sans-serif"
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "400px",
    textAlign: "center"
  },
  button: {
    padding: "10px 20px",
    background: "#38bdf8",
    color: "#000",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold"
  }
};
