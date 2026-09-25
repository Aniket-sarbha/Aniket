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

// ponytail: captions describe only what each screenshot verifiably shows.
const captions: Record<string, string[]> = {
  "file-drive": [
    "Dashboard with file cards and inline AI actions",
    "Landing page with the Get started entry point",
  ],
  "learning-exchange": [
    "Resource library with region filters",
    "Homepage hero introducing the knowledge hub",
    "Registration form for new accounts",
  ],
  "margaux-pets": [
    "Landing page with the Smart QR Tags hero",
    "Sign-in page with the community message",
  ],
  yokcash: [
    "Featured-game carousel with ratings and player stats",
    "Homepage hero for discounted game currency",
    "Store browser with search and sort controls",
  ],
};
const architecture: Record<string, string[]> = {
  "file-drive": ["User", "Next.js", "Clerk (auth) + Convex (data)", "Gemini / DOCX pipeline"],
  "learning-exchange": ["User", "Next.js", "Supabase (auth + realtime DB + storage)", "Admin approval queue"],
  "margaux-pets": ["Scan (QR)", "React + Vite", "Supabase (auth + storage + RBAC)", "GPS + recovery workflow"],
  yokcash: ["User", "Next.js SSR", "Prisma + PostgreSQL + NextAuth", "REST fulfillment API"],
};

