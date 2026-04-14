"use server";

import { submitArticle, getArticle, getArticles } from "../lib/data";

export async function submitArticleAction(data: {
  title: string;
  content: string;
}) {
  await submitArticle(data);
  return { ok: true };
}

export async function fetchArticle(id: number) {
  return await getArticle(id);
}

export async function fetchArticles() {
  return await getArticles();
}
