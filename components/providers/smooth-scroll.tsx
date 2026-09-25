"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Tier 3: console easter egg. The logbook goes one level deeper.
    console.log(
      "%cSHIP LOG — 04 shipments, 0 placeholders. Hire the person who ships: sarbhaaniket@gmail.com",
      "font-family:monospace;font-size:12px;background:#21152E;color:#F4F0E8;padding:8px 12px;border-left:4px solid #FF5C5C;"
    );
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Smooth intra-page anchor navigation via Lenis (replaces CSS scroll-behavior).
    // Handles bare "#hash" links in-page, "/#hash" links that already landed,
    // and client-side arrivals carrying a hash (e.g. case page → /#projects).
    const scrollToHash = (hash: string) => {
      const el = document.querySelector(hash);
      if (!el) return false;
      lenis.scrollTo(el as HTMLElement, { offset: -96, duration: 1.2 });
      return true;
    };
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.('a[href^="#"], a[href^="/#"]');
      if (!anchor) return;
      const raw = anchor.getAttribute("href");
      if (!raw || raw === "#" || raw === "/#") return;
      const hash = raw.startsWith("/#") ? raw.slice(1) : raw;
      const url = new URL(raw, window.location.origin);
      if (url.pathname !== window.location.pathname) return; // let Next navigate
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      scrollToHash(hash);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    if (window.location.hash) {
      const hash = window.location.hash;
      requestAnimationFrame(() => scrollToHash(hash));
    }

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
