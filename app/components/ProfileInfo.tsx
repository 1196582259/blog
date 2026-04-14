'use client';

import { memo } from 'react';

const ProfileInfo = memo(function ProfileInfo() {
  return (
    <div className="sticky top-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
          作
        </div>
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white">作者名称</h2>
          <p className="text-zinc-600 dark:text-zinc-400">前端架构师</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black dark:text-white">关于我</h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          专注于前端技术研究与实践，热爱分享技术心得和最佳实践。
          擅长 React、Next.js、TypeScript 等现代前端技术栈。
        </p>
        <div className="flex gap-4 pt-2">
          <a href="#" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            GitHub
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            博客
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            联系方式
          </a>
        </div>
      </div>
    </div>
  );
});

export default ProfileInfo;