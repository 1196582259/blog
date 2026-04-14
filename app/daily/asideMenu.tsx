"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    label: "每日一言",
    href: "/daily",
  },
  {
    label: "照片墙",
    href: "/daily/photos",
  },
  {
    label: "游戏",
    href: "/daily/games",
  },
];

interface AsideMenuProps {
  className?: string;
}

export default function AsideMenu({ className = "" }: AsideMenuProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 h-fit sticky top-8 ${className}`}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        菜单
      </h2>
      <nav className="flex flex-col gap-2">
        {menus.map((menu) => {
          let isActive = pathname === menu.href;
          // 当访问 /daily/history 时，高亮每日一言菜单项
          if (menu.href === "/daily" && pathname.startsWith("/daily/")) {
            isActive = true;
          }
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {menu.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
