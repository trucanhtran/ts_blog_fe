import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import MuiProvider from "@/components/MuiProvider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

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
    <html lang="vi" className={roboto.variable}>
      <body className="antialiased min-h-screen">
        <MuiProvider>{children}</MuiProvider>
      </body>
    </html>
  );
}
