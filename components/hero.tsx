"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile, projects } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

function DelhiTime() {
  // ponytail: static label, no ticking clock — the gimmick wasn't earning its JS.
  return <span>DELHI / IST</span>;
}

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // ponytail: one spring pair drives the hero asterisk only. Slightly
  // under-damped so it settles with a small overshoot. Static on touch /
  // reduced motion.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 13 });
  const sy = useSpring(my, { stiffness: 50, damping: 13 });
  const rot = useTransform(sx, [-20, 20], [-24, 24]);

  const anim = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.8, ease },
        };

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Introduction"
      onMouseMove={(e) => {
        if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        const d = Math.hypot(nx, ny) || 1;
        const pull = Math.min(1, d * 2); // closer cursor → stronger pull, capped
        mx.set(nx * 40 * pull);
        my.set(ny * 40 * pull);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      // Mobile + tablet: compact stacked composition. Desktop (lg+): full
      // viewport with the name distributed between manifest and footer rows.
      className="relative overflow-hidden bg-[#F4F0E8] pb-20 pt-28 text-[#111014] md:pt-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-between lg:pb-10 lg:pt-24"
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 md:px-10 lg:justify-between">
        {/* Top metadata row */}
        <motion.div {...anim(0)} className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
          <p className="text-[#111014]">LOG—26</p>
          <div className="text-right text-[#57515B]">
            <p>
              <DelhiTime />
            </p>
            {profile.available && (
              <p className="mt-1 text-[#111014]">
                <span aria-hidden className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#FF5C5C]" />
                Available
              </p>
            )}
          </div>
        </motion.div>

        {/* Giant asymmetric name */}
        <div className="mt-10 lg:mt-0 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:py-6">
          <motion.h1 {...anim(0.08)} className="font-display text-[clamp(4.5rem,18vw,17rem)] leading-[0.85]">
            <span className="block">Aniket</span>
            <span className="block md:pl-[12vw]">
              Sarbha
              <motion.span
                aria-hidden
                style={reduce ? undefined : { x: sx, y: sy, rotate: rot }}
                className="inline-block text-[#FF5C5C]"
              >
                *
              </motion.span>
            </span>
          </motion.h1>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mt-6">
            <motion.p {...anim(0.2)} className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-[#111014]/70 md:pl-[12vw]">
              Full stack
              <span aria-hidden className="mx-2 text-[#FF5C5C]">/</span>
              Product engineering
            </motion.p>
            <motion.a
              {...anim(0.3)}
              href="#projects"
              className="group inline-flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#111014]"
            >
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-y-1">
                <ArrowDown size={14} />
              </span>
              <span className="whitespace-nowrap">Enter archive</span>
              <span className="whitespace-nowrap text-[#57515B]">
                {String(projects.length).padStart(2, "0")} shipments
              </span>
              <span aria-hidden className="block h-px w-10 bg-[#111014]/30 transition-colors group-hover:bg-[#FF5C5C]" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
