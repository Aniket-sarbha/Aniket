"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { ManifestRow } from "@/components/chrome/manifest-row";

const ease = [0.22, 1, 0.36, 1] as const;

function HarborTime() {
  const [now, setNow] = useState("--:--");
  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);
  return <span suppressHydrationWarning>DEL {now}</span>;
}

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const nx = useSpring(mx, { stiffness: 60, damping: 20 });
  const ny = useSpring(my, { stiffness: 60, damping: 20 });
  const [spin, setSpin] = useState(false);

  // ponytail: no sessionStorage reads in render (SSR/client parity). The
  // preloader overlay covers the first ~1.4s on first visits, so these play
  // as the curtain lifts; on repeat visits they play immediately.
  const anim = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.7, ease },
        };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={(e) => {
        if (reduce || window.innerWidth < 1024) return;
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 40);
        my.set(((e.clientY - rect.top) / rect.height - 0.5) * 40);
      }}
      className="relative overflow-hidden bg-[#F4F0E8] pb-16 pt-28 text-[#111014] md:pb-24 md:pt-36"
    >
      {/* Pointer-reactive watermark numeral (desktop pointers only) */}
      <motion.span
        aria-hidden
        style={reduce ? undefined : { x: nx, y: ny }}
        className="font-display pointer-events-none absolute -right-8 top-10 hidden select-none text-[24vw] leading-none text-[#111014]/[0.05] lg:block"
      >
        26
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <motion.div {...anim(0)}>
          <ManifestRow
            items={[
              "LOG—26",
              profile.location,
              profile.available ? "Open for work" : "Currently closed",
            ]}
          />
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8E8790]">
            <HarborTime /> · <span className="text-[#FF5C5C]">●</span> Harbor live
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-x-5">
          <div className="col-span-12 lg:col-span-10">
            <motion.h1 {...anim(0.08)} className="font-display mt-6 text-[clamp(3.5rem,17vw,12rem)]">
              Aniket
              <br />
              <span className="font-editorial normal-case">Sarbha</span>
              <motion.span
                aria-hidden
                animate={spin && !reduce ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.5, ease }}
                onHoverStart={() => setSpin(true)}
                onHoverEnd={() => setSpin(false)}
                className="inline-block cursor-default text-[#FF5C5C]"
              >
                *
              </motion.span>
            </motion.h1>
            <motion.p
              {...anim(0.2)}
              className="mt-6 max-w-xl text-lg leading-relaxed text-[#111014]/75 md:text-xl"
            >
              {profile.role} — I build storefronts and SaaS products people
              enjoy using, from first commit to deploy.
            </motion.p>
            <motion.div {...anim(0.3)} className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Button href="#projects">
                  View work <ArrowDown size={15} />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button variant="ghost" href={`mailto:${profile.email}`}>
                  <Mail size={15} /> {profile.email}
                </Button>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
