"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { useWishlist } from "@/hooks/useWishlist";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { HiStar, HiHeart, HiEye, HiXMark } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  view?: "grid" | "list";
  index?: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <HiStar
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < Math.round(rating)
              ? "text-secondary fill-secondary"
              : "text-muted"
          )}
        />
      ))}
    </div>
  );
}

export function ProductCard({
  product,
  view = "grid",
  index = 0,
}: ProductCardProps) {
  const tAge = useTranslations("age");
  const tProducts = useTranslations("products");
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const discount = getDiscountPercent(product.price, product.discountPrice);
  const displayPrice = product.discountPrice ?? product.price;
  const wished = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  if (view === "list") {
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="will-change-transform"
        style={{ transform: isHovered ? "translateY(-4px)" : "translateY(0)", transition: "transform 0.3s ease" }}
      >
        <div
          className={cn(
            "flex gap-4 rounded-2xl border bg-card p-4 transition-shadow duration-300",
            isHovered ? "shadow-xl border-primary/20" : "shadow-sm border-border"
          )}
        >
          <Link
            href={`/products/${product.id}`}
            className="relative h-36 w-36 shrink-0 overflow-hidden rounded-xl"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500"
              style={{ transform: isHovered ? "scale(1.08)" : "scale(1)" }}
              sizes="144px"
            />
            {discount > 0 && (
              <Badge variant="discount" className="absolute top-2 left-2">
                -{discount}%
              </Badge>
            )}
          </Link>
          <div className="flex flex-1 flex-col justify-between min-w-0">
            <div>
              <Link href={`/products/${product.id}`}>
                <h3
                  className={cn(
                    "font-bold text-lg transition-colors",
                    isHovered && "text-primary"
                  )}
                >
                  {product.title}
                </h3>
              </Link>
              <StarRating rating={product.rating} />
              <Badge variant="default" className="mt-2 text-xs">
                {tAge(product.ageCategory)}
              </Badge>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary">
                  {formatPrice(displayPrice)}
                </span>
                {product.discountPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleWishlist}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border transition-all cursor-pointer",
                    wished
                      ? "bg-secondary text-white border-secondary"
                      : "bg-card border-border hover:border-secondary hover:text-secondary"
                  )}
                  aria-label="Wishlist"
                >
                  <HiHeart className={cn("h-4 w-4", wished && "fill-current")} />
                </button>
                <button
                  onClick={handleQuickView}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card hover:border-primary hover:text-primary transition-all cursor-pointer"
                  aria-label="Quick view"
                >
                  <HiEye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <QuickViewModal
          product={product}
          open={quickViewOpen}
          onClose={() => setQuickViewOpen(false)}
        />
      </div>
    );
  }

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="will-change-transform h-full"
        style={{ transform: isHovered ? "translateY(-8px)" : "translateY(0)", transition: "transform 0.3s ease" }}
      >
        <div
          className={cn(
            "relative h-full overflow-hidden rounded-2xl border bg-card transition-shadow duration-300",
            isHovered ? "shadow-2xl border-primary/20" : "shadow-md border-border"
          )}
        >
          <div className="relative aspect-square overflow-hidden">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500"
                style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </Link>

            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {product.isNew && <Badge variant="new">NEW</Badge>}
              {discount > 0 && (
                <Badge variant="discount">-{discount}%</Badge>
              )}
              {product.bestseller && (
                <Badge variant="secondary">BEST</Badge>
              )}
            </div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-3 right-3 flex flex-col gap-2 z-10"
                >
                  <button
                    onClick={handleWishlist}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all cursor-pointer",
                      wished
                        ? "bg-secondary text-white"
                        : "bg-white text-foreground hover:bg-secondary hover:text-white"
                    )}
                    aria-label="Wishlist"
                  >
                    <HiHeart
                      className={cn("h-5 w-5", wished && "fill-current")}
                    />
                  </button>
                  <button
                    onClick={handleQuickView}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground shadow-lg hover:bg-primary hover:text-white transition-all cursor-pointer"
                    aria-label="Quick view"
                  >
                    <HiEye className="h-5 w-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4">
            <Link href={`/products/${product.id}`}>
              <h3
                className={cn(
                  "font-bold text-base line-clamp-1 transition-colors",
                  isHovered && "text-primary"
                )}
              >
                {product.title}
              </h3>
            </Link>

            <div className="flex items-center gap-2 mt-1.5">
              <StarRating rating={product.rating} />
              <span className="text-xs font-semibold text-muted-foreground">
                {product.rating}
              </span>
            </div>

            <Badge variant="default" className="mt-2 text-xs">
              {tAge(product.ageCategory)}
            </Badge>

            <div className="flex items-center gap-2 mt-3">
              <span className="text-lg font-extrabold text-primary">
                {formatPrice(displayPrice)}
              </span>
              {product.discountPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}

function QuickViewModal({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("products");
  const tAge = useTranslations("age");
  const displayPrice = product.discountPrice ?? product.price;
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl rounded-2xl bg-card shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors cursor-pointer"
          >
            <HiXMark className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <h3 className="text-xl font-extrabold">{product.title}</h3>
              <div className="flex items-center gap-1 mt-2">
                <StarRating rating={product.rating} />
                <span className="text-sm font-semibold ml-1">
                  {product.rating}
                </span>
              </div>
              <Badge variant="default" className="mt-3 w-fit">
                {tAge(product.ageCategory)}
              </Badge>
              <p className="text-sm text-muted-foreground mt-4 line-clamp-4">
                {product.description}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-2xl font-extrabold text-primary">
                  {formatPrice(displayPrice)}
                </span>
                {product.discountPrice && (
                  <span className="text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              <div className="flex gap-3 mt-6">
                <Link href={`/products/${product.id}`} className="flex-1">
                  <button
                    onClick={onClose}
                    className="w-full h-11 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors cursor-pointer"
                  >
                    {t("viewDetails")}
                  </button>
                </Link>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-all cursor-pointer",
                    isInWishlist(product.id)
                      ? "bg-secondary border-secondary text-white"
                      : "border-border hover:border-secondary hover:text-secondary"
                  )}
                >
                  <HiHeart
                    className={cn(
                      "h-5 w-5",
                      isInWishlist(product.id) && "fill-current"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
