import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/sermons", destination: "/teachings", permanent: true },
      { source: "/blog", destination: "/teachings", permanent: true },
    ];
  },
};

export default nextConfig;
