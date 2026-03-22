"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="relative h-8 w-8 rounded-full" aria-hidden>
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="
      relative h-8 w-8 rounded-full
      flex items-center justify-center
      bg-neutral-100 dark:bg-neutral-800
      hover:bg-neutral-200 dark:hover:bg-neutral-700
      border border-neutral-200 dark:border-neutral-700
      transition-all duration-300 ease-in-out
      hover:shadow-md
      group
      "
          aria-label="Toggle theme"
        >
          {/* Sun icon — visible in dark mode */}
          <Sun
            className={`
          absolute size-4 transition-all duration-500
          ${
            isDark
              ? "rotate-0 scale-100 opacity-100 text-amber-400"
              : "rotate-90 scale-0 opacity-0 text-amber-500"
          }
          `}
          />
          {/* Moon icon — visible in light mode */}
          <Moon
            className={`
          absolute size-4 transition-all duration-500
          ${
            isDark
              ? "-rotate-90 scale-0 opacity-0 text-blue-500"
              : "rotate-0 scale-100 opacity-100 text-blue-600"
          }
          `}
          />
          <TooltipContent>Toggle Theme</TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};
