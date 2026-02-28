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

export const metadata: Metadata = {
  title: "TS Blog",
  description: "Next.js + TypeScript + React",
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
