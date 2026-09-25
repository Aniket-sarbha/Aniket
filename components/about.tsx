import { education, volunteering } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/chrome/reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t rule-ink bg-[#F4F0E8] py-24 text-[#111014] md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading index="04" kicker="Marginalia" title="Human behind" accent="the log" />
        <div className="grid grid-cols-12 gap-x-5 gap-y-10">
          <Reveal className="col-span-12 md:col-span-5">
            <div
              aria-hidden
              className="font-display flex aspect-square items-center justify-center rounded-xl bg-[#21152E] text-[26vw] leading-none text-[#F4F0E8] md:text-[10rem]"
            >
              A<span className="text-[#FF5C5C]">.</span>S
            </div>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#111014]/70">
              I turn complex backends into storefronts people enjoy using —
              full stack across e-commerce, SaaS, and QR platforms, with fast
              loads, clean RBAC, and admin flows non-technical teams can
              actually use.
            </p>
          </Reveal>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF5C5C]">
                Education
              </p>
              <p className="font-display mt-2 text-2xl leading-tight md:text-3xl">
                {education.school}
              </p>
              <p className="mt-2 text-sm text-[#8E8790]">
                {education.location} · {education.period}
              </p>
              <p className="mt-1 text-[15px]">{education.degree}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF5C5C]">
                Beyond work
              </p>
              {volunteering.map((v) => (
                <div key={v.org} className="mt-4 border-l-2 border-[#B9A7FF] pl-4">
                  <p>{v.org}</p>
                  <p className="text-sm text-[#8E8790]">{v.detail}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
