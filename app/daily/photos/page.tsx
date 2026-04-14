"use client";

import { useState } from "react";
import Image from "next/image";

// 图片列表
const photos = [
  { src: "/images/1.jpg", title: "照片 1" },
  { src: "/images/image1.jpg", title: "照片 2" },
  { src: "/images/22.png", title: "照片 3" },
  { src: "/images/WIP-6th-anniversary-wallpaper-dark.jpg", title: "深色壁纸" },
  { src: "/images/WIP-6th-anniversary-wallpaper-light.jpg", title: "浅色壁纸" },
  { src: "/images/windows dark-light.jpg", title: "Windows 壁纸" },
  { src: "/images/小爱09.jpg", title: "小爱" },
  { src: "/images/希儿.jpg", title: "希儿" },
  { src: "/images/慵懒少女.jpg", title: "慵懒少女" },
  { src: "/images/猛亲.gif", title: "猛亲" },
  { src: "/images/电脑壁纸(15).jpg", title: "电脑壁纸 15" },
  { src: "/images/电脑壁纸(3).jpeg", title: "电脑壁纸 3" },
  { src: "/images/神殿少女.jpg", title: "神殿少女" },
  { src: "/images/赛博朋克风1.jpg", title: "赛博朋克" },
  { src: "/images/雨女.png", title: "雨女" },
];

export default function PhotosPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        照片墙
      </h1>

      {/* 瀑布流照片墙 */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
            onClick={() => setSelectedPhoto(photo.src)}
          >
            <Image
              loading="lazy"
              unoptimized={true}
              src={photo.src}
              alt={photo.title}
              width={400}
              height={300}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* 悬停遮罩 */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pb-4 font-medium">
                {photo.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 大图预览弹窗 */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <Image
              src={selectedPhoto}
              alt="预览"
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            {/* 关闭按钮 */}
            <button
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
