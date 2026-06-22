import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { use } from "react";
import { getProductById, getRelatedProducts } from "@/data/products";
import ProductDetail from "./ProductDetail";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default function Page({ params }: Props) {
  const { locale, id } = use(params);
  setRequestLocale(locale);

  const product = getProductById(id);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product);

  return (
    <ProductDetail product={product} relatedProducts={relatedProducts} />
  );
}
