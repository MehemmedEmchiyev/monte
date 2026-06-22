"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ProductsPage from "../products/ProductsPage";
import { PageTransition } from "@/components/PageTransition";

export default function BoysPage() {
  const t = useTranslations("boys");

  return (
    <PageTransition>
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1600&q=80&auto=format&fit=crop"
          alt={t("title")}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-400/60" />
        <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-white mb-4">
              {t("banner")}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              {t("title")}
            </h1>
            <p className="text-white/90 mt-3 text-lg max-w-lg mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>
      <ProductsPage genderFilter="boys" hideHeader />
    </PageTransition>
  );
}
