"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { ManifestRow } from "@/components/chrome/manifest-row";
import { Reveal } from "@/components/chrome/reveal";

export function IndexList() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [fine] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-label="Selected shipments"
      onMouseMove={(e) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className="relative scroll-mt-20 bg-[#21152E] py-24 text-[#F4F0E8] md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <ManifestRow dark items={["Index", "04 shipments", "2024 — 2025"]} />
          <h2 className="font-display mt-3 text-5xl md:text-7xl">
            Selected <span className="font-editorial normal-case">shipments</span>
          </h2>
        </Reveal>
        <ul className="mt-12 border-t border-white/10">
          {projects.map((p, i) => (
            <li key={p.slug} className="border-b border-white/10">
              <Link
                href={`/projects/${p.slug}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="group grid grid-cols-12 items-baseline gap-2 py-6 transition-colors md:py-8"
              >
                <span className="col-span-2 font-mono text-xs text-[#FF5C5C] md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display col-span-10 text-4xl leading-none transition-transform duration-300 group-hover:translate-x-2 md:col-span-6 md:text-6xl">
                  {p.title}
                </span>
                <span className="col-span-10 col-start-3 mt-1 text-sm text-[#F4F0E8]/60 md:col-span-4 md:col-start-8 md:mt-0">
                  {p.tagline}
                </span>
                <span className="hidden justify-end md:col-span-1 md:flex">
                  <ArrowUpRight
                    size={24}
                    aria-hidden
                    className="text-[#F4F0E8]/40 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#B9A7FF]"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cursor-following preview (desktop pointers only) */}
      {fine && hovered !== null && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          style={{ left: pos.x + 24, top: pos.y - 90 }}
          className="pointer-events-none absolute z-10 hidden w-72 overflow-hidden rounded-lg border border-white/20 shadow-2xl lg:block"
        >
          <Image
            src={projects[hovered].images[0].src}
            alt=""
            width={576}
            height={324}
            className="h-auto w-full"
          />
        </motion.div>
      )}
    </section>
  );
}
