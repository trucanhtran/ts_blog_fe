// import next
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover" as const,
  themeColor: "#1976d2",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://ts-blog.com"),
  title: "TS Blog",
  description: "Next.js + TypeScript + React",
  icons: {
    icon: "/images/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "TS Blog",
    description: "Next.js + TypeScript + React",
    images: ["/images/twitter-card.png"],
  },
  openGraph: {
    type: "website",
    url: "https://ts-blog.com",
    title: "TS Blog",
    description: "Next.js + TypeScript + React",
    images: ["/images/open-graph.png"],
  },
  alternates: {
    canonical: "https://ts-blog.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  formatDetection: {
    email: false,
  },
  authors: [{ name: "TS Blog", url: "https://ts-blog.com" }],
  creator: "TS Blog",
  publisher: "TS Blog",
  category: "technology",
  keywords: ["Next.js", "TypeScript", "React"],
  applicationName: "TS Blog",
  appleWebApp: {
    title: "TS Blog",
    statusBarStyle: "black-translucent",
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const messages = await getMessages();

  return (
    <html lang="vi" className={roboto.variable}>
      <body className="antialiased min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <MuiProvider>{children}</MuiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
