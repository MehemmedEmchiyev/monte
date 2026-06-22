"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

interface SectionWrapperProps {
  children: ReactNode;
  variant?: "white" | "blue" | "orange" | "gradient";
  className?: string;
}

export function SectionWrapper({
  children,
  variant = "white",
  className = "",
}: SectionWrapperProps) {
  const variants = {
    white: "bg-card",
    blue: "bg-blue-section",
    orange: "bg-accent",
    gradient:
      "bg-gradient-to-br from-primary/10 via-blue-section to-secondary/10",
  };

  return (
    <section className={`py-14 md:py-20 ${variants[variant]} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">{children}</div>
    </section>
  );
}
