"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((prev) => !prev)}
      aria-label="Toggle theme"
      className="group relative flex size-10 items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-background/80 text-foreground shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
    >
      <span className="absolute inset-0 bg-primary/0 transition group-hover:bg-primary/5" />

      {dark ? (
        <Sun
          className="relative size-[18px] text-amber-400 transition-transform duration-300 group-hover:rotate-45"
          strokeWidth={2}
        />
      ) : (
        <Moon
          className="relative size-[18px] text-foreground transition-transform duration-300 group-hover:-rotate-12"
          strokeWidth={2}
        />
      )}
    </button>
  );
};

export default ThemeToggle;