"use client";

import { useState, useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { fetchDailyQuoteHistory } from "@/app/actions/daily-actions";
import { type DailyQuote } from "@/app/lib/data";

export default function DailyHistoryPage() {
  const [quotes, setQuotes] = useState<DailyQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const parentRef = useRef<HTMLDivElement>(null);
  const gap = 16; // 间距 16px
  const QUOTE_CARD_HEIGHT = 160; // 160px
  const rowVirtualizer = useVirtualizer({
    count: quotes.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => QUOTE_CARD_HEIGHT + gap, // 估计每个项目的高度
    overscan: 5, // 预加载5个项目
  });

  useEffect(() => {
    loadQuoteHistory();
  }, []);

  const loadQuoteHistory = async () => {
    try {
      const data = await fetchDailyQuoteHistory();
      setQuotes(data);
    } catch (error) {
      console.error("加载历史记录失败:", error);
    } finally {
      setLoading(false);
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
          每日一言历史记录
        </h1>
        <p className="text-gray-500 dark:text-gray-400">查看过往的每日一言</p>
      </div>

      {/* 历史记录列表 */}
      {quotes.length > 0 ? (
        <div
          ref={parentRef}
          className="overflow-auto"
          style={{
            height: "calc(100vh - 370px)",
            width: "100%",
            contain: "strict",
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const quote = quotes[virtualItem.index];
              return (
                <div
                  key={quote.id}
                  className="card-elegant hover:shadow-xl transition-shadow"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${QUOTE_CARD_HEIGHT}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <div className="p-6 h-full">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl text-blue-500 flex-shrink-0">
                        “
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
                          {quote.content}
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            —— {quote.author || "匿名"}
                          </span>
                          <span className="text-gray-400">
                            {new Date(quote.date).toLocaleDateString("zh-CN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="card-elegant text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">暂无历史记录</p>
        </div>
      )}
    </div>
  );
}
