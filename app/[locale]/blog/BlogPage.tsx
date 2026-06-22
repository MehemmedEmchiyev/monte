"use client";

import { useTranslations } from "next-intl";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  const t = useTranslations("blog");

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
