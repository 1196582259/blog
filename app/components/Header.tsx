"use client";

import { useTheme } from "./ThemeProvider";
import { useCallback, memo, useEffect, useState } from "react";
import Link from "next/link";
import { SunIcon, MoonIcon } from "./Icons";

const navLinks = [
  { href: "/articles", label: "文章列表" },
  { href: "/daily", label: "日常点滴" },
  { href: "/growth", label: "成长记录" },
  { href: "/other", label: "其它" },
] as const;

const Header = memo(function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl font-bold text-black dark:text-white"
          >
            成长时刻
          </Link>

          <nav className="flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-700 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="切换深色模式"
          >
            {mounted && theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
});

export default Header;
