import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Añadimos 'unpkg.com' a la lista de fuentes de scripts permitidas
            value: "worker-src 'self' blob: https://unpkg.com; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://unpkg.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
