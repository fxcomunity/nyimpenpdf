export const metadata = {
  title: "Website Gw",
  description: "Website sederhana di Vercel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
