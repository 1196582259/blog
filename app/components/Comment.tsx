"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchComments, fetchSubmitComment } from "../actions/comment-actions";
import { type Comment } from "../lib/data";
import Avatar from "./Avatar";

export default function Comment() {
  const params = useParams();
  const articleId = params.id;
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchingIndex, setFetchingIndex] = useState(0);
  console.log(articleId);

  useEffect(() => {
    fetchComments(articleId ? Number(articleId) : undefined).then((res) => {
      setComments(res as Comment[]);
    });
  }, [articleId, fetchingIndex]);

  return (
    <div className="card-elegant mt-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        发表评论
      </h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          await fetchSubmitComment({
            article_id: articleId ? Number(articleId) : undefined,
            email: e.target.email.value,
            content: e.target.content.value,
          });
          setFetchingIndex((prev) => prev + 1);
          e.target.reset();
        }}
      >
        <label className="text-lg font-bold" htmlFor="email">
          邮箱：
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input-elegant"
          placeholder="请输入邮箱"
        />
        <label className="text-lg font-bold" htmlFor="content">
          评论内容：
        </label>
        <textarea
          id="content"
          rows={4}
          name="content"
          className="textarea-elegant"
          placeholder="写下你的想法..."
        />
        <button type="submit" className="btn-primary">
          提交
        </button>
      </form>

      <div className="space-y-4 mt-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar email={comment.email} />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {comment.email}
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>

            <p className="text-lg font-bold mt-2 dark:text-gray-200">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
