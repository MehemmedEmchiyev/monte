"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { HiChevronDown } from "react-icons/hi2";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const localeLabels: Record<string, string> = {
  az: "AZ",
  en: "EN",
  ru: "RU",
};

const localeNames: Record<string, string> = {
  az: "Azərbaycan",
  en: "English",
  ru: "Русский",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold hover:bg-muted transition-colors cursor-pointer"
        aria-label="Switch language"
      >
        <span>{localeLabels[locale]}</span>
        <HiChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-border bg-card shadow-lg overflow-hidden z-50">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={cn(
                "w-full px-4 py-2.5 text-left text-sm hover:bg-muted transition-colors cursor-pointer",
                loc === locale && "bg-primary/10 text-primary font-semibold"
              )}
            >
              {localeNames[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
