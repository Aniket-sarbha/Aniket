import { toolsOfTrade } from "@/lib/data";
import { Reveal } from "@/components/chrome/reveal";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 bg-[#F4F0E8] py-24 text-[#111014] md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#B3272D]">
            03. Tools of the trade
          </p>
          <h2 className="font-display mt-4 text-[13vw] leading-[0.9] sm:text-6xl md:text-8xl">
            {toolsOfTrade.slice(0, 5).join(" ")}
            <br />
            <span className="text-[#111014]/20">{toolsOfTrade.slice(5).join(" ")}</span>
          </h2>
          <p className="font-editorial mt-6 max-w-xl text-xl leading-relaxed text-[#111014]/70 md:text-2xl">
            I care less about the tool than what the tool lets me ship.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
