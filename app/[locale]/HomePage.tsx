"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductSlider } from "@/components/ProductSlider";
import { CategoryCard } from "@/components/CategoryCard";
import { ReviewCard } from "@/components/ReviewCard";
import { BlogCard } from "@/components/BlogCard";
import { SectionHeading } from "@/components/SectionHeading";
import { NewsletterSection } from "@/components/NewsletterSection";
import { PageTransition } from "@/components/PageTransition";
import {
  SectionWrapper,
  FadeUp,
  StaggerContainer,
} from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  getFeaturedProducts,
  getBestsellers,
  categories,
} from "@/data/products";
import { reviews } from "@/data/reviews";
import { blogPosts } from "@/data/blog";
import {
  HiSparkles,
  HiHeart,
  HiAcademicCap,
  HiShieldCheck,
  HiCube,
  HiStar,
} from "react-icons/hi2";

export default function HomePage() {
  const t = useTranslations("home");

  const benefits = [
    {
      icon: HiSparkles,
      title: t("benefit1Title"),
      text: t("benefit1Text"),
      color: "bg-primary/10 text-primary",
    },
    {
      icon: HiShieldCheck,
      title: t("benefit2Title"),
      text: t("benefit2Text"),
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: HiAcademicCap,
      title: t("benefit3Title"),
      text: t("benefit3Text"),
      color: "bg-primary/10 text-primary",
    },
    {
      icon: HiCube,
      title: t("benefit4Title"),
      text: t("benefit4Text"),
      color: "bg-secondary/10 text-secondary",
    },
  ];

  return (
    <PageTransition>
      <HeroSlider />

      {/* Featured Categories */}
      <SectionWrapper variant="blue">
        <FadeUp>
          <SectionHeading
            title={t("categories")}
            subtitle={t("categoriesSubtitle")}
            action={
              <Link href="/products">
                <Button variant="secondary">{t("viewAll")}</Button>
              </Link>
            }
          />
        </FadeUp>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Popular / Featured Products */}
      <SectionWrapper variant="white">
        <FadeUp>
          <SectionHeading
            title={t("popular")}
            subtitle={t("popularSubtitle")}
            action={
              <Link href="/products">
                <Button variant="outline">{t("viewAll")}</Button>
              </Link>
            }
          />
        </FadeUp>
        <ProductSlider products={getFeaturedProducts()} />
      </SectionWrapper>

      {/* Best Sellers */}
      <SectionWrapper variant="gradient">
        <FadeUp>
          <SectionHeading title={t("bestsellers")} />
        </FadeUp>
        <ProductSlider products={getBestsellers()} />
      </SectionWrapper>

      {/* Montessori Benefits */}
      <SectionWrapper variant="orange">
        <FadeUp>
          <div className="text-center mb-10">
            <HiHeart className="h-10 w-10 text-secondary mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-extrabold">
              {t("benefits")}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              {t("benefitsSubtitle")}
            </p>
          </div>
        </FadeUp>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 },
                },
              }}
            >
              <div className="rounded-2xl bg-card p-6 shadow-md hover:shadow-xl transition-shadow h-full border border-border/50">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${b.color} mb-4`}
                >
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-base mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {b.text}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
        <FadeUp delay={0.2}>
          <div className="text-center mt-8">
            <Link href="/about">
              <Button variant="secondary" size="lg">
                {t("learnMore")}
              </Button>
            </Link>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* Philosophy */}
      <SectionWrapper variant="blue">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <FadeUp>
            <HiStar className="h-10 w-10 text-primary mb-4" />
            <h2 className="text-2xl md:text-3xl font-extrabold">
              {t("philosophy")}
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              {t("philosophyText")}
            </p>
          </FadeUp>
          <StaggerContainer className="space-y-3">
            {[t("philosophyPoint1"), t("philosophyPoint2"), t("philosophyPoint3")].map(
              (text, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                  className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-sm border border-primary/10"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-white text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="font-semibold">{text}</p>
                </motion.div>
              )
            )}
          </StaggerContainer>
        </div>
      </SectionWrapper>

      {/* Customer Reviews */}
      <SectionWrapper variant="white">
        <FadeUp>
          <SectionHeading title={t("reviews")} />
        </FadeUp>
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Blog Preview */}
      <SectionWrapper variant="gradient">
        <FadeUp>
          <SectionHeading
            title={t("blog")}
            action={
              <Link href="/blog">
                <Button variant="secondary">{t("viewAll")}</Button>
              </Link>
            }
          />
        </FadeUp>
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </StaggerContainer>
      </SectionWrapper>

      <NewsletterSection />
    </PageTransition>
  );
}
