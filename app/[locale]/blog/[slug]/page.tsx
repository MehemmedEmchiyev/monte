import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { use } from "react";
import { getBlogPostBySlug, blogPosts } from "@/data/blog";
import BlogDetail from "./BlogDetail";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default function Page({ params }: Props) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);

  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return <BlogDetail post={post} />;
}
