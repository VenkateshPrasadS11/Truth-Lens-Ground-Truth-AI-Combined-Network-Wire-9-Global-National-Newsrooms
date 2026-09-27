import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TruthLens | AI Real-Time Fact Checker & Fake News Detection",
  description: "Forensic AI-powered disinformation verification engine. Cross-references viral claims against live wire agencies, court dockets, and consensus records.",
  keywords: ["fact check", "fake news detector", "truthlens", "disinformation", "AI verification", "journalism"],
  authors: [{ name: "TruthLens Intelligence" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#070b13] text-slate-100 antialiased selection:bg-slate-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}
