import type { NextConfig } from "next";

// Domains actually loaded by this app (re-audited 2026-07-20):
// - fonts.googleapis.com     → Plus Jakarta Sans CSS (fallback)
// - fonts.gstatic.com        → Plus Jakarta Sans font files (fallback)
// - api.fontshare.com        → General Sans CSS
// - cdn.fontshare.com        → General Sans font files
// - blob:                    → Three.js WebGL worker scripts
// - 'unsafe-eval'            → Three.js GLSL shader compilation (WebGL requirement)
// - va.vercel-scripts.com    → Vercel Analytics script + event beacons
// - www.googletagmanager.com → Google Analytics 4 script tag loader (@next/third-parties)
// - www.google-analytics.com → Google Analytics 4 telemetry data collection endpoints
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://www.googletagmanager.com", // unsafe-eval: Three.js shader compiler; unsafe-inline: Next.js RSC hydration payload scripts (no CSP nonce middleware configured — without this, the browser blocks every inline <script> tag Next.js emits for streaming/hydration, which silently breaks all client-side JS: the globe never mounts, scroll/flip handlers never attach)
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
  "font-src 'self' https://fonts.gstatic.com https://api.fontshare.com https://cdn.fontshare.com",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://va.vercel-scripts.com https://www.google-analytics.com https://*.google-analytics.com",
  "worker-src blob:",                           // Three.js WebGL worker
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
]
  .join("; ")
  .replace(/\n/g, "");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: CSP,
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    // 2-year max-age; includeSubDomains for *.asu.edu subdomain safety
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    // Disable features GCN never uses
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;