"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { HiArrowLeft, HiClock } from "react-icons/hi2";
import { BlogPost } from "@/types";

interface BlogDetailProps {
  post: BlogPost;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const t = useTranslations("blog");

  const paragraphs = post.content.split("\n\n");

  return (
    <PageTransition>
      <article className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-8">
        <Link href="/blog">
          <Button variant="ghost" className="mb-6 -ml-2">
            <HiArrowLeft className="h-4 w-4" />
            {t("backToBlog")}
          </Button>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <span>
              {t("by")} {post.author}
            </span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <HiClock className="h-4 w-4" />
              {post.readTime} {t("readTime")}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            {post.title}
          </h1>

          <div className="mt-8 prose prose-lg max-w-none">
            {paragraphs.map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) {
                return (
                  <h3
                    key={i}
                    className="text-xl font-bold mt-8 mb-3 text-foreground"
                  >
                    {para.replace(/\*\*/g, "")}
                  </h3>
                );
              }
              return (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed mb-4"
                >
                  {para}
                </p>
              );
            })}
          </div>
        </motion.div>
      </article>
    </PageTransition>
  );
}
