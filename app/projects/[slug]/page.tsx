import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { Navbar } from "@/components/chrome/navbar";
import { Footer } from "@/components/contact";
import { Badge } from "@/components/ui/badge";
import { ManifestRow } from "@/components/chrome/manifest-row";
import { Reveal } from "@/components/chrome/reveal";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

function Block({
  title,
  dark,
  children,
}: {
  title: string;
  dark: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "mt-10 border-t pt-6",
        dark ? "rule-ivory" : "rule-ink"
      )}
    >
      <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF5C5C]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const dark = project.colorway === "plum";
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className={cn("flex min-h-screen flex-col", dark ? "bg-[#21152E] text-[#F4F0E8]" : "bg-[#F4F0E8] text-[#111014]")}>
      <Navbar />
      <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-5 pt-28 pb-20 md:px-10 md:pt-36">
        <Link
          href="/#projects"
          className={cn(
            "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]",
            dark ? "text-[#F4F0E8]/60 hover:text-[#FF5C5C]" : "text-[#8E8790] hover:text-[#FF5C5C]"
          )}
        >
          <ArrowLeft size={14} /> All shipments
        </Link>

        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.liveUrl ? <Badge variant="live">● Live</Badge> : <Badge variant={dark ? "dark" : "default"}>Case study</Badge>}
            <ManifestRow dark={dark} items={[`Shipment ${String(idx + 1).padStart(2, "0")}`, project.year]} />
          </div>
          <h1 className="font-display mt-4 text-5xl leading-[0.95] md:text-7xl">
            {project.title.split(" ")[0]}{" "}
            <span className="font-editorial normal-case">
              {project.accent ?? project.title.split(" ").slice(1).join(" ") ?? project.tagline.split(" ")[0]}
            </span>
          </h1>
          <p className={cn("mt-3 text-lg", dark ? "text-[#F4F0E8]/70" : "text-[#111014]/70")}>
            {project.tagline}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className={cn(
                  "rounded-full border px-3 py-1 font-mono text-xs",
                  dark ? "border-white/15 text-[#F4F0E8]/75" : "border-[#111014]/15 text-[#111014]/75"
                )}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-4 flex gap-5 font-mono text-[11px] uppercase tracking-[0.18em]">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
                Live site <ArrowUpRight size={12} />
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
                Repository <ArrowUpRight size={12} />
              </a>
            )}
          </div>
        </Reveal>

        {/* Sticky visual + scrolling notes (desktop) */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <figure className={cn("overflow-hidden rounded-xl border", dark ? "border-white/15" : "border-[#111014]/15")}>
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    width={1600}
                    height={900}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="h-auto w-full"
                    priority
                  />
                  <figcaption
                    className={cn(
                      "border-t px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em]",
                      dark ? "border-white/10 text-[#F4F0E8]/60" : "border-[#111014]/10 text-[#8E8790]"
                    )}
                  >
                    Fig. 01 — {project.title}
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <Block title="Overview" dark={dark}>
                <p className={cn("text-lg leading-relaxed", dark ? "text-[#F4F0E8]/80" : "text-[#111014]/80")}>
                  {project.overview}
                </p>
              </Block>
            </Reveal>

            {project.built.length > 0 && (
              <Reveal>
                <Block title="Selected implementation details" dark={dark}>
                  <ul className={cn("space-y-3 leading-relaxed", dark ? "text-[#F4F0E8]/75" : "text-[#111014]/75")}>
                    {project.built.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5C5C]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </Block>
              </Reveal>
            )}

            {project.outcomes.length > 0 && (
              <Reveal>
                <Block title="Outcomes" dark={dark}>
                  <ul className={cn("space-y-3 leading-relaxed", dark ? "text-[#F4F0E8]/75" : "text-[#111014]/75")}>
                    {project.outcomes.map((o) => (
                      <li key={o} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B9A7FF]" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </Block>
              </Reveal>
            )}
          </div>
        </div>

        {project.images.length > 1 && (
          <Reveal>
            <Block title="Additional screens" dark={dark}>
              <div className="grid gap-5 md:grid-cols-2">
                {project.images.slice(1).map((img, i) => (
                  <figure
                    key={img.src}
                    className={cn(
                      "overflow-hidden rounded-xl border",
                      dark ? "border-white/15" : "border-[#111014]/15",
                      i % 2 === 1 && "md:translate-y-8"
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={1200}
                      height={675}
                      sizes="(max-width: 768px) 100vw, 36rem"
                      className="h-auto w-full"
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
            </Block>
          </Reveal>
        )}

        <div className="h-4 md:h-8" />

        <Link
          href={`/projects/${next.slug}`}
          className={cn(
            "group mt-12 flex items-center justify-between rounded-xl border p-6 transition-colors",
            dark ? "border-white/15 hover:border-[#B9A7FF]" : "border-[#111014]/15 hover:border-[#FF5C5C]"
          )}
        >
          <div>
            <p className={cn("font-mono text-xs uppercase tracking-[0.18em]", dark ? "text-[#F4F0E8]/50" : "text-[#8E8790]")}>
              Next shipment
            </p>
            <p className="font-display mt-1 text-2xl">{next.title}</p>
          </div>
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </main>
      <Footer />
    </div>
  );
}
