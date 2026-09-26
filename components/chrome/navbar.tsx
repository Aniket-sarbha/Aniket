"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { ManifestRow } from "@/components/chrome/manifest-row";
import { HomeLink } from "@/components/chrome/home-link";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  // Tier 3: "/" opens the menu, Escape closes it (never inside form fields).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open ]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "flex items-center justify-between px-5 transition-all duration-300 md:px-10",
            open
              ? "bg-transparent py-5 text-[#F4F0E8]"
              : scrolled
                ? "bg-[#F4F0E8]/90 py-3 text-[#111014] backdrop-blur-xl"
                : "bg-transparent py-5 text-[#111014]"
          )}
        >
          <HomeLink
            hash="#top"
            className="font-display text-lg tracking-tight"
            ariaLabel="Back to top"
          >
            A.SARBH<span className="text-[#FF5C5C]">—LOG</span>
          </HomeLink>
          <div className="flex items-center gap-5">
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]"
            >
              <span
                aria-hidden
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  open ? "bg-[#F4F0E8]" : "bg-[#FF5C5C]"
                )}
              />
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Primary"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#21152E] px-5 pb-10 pt-28 text-[#F4F0E8] md:px-10"
          >
            <ManifestRow
              dark
              items={["Index", profile.location, profile.available ? "Available" : "Closed"]}
              className="mb-6"
            />
            <ul className="space-y-1">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.45 }}
                >
                  <HomeLink
                    hash={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4"
                  >
                    <span className="font-mono text-xs text-[#FF5C5C]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[13vw] leading-[0.95] transition-colors group-hover:text-[#B9A7FF] sm:text-6xl md:text-7xl">
                      {l.label}
                    </span>
                    <ArrowUpRight
                      size={28}
                      aria-hidden
                      className="self-center opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </HomeLink>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F4F0E8]/60">
              <a href={`mailto:${profile.email}`} className="hover:text-[#FF5C5C]">
                Email
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[#FF5C5C]">
                GitHub
              </a>
              <a href={profile.resume} download className="hover:text-[#FF5C5C]">
                Resume
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
