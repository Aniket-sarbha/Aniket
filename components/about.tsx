import { education, profile, volunteering } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/chrome/reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t rule-ink bg-[#F4F0E8] py-24 text-[#111014] md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading index="04" kicker="Marginalia" title="Human behind" accent="the log" />
        <div className="grid grid-cols-12 gap-x-5 gap-y-10">
          <Reveal className="col-span-12 md:col-span-5">
            <p className="font-display max-w-md text-3xl leading-[1.02] md:text-4xl">
              I&apos;m Aniket<span aria-hidden className="text-[#FF5C5C]">*</span>
            </p>
            <p className="font-editorial mt-4 max-w-md text-xl leading-relaxed text-[#111014]/75">
              Full-stack developer from Delhi. I like complicated systems, clean
              interfaces and products that actually ship.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t rule-ink pt-5 font-mono text-[11px] uppercase tracking-[0.14em]">
              {[
                ["Building", "Products"],
                ["Learning", "Systems"],
                ["Looking for", profile.available ? "Full-time work" : "—"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[#57515B]">{k}</dt>
                  <dd className="mt-1 text-[#111014]">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#57515B]">
              Del / India
            </p>
          </Reveal>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#B3272D]">
                Education
              </p>
              <p className="font-display mt-2 text-2xl leading-tight md:text-3xl">
                BPIT · ECE · 2021—2025
              </p>
              <p className="mt-2 text-sm text-[#57515B]">
                {education.school} · {education.location}
              </p>
              <p className="mt-1 text-[15px]">{education.degree}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#B3272D]">
                Outside the build
              </p>
              {volunteering.map((v) => (
                <div key={v.org} className="mt-4 border-l-2 border-[#B9A7FF] pl-4">
                  <p>{v.org}</p>
                  <p className="text-sm text-[#57515B]">{v.detail}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
