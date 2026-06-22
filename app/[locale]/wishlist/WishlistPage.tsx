"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useWishlist } from "@/hooks/useWishlist";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { HiHeart } from "react-icons/hi2";
import { FadeUp } from "@/components/AnimatedSection";

export default function WishlistPage() {
  const t = useTranslations("wishlist");
  const { wishlist } = useWishlist();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <PageTransition>
      <div className="bg-gradient-to-br from-primary/5 via-blue-section to-secondary/5 py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <FadeUp>
            <div className="flex items-center gap-3 mb-2">
              <HiHeart className="h-8 w-8 text-secondary" />
              <h1 className="text-3xl md:text-4xl font-extrabold">
                {t("title")}
              </h1>
            </div>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </FadeUp>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-10">
        {wishlistProducts.length === 0 ? (
          <FadeUp>
            <div className="text-center py-20 rounded-3xl bg-blue-section border border-border">
              <HiHeart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-xl font-bold">{t("empty")}</h2>
              <p className="text-muted-foreground mt-2 mb-6">{t("emptyText")}</p>
              <Link href="/products">
                <Button variant="secondary" size="lg">
                  {t("browse")}
                </Button>
              </Link>
            </div>
          </FadeUp>
        ) : (
          <>
            <SectionHeading
              title={t("items", { count: wishlistProducts.length })}
            />
            <ProductGrid products={wishlistProducts} />
          </>
        )}
      </div>
    </PageTransition>
  );
}
