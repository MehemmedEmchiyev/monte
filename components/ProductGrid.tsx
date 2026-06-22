"use client";

import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { StaggerContainer, staggerItem } from "@/components/AnimatedSection";
import { motion } from "framer-motion";

interface ProductGridProps {
  products: Product[];
  view?: "grid" | "list";
}

export function ProductGrid({ products, view = "grid" }: ProductGridProps) {
  if (view === "list") {
    return (
      <StaggerContainer className="flex flex-col gap-4">
        {products.map((product, i) => (
          <motion.div key={product.id} variants={staggerItem}>
            <ProductCard product={product} view="list" index={i} />
          </motion.div>
        ))}
      </StaggerContainer>
    );
  }

  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product, i) => (
        <motion.div key={product.id} variants={staggerItem} className="h-full">
          <ProductCard product={product} index={i} />
        </motion.div>
      ))}
    </StaggerContainer>
  );
}
