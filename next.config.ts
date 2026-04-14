import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "gravatar.loli.net",
      },
      {
        protocol: "https",
        hostname: "qlogo3.store.qq.com",
      },
      {
        protocol: "https",
        hostname: "q1.qlogo.cn",
      },
    ],
  },
};

export default nextConfig;
