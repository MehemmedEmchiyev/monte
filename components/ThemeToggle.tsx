"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { HiSun, HiMoon } from "react-icons/hi2";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full"
    >
      <motion.div
        key={theme}
        initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.25 }}
      >
        {theme === "dark" ? (
          <HiMoon className="h-5 w-5" />
        ) : (
          <HiSun className="h-5 w-5 text-secondary" />
        )}
      </motion.div>
    </Button>
  );
}
