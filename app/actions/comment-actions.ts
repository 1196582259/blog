"use server";
import { getComments, submitComment } from "../lib/data";

export async function fetchComments(articleId: number | undefined) {
  return await getComments(articleId);
}

export async function fetchSubmitComment(data: {
  article_id: number | undefined;
  email: string;
  content: string;
}) {
  return await submitComment(data);
}
