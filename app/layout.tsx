import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MartMark · Foundation Workspace",
  description: "Espaço de trabalho para a fundação da plataforma MartMark.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="antialiased">{children}</body>
    </html>
  );
}
