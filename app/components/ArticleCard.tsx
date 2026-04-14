'use client';

import { memo } from 'react';

interface Article {
  id: number;
  title: string;
  date: string;
  summary: string;
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = memo(function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400">
          {article.title}
        </h3>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {article.date}
        </span>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4">
        {article.summary}
      </p>
      <a
        href={`/articles/${article.id}`}
        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
      >
        阅读更多 →
      </a>
    </article>
  );
});

export default ArticleCard;