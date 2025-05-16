"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "./button"
import { Skeleton } from "./skeleton";


export function ThemeToggle() {

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <Skeleton aria-label="Theme toggle loading" className="h-[36px] w-[36px] rounded-full" />
  }
  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.classList.remove(currentTheme);
    html.classList.add(nextTheme);

    document.cookie = `theme=${nextTheme}; path=/; max-age=31536000`;
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full border-[#10538a] dark:border-yellow-300"
      aria-label="Theme toggle"
    >
      <Sun color={"yellow"} className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all  dark:rotate-0 dark:scale-100" />
      <Moon color={"#10538a"} className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
    </Button>
  )
}
