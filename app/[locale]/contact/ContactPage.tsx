"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildWhatsAppOrderUrl } from "@/lib/utils";
import {
  HiMapPin,
  HiPhone,
  HiEnvelope,
  HiClock,
} from "react-icons/hi2";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({
    name: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappMessage = [
      t("whatsappIntro"),
      "",
      `${t("name")}: ${form.name.trim()}`,
      `${t("message")}: ${form.message.trim()}`,
    ].join("\n");

    window.open(buildWhatsAppOrderUrl(whatsappMessage), "_blank", "noopener,noreferrer");
    setForm({ name: "", message: "" });
  };

  const contactItems = [
    { icon: HiMapPin, label: t("address"), value: t("addressValue") },
    { icon: HiPhone, label: t("phone"), value: t("phoneValue") },
    { icon: HiEnvelope, label: t("email"), value: t("emailValue") },
    { icon: HiClock, label: t("hours"), value: t("hoursValue") },
  ];

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h2 className="text-xl font-extrabold">{t("info")}</h2>
            {contactItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-muted-foreground mt-0.5">{item.value}</p>
                </div>
              </motion.div>
            ))}

            <div className="mt-8">
              <h3 className="font-bold mb-4">{t("map")}</h3>
              <div className="rounded-2xl border border-border bg-muted aspect-video flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <HiMapPin className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">{t("addressValue")}</p>
                  <p className="text-xs mt-1">Google Maps Placeholder</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-lg h-max self-start w-full">
            <CardContent className="p-8">
              <h2 className="text-xl font-extrabold mb-6">{t("form")}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">
                    {t("name")}
                  </label>
                  <Input
                    placeholder={t("namePlaceholder")}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">
                    {t("message")}
                  </label>
                  <Textarea
                    placeholder={t("messagePlaceholder")}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                    rows={5}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  variant="secondary"
                >
                  {t("send")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
