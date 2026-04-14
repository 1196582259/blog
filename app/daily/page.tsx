"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  fetchDailyQuote,
  fetchSubmitDailyQuote,
} from "@/app/actions/daily-actions";
import { type DailyQuote } from "@/app/lib/data";

export default function DailyPage() {
  const [quote, setQuote] = useState<DailyQuote | null>(null);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newQuote, setNewQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadTodayQuote();
  }, []);

  const loadTodayQuote = async () => {
    try {
      const data = await fetchDailyQuote();
      if (data) {
        setQuote(data[0]);
        setHasSubmittedToday(true);
      }
    } catch (error) {
      console.error("加载失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuote.trim() || hasSubmittedToday) return;

    setIsSubmitting(true);
    try {
      await fetchSubmitDailyQuote({
        content: newQuote,
      });
      await loadTodayQuote();
      setNewQuote("");
      setAuthor("");
    } catch (error) {
      console.error("提交失败:", error);
      alert("提交失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          每日一言
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </p>
      </div>

      {/* 今日一言展示 */}
      {quote ? (
        <div className="card-elegant text-center py-12">
          <div className="text-6xl text-blue-500 mb-6">“”</div>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed mb-6 max-w-2xl mx-auto">
            {quote.content}
          </p>
          <div className="text-gray-500 dark:text-gray-400">—— 匿名</div>
          <div className="mt-8 text-sm text-gray-400">
            今日已添加，明天再来吧！
          </div>
        </div>
      ) : (
        <div className="card-elegant">
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
              今天还没有一言，快来添加吧！
            </p>
          </div>

          {/* 添加表单 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="quote"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                一言内容
              </label>
              <textarea
                id="quote"
                value={newQuote}
                onChange={(e) => setNewQuote(e.target.value)}
                className="textarea-elegant"
                placeholder="写下你的一言..."
                rows={4}
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                作者（可选）
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="input-elegant"
                placeholder="匿名"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !newQuote.trim()}
              className="btn-primary w-full"
            >
              {isSubmitting ? "提交中..." : "添加今日一言"}
            </button>
          </form>
        </div>
      )}

      {/* 历史记录入口 */}
      <div className="text-center">
        <Link
          href="/daily/history"
          className="text-blue-500 hover:text-blue-600 transition-colors inline-block"
        >
          查看历史记录 →
        </Link>
      </div>
    </div>
  );
}
