import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server's "Network" URL load client JS; without it forms submit without hydrating.
  allowedDevOrigins: ["127.0.2.2", "127.0.0.1"],
  async redirects() {
    return [
      { source: "/sermons", destination: "/teachings", permanent: true },
      { source: "/blog", destination: "/teachings", permanent: true },
      // Shared CLAYCON links (e.g. /claycon/register) land on the CLAY pages.
      { source: "/claycon/:path*", destination: "/clay/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
