"use client";

// import next
import Link from "next/link";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("home");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{t("subtitle")}</p>
      <Link href="/sample" className="text-blue-600 hover:underline font-medium">
        {t("linkSample")}
      </Link>
    </main>
  );
};

export default Home;
