import ProfileInfo from "./components/ProfileInfo";
import ArticleCard from "./components/ArticleCard";
import Comment from "./components/Comment";
import { Suspense } from "react";

const articles = [
  {
    id: 1,
    title: "Next.js 16 新特性深度解析",
    date: "2026-04-01",
    summary:
      "探索 Next.js 16 的最新特性，包括 React 19 集成、App Router 增强等。",
  },
  {
    id: 2,
    title: "前端性能优化实战指南",
    date: "2026-03-28",
    summary: "从代码层面到构建流程，全面提升前端应用性能的实用技巧。",
  },
  {
    id: 3,
    title: "React Server Components 最佳实践",
    date: "2026-03-20",
    summary: "掌握 RSC 的核心概念和使用场景，构建更高效的服务端渲染应用。",
  },
  {
    id: 4,
    title: "TypeScript 5.5 新特性详解",
    date: "2026-03-15",
    summary: "深入了解 TypeScript 5.5 的新功能，提升类型安全和开发效率。",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="hidden md:block md:col-span-1">
            <ProfileInfo />
          </div>

          <div className="md:col-span-2">
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
                近期发表的文章
              </h2>

              <div className="space-y-6">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <Comment />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
