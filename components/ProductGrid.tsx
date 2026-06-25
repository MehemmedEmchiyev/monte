"use client";

import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";

interface ProductGridProps {
  products: Product[];
  view?: "grid" | "list";
}

export function ProductGrid({ products, view = "grid" }: ProductGridProps) {
  if (view === "list") {
    return (
      <div className="flex flex-col gap-4">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} view="list" index={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product, i) => (
        <div key={product.id} className="h-full">
          <ProductCard product={product} index={i} />
        </div>
      ))}
    </div>
  );
}
