import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

const nextConfig: NextConfig = {
  poweredByHeader: false,  // CN-005: suppress Next.js fingerprinting
  reactStrictMode: true,   // CN-016: catch deprecated APIs and side effects early

  images: {
    remotePatterns: [
      // CN-008: HTTPS-only. Replace "**" with your actual CDN hostname in production.
      // e.g. { protocol: "https", hostname: "your-bucket.s3.amazonaws.com" }
      { protocol: "https", hostname: "**" },
    ],
  },

  // CN-005: HTTP security headers on every response
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              `connect-src 'self' ${apiUrl}`,
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
