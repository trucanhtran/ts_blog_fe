// import next
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

// import styles
import "@/app/globals.css";

// import component
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

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="vi" className={roboto.variable}>
    <body className="antialiased min-h-screen">
      <MuiProvider>{children}</MuiProvider>
    </body>
  </html>
);

export default RootLayout;
