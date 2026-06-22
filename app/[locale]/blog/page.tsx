import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import BlogPage from "./BlogPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function Page({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <BlogPage />;
}
