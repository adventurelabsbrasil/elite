import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/inscreva-se", destination: "/", permanent: true },
      { source: "/login", destination: "/admin/login", permanent: false },
    ];
  },
  async rewrites() {
    return [
      // Heatmap API is handled by Next.js (dev and prod)
      { source: "/api/heatmap/:path*", destination: "/api/heatmap/:path*" },
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/:path*"
            : "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
