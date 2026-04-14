"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useVirtualizer } from "@tanstack/react-virtual";
import { fetchArticles } from "@/app/actions/article-actions";
import type { Article } from "@/app/lib/data";

// 文章卡片高度（估算值，用于虚拟列表）
const ARTICLE_CARD_HEIGHT = 140;
const ARTICLE_GAP = 16; // 间距 16px

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // 虚拟列表容器引用
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchArticles().then((data) => {
      setArticles(data as Article[]);
      setLoading(false);
    });
  }, []);

  // 虚拟列表配置
  const virtualizer = useVirtualizer({
    count: articles.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ARTICLE_CARD_HEIGHT + ARTICLE_GAP,
    overscan: 5, // 预渲染上下各5个，避免白屏
  });

  const virtualItems = virtualizer.getVirtualItems();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-elegant animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            文章列表
          </h1>
          <button
            className="btn-primary"
            onClick={() => router.push("/articles/create")}
          >
            创建文章
          </button>
        </div>

        {/* 文章列表 */}
        {articles.length === 0 ? (
          <div className="card-elegant text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              暂无文章，点击右上角创建第一篇吧！
            </p>
          </div>
        ) : (
          <div
            ref={parentRef}
            className="h-[calc(100vh-200px)] overflow-auto"
            style={{ contain: "strict" }}
          >
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {virtualItems.map((virtualItem) => {
                const article = articles[virtualItem.index];
                return (
                  <article
                    key={article.id}
                    className="card-elegant cursor-pointer hover:shadow-xl transition-shadow"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${ARTICLE_CARD_HEIGHT}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                    onClick={() => router.push(`/articles/${article.id}`)}
                  >
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                      {article.summary || "暂无摘要"}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>
                        {new Date(article.date).toLocaleDateString("zh-CN")}
                      </span>
                      <span className="text-blue-500 hover:text-blue-600">
                        阅读更多 →
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
