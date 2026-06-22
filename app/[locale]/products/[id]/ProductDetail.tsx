"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { ProductGrid } from "@/components/ProductGrid";
import { PageTransition } from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import {
  HiStar,
  HiShieldCheck,
  HiAcademicCap,
  HiHeart,
} from "react-icons/hi2";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetail({
  product,
  relatedProducts,
}: ProductDetailProps) {
  const t = useTranslations("product");
  const tAge = useTranslations("age");
  const tSkill = useTranslations("skill");
  const tMaterials = useTranslations("materials");
  const tProducts = useTranslations("products");
  const { isInWishlist, toggleWishlist } = useWishlist();

  const images = product.images ?? [product.image];
  const [activeImage, setActiveImage] = useState(0);
  const discount = getDiscountPercent(product.price, product.discountPrice);
  const displayPrice = product.discountPrice ?? product.price;

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-muted"
            >
              <Image
                src={images[activeImage]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {discount > 0 && (
                <Badge variant="discount" className="absolute top-4 left-4 text-sm">
                  -{discount}%
                </Badge>
              )}
            </motion.div>
            {images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-colors cursor-pointer ${
                      i === activeImage
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-3xl md:text-4xl font-extrabold">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HiStar
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.rating)
                          ? "text-secondary fill-secondary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground text-sm">
                  ({t("reviews")})
                </span>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <span className="text-3xl font-extrabold text-primary">
                  {formatPrice(displayPrice)}
                </span>
                {product.discountPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mt-6 leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                <Badge variant="default">
                  {tAge(product.ageCategory)}
                </Badge>
                <Badge variant="secondary">
                  {tSkill(product.skillCategory)}
                </Badge>
                <Badge variant="default">
                  {tMaterials(product.material)}
                </Badge>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={cn(
                    "flex h-12 items-center gap-2 rounded-xl px-6 font-semibold transition-all cursor-pointer",
                    isInWishlist(product.id)
                      ? "bg-secondary text-white"
                      : "bg-primary text-white hover:bg-primary/90"
                  )}
                >
                  <HiHeart
                    className={cn(
                      "h-5 w-5",
                      isInWishlist(product.id) && "fill-current"
                    )}
                  />
                  {isInWishlist(product.id)
                    ? tProducts("inWishlist")
                    : tProducts("addToWishlist")}
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <HiAcademicCap className="h-7 w-7 text-primary" />
              <h2 className="text-xl font-extrabold">{t("teaches")}</h2>
            </div>
            <ul className="space-y-3">
              {product.teaches.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-foreground/80"
                >
                  <span className="h-2 w-2 rounded-full bg-secondary shrink-0" />
                  <span className="capitalize">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <HiShieldCheck className="h-7 w-7 text-primary" />
              <h2 className="text-xl font-extrabold">{t("safety")}</h2>
            </div>
            <ul className="space-y-3">
              {product.safety.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-foreground/80"
                >
                  <HiShieldCheck className="h-5 w-5 text-green-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-extrabold mb-8">{t("related")}</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </PageTransition>
  );
}
