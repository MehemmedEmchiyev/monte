"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useWishlist } from "@/hooks/useWishlist";
import {
  HiBars3,
  HiXMark,
  HiHeart,
  HiLink,
} from "react-icons/hi2";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa6";
import { cn } from "@/lib/utils";

const leftLinks = [
  { href: "/about", label: "about" },
  { href: "/products", label: "products" },
] as const;

const rightLinks = [
  { href: "/blog", label: "blog" },
  { href: "/contact", label: "contact" },
] as const;

const allLinks = [...leftLinks, ...rightLinks];

const socialLinks = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { count } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const NavLink = ({
    href,
    label,
  }: {
    href: string;
    label: string;
  }) => (
    <Link
      href={href}
      className={cn(
        "text-sm px-3 py-2 font-semibold transition-colors whitespace-nowrap",
        isActive(href)
          ? "text-primary"
          : "text-foreground/70 hover:text-secondary"
      )}
    >
      {t(label)}
    </Link>
  );

  const SocialIcons = ({ compact }: { compact?: boolean }) => (
    <div className={cn("flex items-center", compact ? "gap-1" : "gap-2")}>
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn(
            "flex items-center justify-center rounded-full text-foreground/60 hover:text-secondary hover:bg-secondary/10 transition-all",
            compact ? "h-8 w-8" : "h-9 w-9"
          )}
        >
          <Icon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </a>
      ))}
    </div>
  );

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          paddingTop: scrolled ? 12 : 0,
          paddingLeft: scrolled ? 16 : 0,
          paddingRight: scrolled ? 16 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.nav
          initial={false}
          animate={{
            borderRadius: scrolled ? 20 : 0,
            maxWidth: scrolled ? 1120 : "100%",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0, 0, 255, 0.18)"
              : "0 2px 12px rgba(0, 0, 255, 0.08)",
          }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn(
            "bg-card/95 backdrop-blur-xl border border-primary/15 mx-auto",
            scrolled ? "border-primary/20" : "border-b border-primary/10"
          )}
        >
          <div className="mx-auto flex h-16 md:h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-8 lg:px-10 transition-all duration-350">
            {/* LEFT: Social or collapsed link button */}
            <div className="flex items-center gap-2 min-w-[100px] md:min-w-[140px]">
              <AnimatePresence mode="wait">
                {!scrolled ? (
                  <motion.div
                    key="social-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="hidden md:flex"
                  >
                    <SocialIcons />
                  </motion.div>
                ) : (
                  <motion.div
                    key="social-compact"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="relative hidden md:block"
                  >
                    <button
                      onClick={() => setSocialOpen(!socialOpen)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-secondary hover:text-white transition-all cursor-pointer"
                      aria-label="Social links"
                    >
                      <HiLink className="h-4 w-4" />
                    </button>
                    <AnimatePresence>
                      {socialOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          className="absolute top-full left-0 mt-2 flex gap-1 rounded-xl bg-card border border-border shadow-xl p-2"
                        >
                          <SocialIcons compact />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <HiXMark className="h-5 w-5" />
                ) : (
                  <HiBars3 className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* CENTER: Navigation + Logo */}
            <div className="flex items-center gap-1 md:gap-2 lg:gap-4 flex-1 justify-center">
              {/* Left nav links - desktop */}
              <div className="hidden lg:flex items-center gap-1">
                {leftLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    href={link.href}
                    label={link.label}
                  />
                ))}
              </div>

              {/* Logo - always centered */}
              <Link href="/" className="shrink-0 mx-2 md:mx-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-lg text-white font-extrabold shadow-md">
                    M
                  </div>
                  <span className="font-extrabold text-lg hidden sm:block">
                    Montessori{" "}
                    <span className="text-secondary">Kids</span>
                  </span>
                </div>
              </Link>

              {/* Right nav links - desktop */}
              <div className="hidden lg:flex items-center gap-1">
                {rightLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    href={link.href}
                    label={link.label}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: Wishlist + Theme + Language */}
            <div className="flex items-center gap-1 md:gap-2 min-w-[100px] md:min-w-[140px] justify-end">
              <Link
                href="/wishlist"
                className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary/10 text-foreground/70 hover:text-secondary transition-all"
                aria-label="Wishlist"
              >
                <HiHeart className="h-5 w-5" />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white"
                    >
                      {count > 9 ? "9+" : count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </motion.nav>
      </motion.header>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-[72px] transition-all duration-350" />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-card/98 backdrop-blur-xl border-b border-border shadow-xl md:hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {allLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:bg-muted"
                  )}
                >
                  {t(link.label)}
                </Link>
              ))}
              <div className="flex items-center gap-3 px-4 py-3 border-t border-border mt-2">
                <SocialIcons />
                <ThemeToggle />
              </div>
              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-secondary"
              >
                <HiHeart className="h-5 w-5" />
                {t("wishlist")} {count > 0 && `(${count})`}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
