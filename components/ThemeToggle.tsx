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
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.3 }}
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
