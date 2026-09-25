"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Artifact, Project } from "@/lib/data";
import { ArtifactBackdrop } from "@/components/scenes/artifact";
import { ManifestRow } from "@/components/chrome/manifest-row";
import { Reveal } from "@/components/chrome/reveal";
import { cn } from "@/lib/utils";

const num = (i: number) => String(i + 1).padStart(2, "0");

// Authentic close-up crop per shipment — same file, art-directed focus.
const detailFocus: Record<Artifact, { position: string; caption: string }> = {
  "file-stack": { position: "32% 42%", caption: "AI actions, inline" },
  "approval-queue": { position: "22% 30%", caption: "Filter by region" },
  "tag-grid": { position: "72% 38%", caption: "One scan from reunion" },
  "storefront-shelf": { position: "80% 58%", caption: "Live player stats" },
};

function SceneWipe({ dark }: { dark: boolean }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: [0, 1, 1, 0] }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1, times: [0, 0.4, 0.6, 1], ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "left" }}
      className={cn(
        "pointer-events-none absolute inset-y-0 left-0 z-10 w-full",
        dark ? "bg-[#B9A7FF]" : "bg-[#B9A7FF]/70"
      )}
    />
  );
}

export function ProjectScene({ project, index }: { project: Project; index: number }) {
  const dark = project.colorway === "plum";
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numeralY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const shotY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const detailY = useTransform(scrollYProgress, [0, 1], [48, -48]);
  const flip = index % 2 === 1;
  const detail = detailFocus[project.artifact];

  return (
    <section
      ref={ref}
      aria-labelledby={`project-${project.slug}`}
      className={cn(
        "relative overflow-hidden py-24 md:py-36",
        dark ? "bg-[#21152E] text-[#F4F0E8]" : "bg-[#F4F0E8] text-[#111014]"
      )}
    >
      <SceneWipe dark={dark} />

      <motion.span
        aria-hidden
        style={reduce ? undefined : { y: numeralY }}
        className={cn(
          "font-display pointer-events-none absolute -top-6 select-none text-[34vw] leading-none md:text-[26vw]",
          flip ? "-right-4 md:-right-10" : "-left-4 md:-left-10",
          dark ? "text-[#F4F0E8]/[0.05]" : "text-[#111014]/[0.05]"
        )}
      >
        {num(index)}
      </motion.span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-12 gap-x-5 px-5 md:px-10">
        <div className={cn("col-span-12 lg:col-span-8", flip && "lg:order-2")}>
          <Reveal>
            <ManifestRow
              dark={dark}
              items={[`Shipment ${num(index)}`, project.year, project.colorway === "plum" ? "Dark" : "Light"]}
            />
            <h3
              id={`project-${project.slug}`}
              className="font-display mt-4 text-[15vw] sm:text-6xl md:text-7xl xl:text-8xl"
            >
              {project.title.split(" ")[0]}{" "}
              <span className="font-editorial normal-case">
                {project.accent ?? project.title.split(" ").slice(1).join(" ") ?? project.tagline.split(" ")[0]}
              </span>
            </h3>
            <p className={cn("mt-4 max-w-xl text-lg leading-relaxed", dark ? "text-[#F4F0E8]/75" : "text-[#111014]/70")}>
              {project.tagline}. {project.overview}
            </p>
          </Reveal>

          {/* Layered archive composition */}
          <Reveal delay={0.1} className="mt-8">
            <div className="relative pb-10 pr-4 md:pb-14 md:pr-10">
              <div
                aria-hidden
                className={cn(
                  "absolute -inset-6 md:-bottom-16 md:-top-16",
                  flip ? "md:-left-24 md:-right-6 -scale-x-100" : "md:-left-6 md:-right-24"
                )}
              >
                <ArtifactBackdrop kind={project.artifact} dark={dark} />
              </div>
              {/* Back sheets */}
              <div
                aria-hidden
                className={cn(
                  "absolute inset-x-8 top-6 bottom-0 rounded-xl border md:inset-x-12",
                  flip ? "-rotate-3" : "rotate-3",
                  dark ? "border-white/10 bg-white/[0.04]" : "border-[#111014]/10 bg-white/60"
                )}
              />
              <div
                aria-hidden
                className={cn(
                  "absolute inset-x-4 top-3 bottom-4 rounded-xl border md:inset-x-6",
                  flip ? "rotate-2" : "-rotate-2",
                  dark ? "border-white/10 bg-white/[0.06]" : "border-[#111014]/10 bg-white/80"
                )}
              />
              <motion.figure
                style={reduce ? undefined : { y: shotY }}
                className={cn(
                  "relative overflow-hidden rounded-xl border shadow-2xl",
                  dark ? "border-white/15" : "border-[#111014]/15",
                  flip ? "rotate-2" : "-rotate-2"
                )}
              >
                <Image
                  src={project.images[0].src}
                  alt={project.images[0].alt}
                  width={1600}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="h-auto w-full"
                  loading="lazy"
                />
                <figcaption
                  className={cn(
                    "border-t px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em]",
                    dark
                      ? "border-white/10 bg-[#21152E] text-[#F4F0E8]/60"
                      : "border-[#111014]/10 bg-[#F4F0E8] text-[#8E8790]"
                  )}
                >
                  Fig. {num(index)} — {project.title}
                </figcaption>
              </motion.figure>

              {/* Detail callout */}
              <motion.figure
                style={reduce ? undefined : { y: detailY }}
                className={cn(
                  "absolute -bottom-2 right-0 w-40 overflow-hidden rounded-lg border shadow-xl md:w-56",
                  dark ? "border-[#B9A7FF]/50" : "border-[#111014]/20",
                  flip ? "-rotate-3" : "rotate-3"
                )}
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.images[0].src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 10rem, 14rem"
                    className="scale-[1.9] object-cover"
                    style={{ objectPosition: detail.position }}
                    loading="lazy"
                  />
                </span>
                <figcaption
                  className={cn(
                    "px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]",
                    dark ? "bg-[#B9A7FF] text-[#21152E]" : "bg-[#111014] text-[#F4F0E8]"
                  )}
                >
                  Detail — {detail.caption}
                </figcaption>
              </motion.figure>
            </div>
          </Reveal>
        </div>

        <div className={cn("col-span-12 mt-10 lg:col-span-3 lg:col-start-10 lg:mt-0", flip && "lg:order-1 lg:col-start-1")}>
          <Reveal delay={0.15} className="lg:sticky lg:top-28">
            <div className={cn("border-t pt-5", dark ? "rule-ivory" : "rule-ink")}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF5C5C]">
                Manifest
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className={cn("font-mono text-[11px] uppercase tracking-[0.18em]", dark ? "text-[#F4F0E8]/50" : "text-[#8E8790]")}>Stack</dt>
                  <dd className="mt-1">{project.stack.join(" · ")}</dd>
                </div>
                <div>
                  <dt className={cn("font-mono text-[11px] uppercase tracking-[0.18em]", dark ? "text-[#F4F0E8]/50" : "text-[#8E8790]")}>Year</dt>
                  <dd className="mt-1">{project.year}</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={`/projects/${project.slug}`}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                    dark
                      ? "bg-[#F4F0E8] text-[#21152E] hover:bg-[#B9A7FF]"
                      : "bg-[#111014] text-[#F4F0E8] hover:bg-[#FF5C5C]"
                  )}
                >
                  Open case <ArrowRight size={15} />
                </Link>
                <div className="flex gap-4 font-mono text-[11px] uppercase tracking-[0.18em]">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                    >
                      Live <ArrowUpRight size={12} />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                    >
                      Repo <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
