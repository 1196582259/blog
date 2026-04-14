"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Comment from "@/app/components/Comment";
import MDEditor from "@uiw/react-md-editor";
import { fetchArticle } from "@/app/actions/article-actions";
import type { Article } from "@/app/lib/data";

export default function ArticleDetailPage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const articleId = params.id;

  useEffect(() => {
    fetchArticle(Number(articleId)).then((res) => {
      setArticle(res[0]);
      setLoading(false);
    });
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card-elegant">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card-elegant text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              文章不存在
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              该文章可能已被删除或不存在
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 文章详情卡片 */}
        <article className="card-elegant">
          {/* 标题 */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {article.title}
          </h1>

          {/* 元信息 */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <span>
              发布于 {new Date(article.date).toLocaleDateString("zh-CN")}
            </span>
          </div>

          {/* 内容 */}
          <div className="prose dark:prose-invert max-w-none">
            <MDEditor.Markdown source={article.content} />
          </div>
        </article>

        {/* 评论区 */}
        <Comment />
      </div>
    </div>
  );
}
