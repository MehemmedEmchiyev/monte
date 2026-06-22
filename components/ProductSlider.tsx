"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface ProductSliderProps {
  products: Product[];
}

export function ProductSlider({ products }: ProductSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-card border border-border shadow-lg p-2.5 hover:bg-secondary hover:text-white hover:border-secondary transition-all cursor-pointer hidden md:flex"
        aria-label="Scroll left"
      >
        <HiChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-card border border-border shadow-lg p-2.5 hover:bg-secondary hover:text-white hover:border-secondary transition-all cursor-pointer hidden md:flex"
        aria-label="Scroll right"
      >
        <HiChevronRight className="h-5 w-5" />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
      >
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="min-w-[260px] max-w-[260px] sm:min-w-[280px] sm:max-w-[280px] snap-start shrink-0"
          >
            <ProductCard product={product} index={i} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
