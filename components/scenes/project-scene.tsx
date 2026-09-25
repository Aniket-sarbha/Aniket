"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { ManifestRow } from "@/components/chrome/manifest-row";
import { Reveal } from "@/components/chrome/reveal";
import { cn } from "@/lib/utils";

const num = (i: number) => String(i + 1).padStart(2, "0");

function Frame({
  src,
  alt,
  caption,
  dark,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  caption: string;
  dark: boolean;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden border", dark ? "border-white/15" : "border-[#111014]/15", className)}>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        sizes={sizes}
        className="h-auto w-full"
        loading={priority ? undefined : "lazy"}
        priority={priority}
      />
      <figcaption
          className={cn(
          "border-t px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em]",
          dark ? "border-white/10 bg-[#21152E] text-[#F4F0E8]/60" : "border-[#111014]/10 bg-[#F4F0E8] text-[#57515B]"
        )}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

function Manifest({ project, dark }: { project: Project; dark: boolean }) {
  const rows: [string, React.ReactNode][] = [
    ["Type", project.type],
    ["Role", project.role],
    ["Stack", project.stack.join(" · ")],
    ["Year", project.year],
    ["Status", <span key="s" className="inline-flex items-center gap-1.5"><span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF5C5C]" />{project.status}</span>],
  ];
  const access = (
    <span className="flex gap-4">
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
          Live <ArrowUpRight size={12} />
        </a>
      )}
      {project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
          Repo <ArrowUpRight size={12} />
        </a>
      )}
      {!project.liveUrl && !project.repoUrl && <span className="opacity-60">Case study only</span>}
    </span>
  );
  return (
    <div className={cn("border-t pt-5", dark ? "rule-ivory" : "rule-ink")}>
      <p className={cn("font-mono text-[11px] uppercase tracking-[0.18em]", dark ? "text-[#FF5C5C]" : "text-[#B3272D]")}>Manifest</p>
      <dl className="mt-4 space-y-3 text-sm">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className={cn("font-mono text-[11px] uppercase tracking-[0.18em]", dark ? "text-[#F4F0E8]/50" : "text-[#57515B]")}>{k}</dt>
            <dd className="mt-1 leading-relaxed">{v}</dd>
          </div>
        ))}
        <div>
            <dt className={cn("font-mono text-[11px] uppercase tracking-[0.18em]", dark ? "text-[#F4F0E8]/50" : "text-[#57515B]")}>Access</dt>
          <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em]">{access}</dd>
        </div>
      </dl>
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
          dark ? "bg-[#F4F0E8] text-[#21152E] hover:bg-[#B9A7FF]" : "bg-[#111014] text-[#F4F0E8] hover:bg-[#FF5C5C]"
        )}
      >
        Open shipment <ArrowRight size={15} />
      </Link>
    </div>
  );
}

function SceneHead({ project, index, dark }: { project: Project; index: number; dark: boolean }) {
  return (
    <Reveal>
      <ManifestRow dark={dark} items={[`Shipment ${num(index)}`, project.year, project.type]} />
      <h3 id={`project-${project.slug}`} className="font-display mt-4 text-[14vw] leading-[0.9] sm:text-6xl md:text-7xl xl:text-8xl">
        {project.title.split(" ")[0]}{" "}
        <span className="font-editorial normal-case">
          {project.accent ?? project.title.split(" ").slice(1).join(" ")}
        </span>
      </h3>
      <p className={cn("mt-4 max-w-xl text-lg leading-relaxed md:text-xl", dark ? "text-[#F4F0E8]/75" : "text-[#111014]/70")}>
        {project.tagline}
      </p>
    </Reveal>
  );
}