function ArchDiagram({ nodes, dark }: { nodes: string[]; dark: boolean }) {
  return (
    <ol aria-label="System architecture" className="max-w-xl">
      {nodes.map((n, i) => (
        <li key={n} className="flex gap-4">
          <span aria-hidden className="flex flex-col items-center">
            <span
              className={cn(
                "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                i === 0 ? "bg-[#FF5C5C]" : dark ? "bg-[#B9A7FF]" : "bg-[#111014]"
              )}
            />
            {i < nodes.length - 1 && (
              <span aria-hidden className={cn("w-px flex-1", dark ? "bg-white/20" : "bg-[#111014]/20")} />
            )}
          </span>
          <span className={cn("pb-5 font-mono text-sm uppercase tracking-[0.12em]", dark ? "text-[#F4F0E8]/80" : "text-[#111014]/80")}>
            {n}
          </span>
        </li>
      ))}
    </ol>
  );
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
    <section className={cn("mt-12 border-t pt-6", dark ? "rule-ivory" : "rule-ink")}>
      <h2 className={cn("font-mono text-xs uppercase tracking-[0.18em]", dark ? "text-[#FF5C5C]" : "text-[#B3272D]")}>{title}</h2>
      <div className="mt-5">{children}</div>
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
  const nodes = architecture[slug];

  return (
    <div className={cn("flex min-h-screen flex-col", dark ? "bg-[#21152E] text-[#F4F0E8]" : "bg-[#F4F0E8] text-[#111014]")}>
      <Navbar />
      <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-5 pt-28 pb-20 md:px-10 md:pt-36">
        <Link
          href="/#projects"
          className={cn(
            "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]",
            dark ? "text-[#F4F0E8]/60 hover:text-[#FF5C5C]" : "text-[#57515B] hover:text-[#B3272D]"
          )}
        >
          <ArrowLeft size={14} /> All shipments
        </Link>

        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.liveUrl ? <Badge variant="live">● Live</Badge> : <Badge variant={dark ? "dark" : "default"}>Case study</Badge>}
            <ManifestRow dark={dark} items={[`Shipment ${String(idx + 1).padStart(2, "0")}`, project.year, project.role]} />
          </div>
          <h1 className="font-display mt-4 max-w-5xl text-[13vw] leading-[0.9] sm:text-6xl md:text-8xl">
            {project.title.split(" ")[0]}{" "}
            <span className="font-editorial normal-case">
              {project.accent ?? project.title.split(" ").slice(1).join(" ")}
            </span>
            <span aria-hidden className="text-[#FF5C5C]">*</span>
          </h1>
          <p className={cn("mt-4 max-w-2xl text-lg md:text-xl", dark ? "text-[#F4F0E8]/70" : "text-[#111014]/70")}>
            {project.tagline}
          </p>
          {/* Manifest strip */}
          <dl className={cn("mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y py-5 font-mono text-[11px] uppercase tracking-[0.18em] md:grid-cols-5", dark ? "border-white/10" : "border-[#111014]/10")}>
            {[
              ["Type", project.type],
              ["Role", project.role],
              ["Stack", project.stack.join(" · ")],
              ["Year", project.year],
              ["Status", project.status],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className={dark ? "text-[#F4F0E8]/50" : "text-[#57515B]"}>{k}</dt>
                <dd className="mt-1 normal-case tracking-normal">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex gap-5 font-mono text-[11px] uppercase tracking-[0.18em]">
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
          </div>
        </Reveal>

        {/* Hero screenshot */}
        <Reveal className="mt-10">
          <figure className={cn("overflow-hidden border", dark ? "border-white/15" : "border-[#111014]/15")}>
            <Image
              src={project.images[0].src}
              alt={project.images[0].alt}
              width={1600}
              height={900}
              sizes="100vw"
              className="h-auto w-full"
              priority
            />
            <figcaption className={cn("border-t px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em]", dark ? "border-white/10 text-[#F4F0E8]/60" : "border-[#111014]/10 text-[#57515B]")}>
              Fig. 01 — {captions[slug]?.[0] ?? project.title}
            </figcaption>
          </figure>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Block title="Overview" dark={dark}>
                <p className={cn("max-w-2xl text-lg leading-relaxed", dark ? "text-[#F4F0E8]/80" : "text-[#111014]/80")}>
                  {project.overview}
                </p>
              </Block>
            </Reveal>

            {nodes && (
              <Reveal>
                <Block title="Selected system" dark={dark}>
                  <ArchDiagram nodes={nodes} dark={dark} />
                </Block>
              </Reveal>
            )}

            {project.built.length > 0 && (
              <Reveal>
                <Block title="Build" dark={dark}>
                  <ul className={cn("max-w-2xl space-y-3 leading-relaxed", dark ? "text-[#F4F0E8]/75" : "text-[#111014]/75")}>
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
          </div>

          <div className="lg:col-span-5">
            {project.images.length > 1 && (
              <Reveal>
                <Block title="Build — screens" dark={dark}>
                  <div className="space-y-5">
                    {project.images.slice(1).map((img, i) => (
                      <figure key={img.src} className={cn("overflow-hidden border", dark ? "border-white/15" : "border-[#111014]/15", i % 2 === 1 && "md:ml-10")}>
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={1200}
                          height={675}
                          sizes="(max-width: 1024px) 100vw, 36rem"
                          className="h-auto w-full"
                          loading="lazy"
                        />
                        <figcaption className={cn("border-t px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em]", dark ? "border-white/10 text-[#F4F0E8]/60" : "border-[#111014]/10 text-[#57515B]")}>
                          Fig. {String(i + 2).padStart(2, "0")} — {captions[slug]?.[i + 1] ?? project.title}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </Block>
              </Reveal>
            )}
          </div>
        </div>

        <Reveal>
          <p className={cn("mt-16 border-t pt-6 text-center font-mono text-[11px] uppercase tracking-[0.18em]", dark ? "border-white/10 text-[#F4F0E8]/50" : "border-[#111014]/10 text-[#57515B]")}>
            Shipment complete — {project.year}
          </p>
        </Reveal>

        <Link
          href={`/projects/${next.slug}`}
          className={cn(
            "group mt-8 flex items-center justify-between border p-6 transition-colors",
            dark ? "border-white/15 hover:border-[#B9A7FF]" : "border-[#111014]/15 hover:border-[#FF5C5C]"
          )}
        >
          <div>
            <p className={cn("font-mono text-xs uppercase tracking-[0.18em]", dark ? "text-[#F4F0E8]/50" : "text-[#57515B]")}>
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
