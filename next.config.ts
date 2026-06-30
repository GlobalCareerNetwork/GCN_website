import type { NextConfig } from "next";

// Domains actually loaded by this app (audited 2026-06-30):
// - fonts.googleapis.com  → Plus Jakarta Sans CSS (fallback)
// - fonts.gstatic.com     → Plus Jakarta Sans font files (fallback)
// - api.fontshare.com     → General Sans CSS
// - cdn.fontshare.com     → General Sans font files
// - blob:                 → Three.js WebGL worker scripts
// - 'unsafe-eval'         → Three.js GLSL shader compilation (WebGL requirement)
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval'",           // unsafe-eval: Three.js shader compiler
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
  "font-src 'self' https://fonts.gstatic.com https://api.fontshare.com https://cdn.fontshare.com",
  "img-src 'self' data: blob: https://_next",
  "connect-src 'self'",
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
