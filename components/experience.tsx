import { experience } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/chrome/reveal";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 bg-[#21152E] py-24 text-[#F4F0E8] md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading dark index="02" kicker="Ledger" title="Where I've" accent="shipped" />
        <div>
          {experience.map((e) => (
            <Reveal key={e.company}>
              <article className="grid grid-cols-12 gap-x-5 gap-y-4 border-t border-white/10 py-8 md:py-10">
                <div className="col-span-12 md:col-span-3">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF5C5C]">
                    {e.period}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <h3 className="font-display text-3xl md:text-4xl">{e.role}</h3>
                  <p className="mt-1 text-[#F4F0E8]/60">{e.company}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-[#F4F0E8]/75"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="col-span-12 space-y-3 text-[15px] leading-relaxed text-[#F4F0E8]/70 md:col-span-5">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B9A7FF]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
          <div aria-hidden className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
