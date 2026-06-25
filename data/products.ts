import { Product, Category, HeroSlide } from "@/types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;

export const products: Product[] = [
  {
    id: "1",
    title: "Wooden Stacking Rings",
    image: unsplash("photo-1587654780291-39c9404d746b"),
    images: [
      unsplash("photo-1587654780291-39c9404d746b"),
      unsplash("photo-1515488042361-ee00e5ddd9f4"),
    ],
    price: 45,
    discountPrice: 38,
    description:
      "Classic Montessori stacking rings made from sustainably sourced birch wood. Helps develop hand-eye coordination and size discrimination.",
    rating: 4.9,
    ageCategory: "6-12-months",
    skillCategory: "fine-motor",
    material: "wood",
    gender: "unisex",
    featured: true,
    bestseller: true,
    isNew: false,
    teaches: ["hand-eye coordination", "concentration", "size discrimination"],
    safety: ["CE Certification", "EN71 Certification", "Water-based Paint", "Non-toxic Materials"],
  },
  {
    id: "2",
    title: "Sensory Play Mat",
    image: unsplash("photo-1503454537195-1dcabb73ffb9"),
    price: 89,
    description:
      "Soft cotton sensory mat with varied textures to stimulate tactile exploration and gross motor development.",
    rating: 4.8,
    ageCategory: "0-6-months",
    skillCategory: "sensory",
    material: "cotton",
    gender: "unisex",
    featured: true,
    bestseller: false,
    isNew: true,
    teaches: ["sensory exploration", "tactile awareness", "body awareness"],
    safety: ["CE Certification", "Non-toxic Materials", "Hypoallergenic Cotton"],
  },
  {
    id: "3",
    title: "Pink Tower Blocks",
    image: unsplash("photo-1558618666-fcd25c85f82e"),
    price: 120,
    discountPrice: 99,
    description:
      "Ten graduated wooden cubes in pink, a cornerstone Montessori material for visual discrimination of size.",
    rating: 5.0,
    ageCategory: "3-6-years",
    skillCategory: "logic",
    material: "wood",
    gender: "girls",
    featured: true,
    bestseller: true,
    isNew: false,
    teaches: ["logical thinking", "concentration", "visual discrimination"],
    safety: ["CE Certification", "EN71 Certification", "Water-based Paint", "Non-toxic Materials"],
  },
  {
    id: "4",
    title: "Object Permanence Box",
    image: unsplash("photo-1566576912321-d58ddd7a6088"),
    price: 55,
    description:
      "Classic Montessori object permanence box with wooden ball. Develops understanding that objects exist even when hidden.",
    rating: 4.7,
    ageCategory: "6-12-months",
    skillCategory: "logic",
    material: "wood",
    gender: "unisex",
    featured: false,
    bestseller: true,
    isNew: false,
    teaches: ["object permanence", "hand-eye coordination", "problem solving"],
    safety: ["CE Certification", "EN71 Certification", "Non-toxic Materials"],
  },
  {
    id: "5",
    title: "Counting Beads",
    image: unsplash("photo-1596464716127-f2a82984de30"),
    price: 35,
    discountPrice: 28,
    description:
      "Colorful wooden counting beads on sturdy wire frames. Introduces early math concepts through hands-on play.",
    rating: 4.6,
    ageCategory: "1-3-years",
    skillCategory: "math",
    material: "wood",
    gender: "unisex",
    featured: true,
    bestseller: false,
    isNew: true,
    teaches: ["counting", "number recognition", "fine motor skills"],
    safety: ["CE Certification", "EN71 Certification", "Water-based Paint"],
  },
  {
    id: "6",
    title: "Blue Truck Puzzle",
    image: unsplash("photo-1558060370-d644479cb6f7"),
    price: 42,
    description:
      "Chunky wooden vehicle puzzle with easy-grip pieces. Perfect for developing problem-solving skills in young boys.",
    rating: 4.8,
    ageCategory: "1-3-years",
    skillCategory: "logic",
    material: "wood",
    gender: "boys",
    featured: false,
    bestseller: true,
    isNew: false,
    teaches: ["problem solving", "spatial awareness", "creativity"],
    safety: ["CE Certification", "EN71 Certification", "Water-based Paint"],
  },
  {
    id: "7",
    title: "Princess Dress-Up Set",
    image: unsplash("photo-1515488042361-ee00e5ddd9f4"),
    price: 65,
    discountPrice: 52,
    description:
      "Soft cotton dress-up collection encouraging imaginative play and social-emotional development.",
    rating: 4.9,
    ageCategory: "3-6-years",
    skillCategory: "language",
    material: "cotton",
    gender: "girls",
    featured: true,
    bestseller: false,
    isNew: true,
    teaches: ["creativity", "language development", "social skills"],
    safety: ["CE Certification", "Non-toxic Materials", "Hypoallergenic Cotton"],
  },
  {
    id: "8",
    title: "Balance Board",
    image: unsplash("photo-1516627145497-ae6968895b74"),
    price: 95,
    description:
      "Curved wooden balance board for gross motor development, core strength, and imaginative play.",
    rating: 4.7,
    ageCategory: "3-6-years",
    skillCategory: "gross-motor",
    material: "wood",
    gender: "unisex",
    featured: false,
    bestseller: true,
    isNew: false,
    teaches: ["balance", "coordination", "core strength"],
    safety: ["CE Certification", "EN71 Certification", "Non-toxic Materials"],
  },
  {
    id: "9",
    title: "Sound Cylinders",
    image: unsplash("photo-1503454537195-1dcabb73ffb9"),
    price: 48,
    description:
      "Six pairs of wooden cylinders with varying contents for auditory discrimination and matching.",
    rating: 4.5,
    ageCategory: "1-3-years",
    skillCategory: "sensory",
    material: "wood",
    gender: "unisex",
    featured: false,
    bestseller: false,
    isNew: true,
    teaches: ["auditory discrimination", "concentration", "matching"],
    safety: ["CE Certification", "EN71 Certification", "Non-toxic Materials"],
  },
  {
    id: "10",
    title: "Alphabet Tracing Board",
    image: unsplash("photo-1503676260728-1c00da094a0b"),
    price: 38,
    discountPrice: 32,
    description:
      "Wooden alphabet board with recessed letters for tracing with finger or stylus. Pre-writing skill development.",
    rating: 4.8,
    ageCategory: "3-6-years",
    skillCategory: "language",
    material: "wood",
    gender: "unisex",
    featured: true,
    bestseller: true,
    isNew: false,
    teaches: ["letter recognition", "pre-writing", "fine motor skills"],
    safety: ["CE Certification", "EN71 Certification", "Water-based Paint"],
  },
  {
    id: "11",
    title: "Wool Felt Balls Set",
    image: unsplash("photo-1586281380349-632531db7ed4"),
    price: 28,
    description:
      "Handcrafted wool felt balls in natural colors for sorting, counting, and sensory play.",
    rating: 4.6,
    ageCategory: "1-3-years",
    skillCategory: "sensory",
    material: "wool",
    gender: "unisex",
    featured: false,
    bestseller: false,
    isNew: true,
    teaches: ["color sorting", "counting", "tactile exploration"],
    safety: ["CE Certification", "Non-toxic Materials", "Natural Wool"],
  },
  {
    id: "12",
    title: "Construction Tool Set",
    image: unsplash("photo-1581833971358-2c8b550f87b3"),
    price: 55,
    description:
      "Child-safe wooden tool set with hammer, screwdriver, and nuts. Builds fine motor skills and confidence.",
    rating: 4.9,
    ageCategory: "3-6-years",
    skillCategory: "fine-motor",
    material: "wood",
    gender: "boys",
    featured: true,
    bestseller: true,
    isNew: false,
    teaches: ["fine motor skills", "problem solving", "creativity"],
    safety: ["CE Certification", "EN71 Certification", "Water-based Paint"],
  },
  {
    id: "13",
    title: "Flower Garden Puzzle",
    image: unsplash("photo-1495107334307-f4d80669781a"),
    price: 40,
    discountPrice: 34,
    description:
      "Beautiful wooden flower garden puzzle with vibrant pieces. Encourages patience and attention to detail.",
    rating: 4.7,
    ageCategory: "3-6-years",
    skillCategory: "logic",
    material: "wood",
    gender: "girls",
    featured: false,
    bestseller: false,
    isNew: true,
    teaches: ["patience", "problem solving", "nature awareness"],
    safety: ["CE Certification", "EN71 Certification", "Water-based Paint"],
  },
  {
    id: "14",
    title: "Eco Play Dough Kit",
    image: unsplash("photo-1596464716127-f2a82984de30"),
    price: 32,
    description:
      "Plant-based play dough with natural dyes and wooden tools. Safe sensory creative play.",
    rating: 4.5,
    ageCategory: "1-3-years",
    skillCategory: "sensory",
    material: "eco-friendly",
    gender: "unisex",
    featured: false,
    bestseller: false,
    isNew: true,
    teaches: ["creativity", "fine motor skills", "sensory exploration"],
    safety: ["CE Certification", "Non-toxic Materials", "Plant-based"],
  },
  {
    id: "15",
    title: "Number Rods",
    image: unsplash("photo-1503676260728-1c00da094a0b"),
    price: 85,
    discountPrice: 72,
    description:
      "Ten graduated red and blue number rods for understanding quantity and early mathematics.",
    rating: 4.9,
    ageCategory: "3-6-years",
    skillCategory: "math",
    material: "wood",
    gender: "unisex",
    featured: true,
    bestseller: true,
    isNew: false,
    teaches: ["number concepts", "logical thinking", "concentration"],
    safety: ["CE Certification", "EN71 Certification", "Water-based Paint"],
  },
  {
    id: "16",
    title: "Baby Grasping Beads",
    image: unsplash("photo-1515488042361-ee00e5ddd9f4"),
    price: 22,
    description:
      "Lightweight wooden grasping beads perfect for developing the palmar grasp in infants.",
    rating: 4.8,
    ageCategory: "0-6-months",
    skillCategory: "fine-motor",
    material: "wood",
    gender: "unisex",
    featured: false,
    bestseller: true,
    isNew: false,
    teaches: ["grasping", "hand-eye coordination", "tactile exploration"],
    safety: ["CE Certification", "EN71 Certification", "Non-toxic Materials"],
  },
  {
    id: "17",
    title: "Ballerina Music Box",
    image: unsplash("photo-1495107334307-f4d80669781a"),
    price: 58,
    description:
      "Delicate wooden music box with ballerina figure. Encourages auditory appreciation and graceful movement.",
    rating: 4.6,
    ageCategory: "3-6-years",
    skillCategory: "sensory",
    material: "wood",
    gender: "girls",
    featured: false,
    bestseller: false,
    isNew: false,
    teaches: ["auditory appreciation", "grace", "imagination"],
    safety: ["CE Certification", "EN71 Certification", "Water-based Paint"],
  },
  {
    id: "18",
    title: "Racing Car Set",
    image: unsplash("photo-1558060370-d644479cb6f7"),
    price: 48,
    discountPrice: 40,
    description:
      "Set of four wooden racing cars with smooth wheels for push-and-go play and imaginative racing.",
    rating: 4.7,
    ageCategory: "1-3-years",
    skillCategory: "gross-motor",
    material: "wood",
    gender: "boys",
    featured: true,
    bestseller: false,
    isNew: true,
    teaches: ["gross motor skills", "cause and effect", "creativity"],
    safety: ["CE Certification", "EN71 Certification", "Water-based Paint"],
  },
  {
    id: "19",
    title: "Nature Exploration Kit",
    image: unsplash("photo-1503454537195-1dcabb73ffb9"),
    price: 72,
    description:
      "Eco-friendly exploration kit with magnifying glass, collection bag, and nature journal.",
    rating: 4.8,
    ageCategory: "3-6-years",
    skillCategory: "sensory",
    material: "eco-friendly",
    gender: "unisex",
    featured: true,
    bestseller: false,
    isNew: true,
    teaches: ["observation", "nature awareness", "scientific thinking"],
    safety: ["CE Certification", "Non-toxic Materials", "Eco-friendly"],
  },
  {
    id: "20",
    title: "Threading Lacing Set",
    image: unsplash("photo-1586281380349-632531db7ed4"),
    price: 30,
    discountPrice: 25,
    description:
      "Wooden shapes with holes and laces for threading practice. Excellent pre-writing preparation.",
    rating: 4.7,
    ageCategory: "1-3-years",
    skillCategory: "fine-motor",
    material: "wood",
    gender: "unisex",
    featured: false,
    bestseller: true,
    isNew: false,
    teaches: ["fine motor skills", "concentration", "hand-eye coordination"],
    safety: ["CE Certification", "EN71 Certification", "Non-toxic Materials"],
  },
  {
    id: "21",
    title: "Dollhouse Mini Set",
    image: unsplash("photo-1516627145497-ae6968895b74"),
    price: 145,
    discountPrice: 120,
    description:
      "Handcrafted wooden dollhouse with furniture. Promotes imaginative play and social development.",
    rating: 4.9,
    ageCategory: "3-6-years",
    skillCategory: "language",
    material: "wood",
    gender: "girls",
    featured: true,
    bestseller: true,
    isNew: false,
    teaches: ["imagination", "social skills", "language development"],
    safety: ["CE Certification", "EN71 Certification", "Water-based Paint"],
  },
  {
    id: "22",
    title: "Climbing Triangle",
    image: unsplash("photo-1516627145497-ae6968895b74"),
    price: 210,
    discountPrice: 189,
    description:
      "Foldable wooden climbing triangle for safe gross motor development and active play.",
    rating: 5.0,
    ageCategory: "1-3-years",
    skillCategory: "gross-motor",
    material: "wood",
    gender: "unisex",
    featured: true,
    bestseller: true,
    isNew: true,
    teaches: ["gross motor skills", "confidence", "risk assessment"],
    safety: ["CE Certification", "EN71 Certification", "Non-toxic Materials"],
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Fine Motor",
    image: unsplash("photo-1587654780291-39c9404d746b"),
    slug: "fine-motor",
    productCount: 6,
  },
  {
    id: "2",
    name: "Sensory Play",
    image: unsplash("photo-1503454537195-1dcabb73ffb9"),
    slug: "sensory",
    productCount: 5,
  },
  {
    id: "3",
    name: "Math & Logic",
    image: unsplash("photo-1596464716127-f2a82984de30"),
    slug: "math",
    productCount: 4,
  },
  {
    id: "4",
    name: "Language",
    image: unsplash("photo-1503676260728-1c00da094a0b"),
    slug: "language",
    productCount: 3,
  },
  {
    id: "5",
    name: "Gross Motor",
    image: unsplash("photo-1516627145497-ae6968895b74"),
    slug: "gross-motor",
    productCount: 3,
  },
  {
    id: "6",
    name: "Eco-Friendly",
    image: unsplash("photo-1586281380349-632531db7ed4"),
    slug: "eco-friendly",
    productCount: 2,
  },
];

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Discover the Joy of Learning",
    subtitle: "Premium Montessori toys crafted for curious minds",
    image: unsplash("photo-1503454537195-1dcabb73ffb9"),
    cta: "Shop Now",
    ctaLink: "/products",
  },
  {
    id: "2",
    title: "Natural Materials, Safe Play",
    subtitle: "Eco-friendly toys made with love and care",
    image: unsplash("photo-1587654780291-39c9404d746b"),
    cta: "Explore Collection",
    ctaLink: "/products",
  },
  {
    id: "3",
    title: "New Arrivals",
    subtitle: "Fresh Montessori essentials for every age",
    image: unsplash("photo-1515488042361-ee00e5ddd9f4"),
    cta: "View New",
    ctaLink: "/products?filter=new",
  },
];

export function getProductPriceBounds(): { min: number; max: number } {
  const prices = products.map((p) => p.discountPrice ?? p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.bestseller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getDiscountProducts(): Product[] {
  return products.filter((p) => p.discountPrice);
}

export function getProductsByGender(gender: "boys" | "girls"): Product[] {
  return products.filter((p) => p.gender === gender || p.gender === "unisex");
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.skillCategory === product.skillCategory ||
          p.ageCategory === product.ageCategory)
    )
    .slice(0, limit);
}
