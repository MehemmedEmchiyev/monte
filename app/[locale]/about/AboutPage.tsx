"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import {
  HiAcademicCap,
  HiSparkles,
  HiHeart,
  HiShieldCheck,
  HiLightBulb,
  HiUserGroup,
  HiBeaker,
  HiBookOpen,
} from "react-icons/hi2";

const sections = [
  {
    key: "whatIs",
    textKey: "whatIsText",
    icon: HiBookOpen,
    color: "bg-primary/10 text-primary",
  },
  {
    key: "benefits",
    items: ["benefit1", "benefit2", "benefit3", "benefit4"],
    icon: HiSparkles,
    color: "bg-secondary/10 text-secondary",
  },
  {
    key: "development",
    items: ["dev1", "dev2", "dev3", "dev4"],
    icon: HiAcademicCap,
    color: "bg-primary/10 text-primary",
  },
  {
    key: "whyParents",
    items: ["why1", "why2", "why3", "why4"],
    icon: HiUserGroup,
    color: "bg-secondary/10 text-secondary",
  },
  {
    key: "materials",
    textKey: "materialsText",
    icon: HiShieldCheck,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    key: "education",
    items: ["edu1", "edu2", "edu3", "edu4"],
    icon: HiLightBulb,
    color: "bg-primary/10 text-primary",
  },
] as const;

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <PageTransition>
      <section className="bg-gradient-to-br from-beige to-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <HiHeart className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold">{t("title")}</h1>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12 space-y-12">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.section
              key={section.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl border border-border bg-card p-8 md:p-10"
            >
              <div className="flex items-start gap-5">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${section.color}`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-extrabold mb-4">
                    {t(section.key)}
                  </h2>
                  {"textKey" in section && section.textKey && (
                    <p className="text-muted-foreground leading-relaxed">
                      {t(section.textKey)}
                    </p>
                  )}
                  {"items" in section && section.items && (
                    <ul className="grid sm:grid-cols-2 gap-3 mt-2">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-foreground/80"
                        >
                          <HiBeaker className="h-5 w-5 text-primary shrink-0" />
                          <span>{t(item)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>
    </PageTransition>
  );
}
