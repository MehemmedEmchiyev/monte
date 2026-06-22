"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
} from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const slides = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1920&q=85&auto=format&fit=crop",
    titleKey: "slide1Title" as const,
    subtitleKey: "slide1Subtitle" as const,
    ctaKey: "shopNow" as const,
    ctaLink: "/products",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1920&q=85&auto=format&fit=crop",
    titleKey: "slide2Title" as const,
    subtitleKey: "slide2Subtitle" as const,
    ctaKey: "explore" as const,
    ctaLink: "/products",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e5ddd9f4?w=1920&q=85&auto=format&fit=crop",
    titleKey: "slide3Title" as const,
    subtitleKey: "slide3Subtitle" as const,
    ctaKey: "viewNew" as const,
    ctaLink: "/products",
  },
];

export function HeroSlider() {
  const t = useTranslations("hero");
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <section className="relative w-full h-[480px] md:h-[580px] lg:h-[680px] bg-gradient-to-br from-primary to-primary/70" />
    );
  }

  return (
    <section className="relative w-full h-[480px] md:h-[580px] lg:h-[680px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={800}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="hero-swiper h-full w-full"
        touchRatio={1}
        grabCursor
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={t(slide.titleKey)}
                fill
                className="object-cover"
                priority={slide.id === "1"}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/50 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl pointer-events-auto"
          >
            <span className="inline-block rounded-full bg-secondary/90 px-4 py-1.5 text-xs font-bold text-white uppercase tracking-wider mb-4">
              Montessori Kids
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-sm">
              {t(slides[activeIndex].titleKey)}
            </h1>
            <p className="mt-4 text-base md:text-lg lg:text-xl text-white/90 max-w-md">
              {t(slides[activeIndex].subtitleKey)}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={slides[activeIndex].ctaLink}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
                >
                  {t(slides[activeIndex].ctaKey)}
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary shadow-lg"
                >
                  {t("explore")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
