"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { submitArticleAction } from "@/app/actions/article-actions";
export default function CreateArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("开始写作...");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("请填写标题和内容");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitArticleAction({
        title,
        content,
      });

      if (response.ok) {
        router.push("/articles");
      } else {
        alert("发布失败");
      }
    } catch (error) {
      console.error(error);
      alert("发布出错");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          创建文章
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 标题输入 */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              文章标题
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-elegant"
              placeholder="请输入文章标题"
            />
          </div>

          {/* Markdown 编辑器 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              文章内容 (Markdown)
            </label>
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <MDEditor
                value={content}
                onChange={(value) => setContent(value || "")}
                height={500}
                preview="edit"
              />
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1 w-2"
            >
              {isSubmitting ? "发布中..." : "发布文章"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 text-gray-700 dark:text-gray-300 font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
