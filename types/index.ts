export type Locale = "az" | "en" | "ru";

export type AgeCategory =
  | "0-6-months"
  | "6-12-months"
  | "1-3-years"
  | "3-6-years";

export type SkillCategory =
  | "fine-motor"
  | "gross-motor"
  | "sensory"
  | "language"
  | "math"
  | "logic";

export type Material =
  | "wood"
  | "cotton"
  | "wool"
  | "eco-friendly";

export type Gender = "boys" | "girls" | "unisex";

export type SortOption =
  | "price-low"
  | "price-high"
  | "rating"
  | "newest";

export interface Product {
  id: string;
  title: string;
  image: string;
  images?: string[];
  price: number;
  discountPrice?: number;
  description: string;
  rating: number;
  ageCategory: AgeCategory;
  skillCategory: SkillCategory;
  material: Material;
  gender: Gender;
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  teaches: string[];
  safety: string[];
}

export interface Review {
  id: string;
  parentName: string;
  rating: number;
  comment: string;
  childAge: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
  productCount: number;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  ctaLink: string;
}
