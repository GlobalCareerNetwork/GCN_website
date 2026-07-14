"use client";

// Client component — owns the ssr:false dynamic import required by Next.js 16.
// HeroSection (server) renders this; Three.js never touches the SSR bundle.

import dynamic from "next/dynamic";

const Globe3D = dynamic(() => import("@/components/Globe3D"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="w-48 h-48 rounded-full border-2 animate-pulse"
        style={{ borderColor: "rgba(158,34,26,0.3)" }}
      />
    </div>
  ),
});

export default function GlobeWrapper({ className }: { className?: string }) {
  return <Globe3D className={className} />;
}
