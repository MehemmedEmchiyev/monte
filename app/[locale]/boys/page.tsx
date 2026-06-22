import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Suspense } from "react";
import BoysPage from "./BoysPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function Page({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <Suspense>
      <BoysPage />
    </Suspense>
  );
}
