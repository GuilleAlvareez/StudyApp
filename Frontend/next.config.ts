// ESTRUCTURA CORRECTA
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La función headers es una propiedad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "worker-src 'self' blob: https://unpkg.com; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://unpkg.com https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com;",
          },
        ],
      },
    ];
  },

  // La función webpack es OTRA propiedad, al mismo nivel que headers
  webpack: (config) => {
    config.externals.push('canvas');
    return config;
  },
};

export default nextConfig;