import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Prathamesh Salokhe | AI & Data Science Specialist",
  description: "Personal portfolio of Prathamesh Salokhe, specializing in Generative AI, RAG systems, and LLM-powered applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
