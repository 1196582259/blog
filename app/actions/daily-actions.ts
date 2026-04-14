"use server";

import {
  type DailyQuote,
  getDailyQuote,
  submitDailyQuote,
  getDailyQuoteHistory,
} from "@/app/lib/data";

// 获取今日一言
export async function fetchDailyQuote(): Promise<DailyQuote[] | null> {
  const quotes = await getDailyQuote();
  return quotes;
}

// 提交今日一言
export async function fetchSubmitDailyQuote(data: {
  content: string;
}): Promise<void> {
  await submitDailyQuote(data);
}

// 获取历史记录
export async function fetchDailyQuoteHistory(): Promise<DailyQuote[]> {
  const quotes = await getDailyQuoteHistory();
  return quotes;
}
