"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  HiEnvelope,
  HiPhone,
  HiMapPin,
} from "react-icons/hi2";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-beige border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-extrabold text-lg">
                M
              </div>
              <span className="font-extrabold text-lg">
                Montessori <span className="text-primary">Kids</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
            <div className="flex gap-3 mt-5">
              {[FaFacebook, FaInstagram, FaYoutube, FaTiktok].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                    aria-label="Social media"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2.5">
              {(
                [
                  "home",
                  "products",
                  "boys",
                  "girls",
                  "blog",
                  "about",
                  "contact",
                ] as const
              ).map((key) => (
                <li key={key}>
                  <Link
                    href={key === "home" ? "/" : `/${key}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">{t("contactInfo")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <HiMapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                {tContact("addressValue")}
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <HiPhone className="h-5 w-5 text-primary shrink-0" />
                {tContact("phoneValue")}
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <HiEnvelope className="h-5 w-5 text-primary shrink-0" />
                {tContact("emailValue")}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">{t("newsletter")}</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder={tContact("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" variant="secondary">
                {t("newsletter")}
              </Button>
              {subscribed && (
                <p className="text-sm text-green-600 font-medium">
                  ✓ Subscribed!
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          {t("copyright", { year })}
        </div>
      </div>
    </footer>
  );
}
