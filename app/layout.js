import "./globals.css";

export const metadata = {
  title: "Prathamesh Salokhe — Terminal Portfolio",
  description: "Interactive Hacker Terminal Portfolio & Live AI Assistant of Prathamesh Salokhe, AI & Data Science Undergraduate specializing in GenAI, RAG Architectures, and Data Engineering.",
  keywords: ["Prathamesh Salokhe", "Terminal Portfolio", "GenAI Developer", "AI/ML Engineer", "Data Engineer", "RAG Systems"],
  authors: [{ name: "Prathamesh Salokhe" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black antialiased select-none sm:select-auto">
        {children}
      </body>
    </html>
  );
}
