import { ReactNode } from "react";
import AsideMenu from "./asideMenu";

export default function DailyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto flex gap-6">
        {/* 侧边栏 */}
        <AsideMenu />
        
        {/* 主内容区 */}
        <main className="flex-1 min-w-0">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 min-h-[calc(100vh-200px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
