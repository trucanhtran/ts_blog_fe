import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "@/i18n/config";

export default getRequestConfig(async () => {
  // Use cookie or header later; for now use default
  const locale = defaultLocale;

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
