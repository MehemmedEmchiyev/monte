"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiEnvelope } from "react-icons/hi2";

export function NewsletterSection() {
  const t = useTranslations("home");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-4 md:mx-6 lg:mx-8 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 p-8 md:p-12 text-center shadow-xl"
      >
        <HiEnvelope className="h-10 w-10 text-white/80 mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          {t("newsletter")}
        </h2>
        <p className="text-white/80 mt-2 max-w-md mx-auto">
          {t("newsletterText")}
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/95 border-0 flex-1"
          />
          <Button type="submit" variant="secondary" size="lg">
            {t("subscribe")}
          </Button>
        </form>
        {subscribed && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-white font-semibold"
          >
            ✓ {t("subscribed")}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
