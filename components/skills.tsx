import { skills } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/chrome/reveal";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 bg-[#F4F0E8] py-24 text-[#111014] md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading index="03" kicker="Capabilities" title="Stack I" accent="reach for" />
        <div className="border-t rule-ink">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={(i % 5) * 0.05}>
              <div className="grid grid-cols-12 gap-x-5 gap-y-2 border-b rule-ink py-6 md:py-7">
                <p className="col-span-12 font-mono text-xs uppercase tracking-[0.18em] text-[#FF5C5C] md:col-span-3">
                  {String(i + 1).padStart(2, "0")} — {g.group}
                </p>
                <p className="col-span-12 text-lg leading-relaxed md:col-span-9 md:text-xl">
                  {g.items.join(" · ")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
