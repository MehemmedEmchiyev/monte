import { BlogPost } from "@/types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "montessori-environment-at-home",
    title: "How to Create a Montessori Environment at Home",
    excerpt:
      "Transform your home into a nurturing Montessori space that encourages independence, curiosity, and joyful learning.",
    content: `Creating a Montessori environment at home doesn't require a complete renovation. Start with these key principles:

**Follow the Child**
Observe your child's interests and developmental stage. Arrange materials at their eye level on low shelves they can access independently.

**Prepare the Environment**
Use child-sized furniture, natural materials, and organized spaces. Less is more — rotate toys rather than overwhelming with choices.

**Encourage Independence**
Provide practical life tools: a small pitcher for pouring water, a step stool for the sink, hooks at child height for coats.

**Create Order**
Everything has a place. Use trays and baskets to contain activities. This teaches responsibility and respect for materials.

**Embrace Nature**
Bring natural elements indoors — plants, wooden toys, cotton fabrics. Connect daily life with the natural world.

Start small, observe your child, and adjust. A Montessori home evolves with your child's growth.`,
    image: unsplash("photo-1503454537195-1dcabb73ffb9"),
    author: "Dr. Aysel Karimova",
    date: "2026-05-15",
    readTime: "8 min",
  },
  {
    id: "2",
    slug: "best-montessori-toys-2-year-olds",
    title: "Best Montessori Toys for 2 Year Olds",
    excerpt:
      "Discover the top Montessori toys that support your toddler's rapid development during this magical age of exploration.",
    content: `At two years old, children are developing language, fine motor skills, and independence at an incredible pace. Here are our top picks:

**Object Permanence Box**
Still relevant at this age, it builds understanding of cause and effect and persistence.

**Threading and Lacing Sets**
Excellent for pre-writing preparation and developing the pincer grasp.

**Simple Puzzles (3-5 pieces)**
Chunky wooden puzzles with knobs develop problem-solving and spatial awareness.

**Practical Life Tools**
Child-sized brooms, dustpans, and pouring activities build confidence and real-life skills.

**Counting and Sorting Materials**
Color tablets, counting bears, and sorting trays introduce early math concepts naturally.

Choose toys made from natural materials, with no batteries or flashing lights. Let your child lead the play.`,
    image: unsplash("photo-1587654780291-39c9404d746b"),
    author: "Maria Santos",
    date: "2026-04-28",
    readTime: "6 min",
  },
  {
    id: "3",
    slug: "child-development-through-play",
    title: "Child Development Through Play",
    excerpt:
      "Understanding how purposeful play shapes cognitive, emotional, and physical development in young children.",
    content: `Play is not frivolous — it is the work of childhood. Through play, children develop essential life skills:

**Cognitive Development**
Puzzles, building blocks, and sorting activities strengthen neural pathways, improve memory, and develop logical thinking.

**Emotional Development**
Imaginative play helps children process emotions, develop empathy, and build social skills through role-playing scenarios.

**Physical Development**
Climbing, balancing, and manipulating small objects develop both gross and fine motor skills essential for daily life.

**Language Development**
Describing their play, negotiating with playmates, and storytelling all build vocabulary and communication skills.

**The Montessori Difference**
Montessori toys are designed with a specific developmental purpose. Each material isolates one concept, allowing deep concentration and mastery before moving to the next challenge.

Invest in quality play. Your child's development depends on it.`,
    image: unsplash("photo-1515488042361-ee00e5ddd9f4"),
    author: "Dr. Aysel Karimova",
    date: "2026-03-12",
    readTime: "7 min",
  },
  {
    id: "4",
    slug: "montessori-learning-methods",
    title: "Montessori Learning Methods",
    excerpt:
      "Explore the core principles of Montessori education and how they apply to toy selection and home learning.",
    content: `Dr. Maria Montessori developed a revolutionary approach to education over a century ago. Its principles remain powerfully relevant today:

**The Absorbent Mind**
Children from birth to six have an extraordinary capacity to absorb information from their environment effortlessly.

**Sensitive Periods**
There are optimal windows for learning specific skills — language, order, movement, and social behavior. Montessori materials align with these periods.

**The Prepared Environment**
The environment is the "third teacher." Carefully curated spaces with accessible, beautiful materials invite exploration.

**Freedom Within Limits**
Children choose their activities but within a structured framework that ensures safety and respect for others.

**Auto-Education**
Given the right materials and environment, children teach themselves through hands-on exploration and repetition.

**Applying at Home**
Select toys that isolate concepts, use natural materials, and match your child's developmental stage. Observe without interrupting their concentration.

Montessori is not a curriculum — it's a way of seeing and supporting the child.`,
    image: unsplash("photo-1503676260728-1c00da094a0b"),
    author: "Maria Santos",
    date: "2026-02-20",
    readTime: "9 min",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
