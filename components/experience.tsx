import { experience, profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/chrome/reveal";
import { ArrowUpRight } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 bg-[#21152E] py-24 text-[#F4F0E8] md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading dark index="02" kicker="Ledger" title="Where I've" accent="shipped" />
        <div>
          {experience.map((e) => (
            <Reveal key={e.company}>
              <article className="grid grid-cols-12 gap-x-5 gap-y-3 border-t border-white/10 py-8">
                <p className="col-span-12 font-mono text-xs uppercase tracking-[0.18em] text-[#FF5C5C] md:col-span-2">
                  {e.period}
                </p>
                <h3 className="font-display col-span-12 text-2xl uppercase leading-none md:col-span-4 md:text-3xl">
                  {e.company}
                </h3>
                <p className="col-span-12 text-[15px] text-[#F4F0E8]/70 md:col-span-3">
                  {e.role}
                </p>
                <p className="col-span-12 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-[#F4F0E8]/50 md:col-span-3 md:text-right">
                  {e.stack.join(" · ")}
                </p>
              </article>
            </Reveal>
          ))}
          <div aria-hidden className="border-t border-white/10" />
        </div>
        <Reveal className="mt-8">
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F4F0E8]/70 underline-offset-4 hover:text-[#B9A7FF] hover:underline"
          >
            View resume <ArrowUpRight size={13} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
