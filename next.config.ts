import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server's "Network" URL load client JS; without it forms submit without hydrating.
  allowedDevOrigins: ["127.0.2.2", "127.0.0.1"],
  async redirects() {
    return [
      { source: "/sermons", destination: "/teachings", permanent: true },
      { source: "/blog", destination: "/teachings", permanent: true },
      // The CLAY pages moved to /claycon; keep old /clay links (e.g. /clay/register) working.
      { source: "/clay/:path*", destination: "/claycon/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
