"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { ManifestRow } from "@/components/chrome/manifest-row";
import { Reveal } from "@/components/chrome/reveal";
import { cn } from "@/lib/utils";

const num = (i: number) => String(i + 1).padStart(2, "0");

export function IndexList() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [fine] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-label="Project archive"
      onMouseMove={(e) => {
        if (!fine) return;
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className="relative scroll-mt-20 bg-[#E5EEE5] py-24 text-[#1E2823] md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <ManifestRow dark items={["Archive", "04 shipments", "2024 — 2025"]} />
          <h2 className="font-display mt-3 text-5xl md:text-7xl">
            Archive <span className="font-editorial normal-case">of built things</span>
            <span aria-hidden className="text-[#FF5C5C]">*</span>
          </h2>
        </Reveal>
        <ul className="mt-12 border-t border-[#1E2823]/10">
          {projects.map((p, i) => {
            const active = hovered === i;
            return (
              <li key={p.slug} className="border-b border-[#1E2823]/10">
                <Link
                  href={`/projects/${p.slug}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  aria-label={`Open case study: ${p.title}`}
                  className={cn(
                    "group relative grid grid-cols-12 items-baseline gap-x-5 gap-y-1 px-2 py-7 transition-all duration-300 md:py-9",
                    "focus-visible:outline-[#47735F]",
                    active && "bg-[#F6F1E8]/70"
                  )}
                >
                  <span className="col-span-2 font-mono text-xs text-[#C7664D] md:col-span-1">
                    {num(i)}
                  </span>
                  <span className="col-span-8 md:col-span-5 lg:col-span-6">
                    <span
                      className={cn(
                        "font-display block text-4xl leading-[0.95] transition-transform duration-300 md:text-5xl lg:text-6xl",
                        active && "md:translate-x-3"
                      )}
                    >
                      {p.title}
                    </span>
                    <span className="mt-2 block text-sm text-[#1E2823]/60 md:hidden">
                      {p.tagline}
                    </span>
                  </span>
                  <span className="col-span-8 col-start-3 hidden font-mono uppercase tracking-[0.18em] text-[#5D6961] md:col-span-5 md:col-start-7 md:block md:text-[10px] lg:col-span-3 lg:col-start-8 lg:text-[11px]">
                    {p.indexTags}
                  </span>
                  <span className="hidden text-right font-mono text-[11px] uppercase tracking-[0.18em] text-[#5D6961] md:col-span-1 lg:block">
                    {p.year}
                  </span>
                  <span className="col-span-2 flex items-center justify-end gap-2 md:col-span-1">
                    <span
                      aria-hidden
                      className={cn(
                        "hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-[#47735F] opacity-0 transition-opacity duration-200 lg:inline",
                        active && "opacity-100"
                      )}
                    >
                      Open case
                    </span>
                    <ArrowUpRight
                      size={22}
                      aria-hidden
                      className={cn(
                        "text-[#1E2823]/40 transition-all duration-300",
                        active && "-translate-y-1 translate-x-1 text-[#47735F]"
                      )}
                    />
                  </span>
                  {/* Mobile thumb: tap-expandable via details-free always-visible strip */}
                  <span className="col-span-12 col-start-1 mt-3 block md:hidden">
                    <Image
                      src={p.images[0].src}
                      alt=""
                      width={800}
                      height={450}
                      sizes="100vw"
                      loading="lazy"
                      className="h-auto w-full border border-[#1E2823]/15"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Large editorial preview (desktop pointers only, no preview on touch) */}
      {fine && !reduce && hovered !== null && (
        <motion.div
          aria-hidden
          key={hovered}
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ left: pos.x + 32, top: pos.y - 130 }}
          className="pointer-events-none absolute z-10 hidden w-[26rem] border border-[#1E2823]/20 bg-[#F6F1E8] lg:block"
        >
          <Image
            src={projects[hovered].images[0].src}
            alt=""
            width={832}
            height={468}
            className="h-auto w-full"
          />
          <p className="flex items-center justify-between bg-[#47735F] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F6F1E8]">
            <span>View shipment</span>
            <span>{projects[hovered].year}</span>
          </p>
        </motion.div>
      )}
    </section>
  );
}
