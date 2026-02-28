import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TS Blog",
  description: "Next.js + TypeScript + React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
