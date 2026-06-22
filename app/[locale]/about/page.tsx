import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import AboutPage from "./AboutPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function Page({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <AboutPage />;
}