export function ProjectScene({ project, index }: { project: Project; index: number }) {
  const dark = project.colorway === "plum";
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numeralY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const shotY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={ref}
      id={`scene-${project.slug}`}
      aria-labelledby={`project-${project.slug}`}
      className={cn(
        // ponytail: hairline seam keeps colorway alternation continuous;
        // boundary padding trimmed so scenes read as one archive.
        "relative overflow-hidden border-t py-28 md:py-32",
        dark ? "border-white/10 bg-[#21152E] text-[#F4F0E8]" : "border-[#111014]/10 bg-[#F4F0E8] text-[#111014]"
      )}
    >
      <motion.span
        aria-hidden
        style={reduce ? undefined : { y: numeralY }}
        className={cn(
          "font-display pointer-events-none absolute -top-4 select-none text-[32vw] leading-none md:text-[24vw]",
          index % 2 === 1 ? "-right-4" : "-left-4",
          dark ? "text-[#F4F0E8]/[0.05]" : "text-[#111014]/[0.05]"
        )}
      >
        {num(index)}
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <SceneHead project={project} index={index} dark={dark} />

        {/* ——— 01 FILE DRIVE · ivory · hero + offset second screen ——— */}
        {project.slug === "file-drive" && (
          <div className="mt-10 grid grid-cols-12 gap-5 md:mt-14">
            <Reveal className="col-span-12 lg:col-span-8">
              <motion.div style={reduce ? undefined : { y: shotY }}>
                <Frame src={project.images[0].src} alt={project.images[0].alt} caption={`Fig. ${num(index)} — Dashboard`} dark={dark} sizes="(max-width: 1024px) 100vw, 62vw" />
              </motion.div>
            </Reveal>
            <Reveal delay={0.1} className="col-span-10 col-start-3 md:col-span-4 md:col-start-9 md:mt-24 lg:col-span-3 lg:col-start-10">
              {project.images[1] && (
                <Frame src={project.images[1].src} alt={project.images[1].alt} caption="Landing — entry point" dark={dark} sizes="(max-width: 768px) 80vw, 24vw" />
              )}
            </Reveal>
            <div className="col-span-12 mt-6 lg:col-span-3 lg:col-start-10 lg:mt-0">
              <Reveal delay={0.15} className="lg:sticky lg:top-28">
                <Manifest project={project} dark={dark} />
              </Reveal>
            </div>
          </div>
        )}

        {/* ——— 02 LEARNING EXCHANGE · plum · sticky text + stacked screens ——— */}
        {project.slug === "learning-exchange" && (
          <div className="mt-10 flex flex-col gap-5 md:mt-14 lg:grid lg:grid-cols-12">
            <div className="order-2 col-span-12 lg:order-none lg:col-span-3">
              <Reveal delay={0.1} className="lg:sticky lg:top-28">
                <Manifest project={project} dark={dark} />
              </Reveal>
            </div>
            <div className="contents lg:col-span-8 lg:col-start-5 lg:block lg:space-y-5">
              {project.images.map((img, i) => (
                <Reveal key={img.src} delay={i * 0.05} className={cn(i === 0 && "order-1", i > 0 && "order-3", "lg:order-none", i % 2 === 1 ? "md:ml-16" : "md:mr-16")}>
                  <Frame src={img.src} alt={img.alt} caption={`Fig. ${num(index)}.${i + 1} — ${["Library", "Hero", "Register"][i] ?? "Screen"}`} dark={dark} sizes="(max-width: 1024px) 100vw, 58vw" />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ——— 03 MARGAUX · ivory · scan-frame hero + side-by-side ——— */}
        {project.slug === "margaux-pets" && (
          <div className="mt-10 md:mt-14">
            <Reveal>
              {/* ponytail: hairline scan corners only — real screenshot carries the scene */}
              <div className="relative border border-[#111014]/20 p-2 md:p-3">
                <span aria-hidden className="absolute -left-px -top-px h-6 w-6 border-l-2 border-t-2 border-[#FF5C5C]" />
                <span aria-hidden className="absolute -right-px -top-px h-6 w-6 border-r-2 border-t-2 border-[#FF5C5C]" />
                <span aria-hidden className="absolute -bottom-px -left-px h-6 w-6 border-b-2 border-l-2 border-[#FF5C5C]" />
                <span aria-hidden className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-[#FF5C5C]" />
                <Image src={project.images[0].src} alt={project.images[0].alt} width={1600} height={900} sizes="100vw" className="h-auto w-full" loading="lazy" />
              </div>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#57515B]">
                Fig. {num(index)} — One scan from reunion
              </p>
            </Reveal>
            <div className="mt-5 grid grid-cols-12 gap-5">
              <Reveal delay={0.1} className="col-span-12 md:col-span-7">
                {project.images[1] && (
                  <Frame src={project.images[1].src} alt={project.images[1].alt} caption="Auth — community entry" dark={dark} sizes="(max-width: 768px) 100vw, 50vw" />
                )}
              </Reveal>
              <div className="col-span-12 md:col-span-4 md:col-start-9">
                <Reveal delay={0.15}>
                  <Manifest project={project} dark={dark} />
                </Reveal>
              </div>
            </div>
          </div>
        )}

        {/* ——— 04 YOKCASH · plum · horizontal storefront sequence ——— */}
        {project.slug === "yokcash" && (
          <div className="mt-10 md:mt-14">
            <Reveal>
              <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:gap-6" role="list" aria-label={`${project.title} screens`}>
                {project.images.map((img, i) => (
                  <div key={img.src} role="listitem" className="w-[85vw] shrink-0 snap-start sm:w-[60vw] lg:w-[38vw]">
                    <Frame src={img.src} alt={img.alt} caption={[`Carousel — featured`, `Hero — storefront`, `Stores — browse`][i] ?? `Screen ${i + 1}`} dark={dark} sizes="(max-width: 1024px) 85vw, 38vw" />
                  </div>
                ))}
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F4F0E8]/50">
                Scroll → featured · hero · stores
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-12 gap-5">
              <div className="col-span-12 lg:col-span-3">
                <Reveal delay={0.1}>
                  <Manifest project={project} dark={dark} />
                </Reveal>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
