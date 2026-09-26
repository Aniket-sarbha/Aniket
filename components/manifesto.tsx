import { Reveal } from "@/components/chrome/reveal";

export function Manifesto() {
  return (
    <section aria-label="Manifesto" className="border-t rule-ink bg-[#F4F0E8] py-20 text-[#111014] md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-x-5 px-5 md:px-10">
        <Reveal className="col-span-12 lg:col-span-9">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#B3272D]">
            The logbook
          </p>
          <p className="font-display mt-4 text-3xl leading-[1.05] md:text-5xl">
            Four systems, shipped end to end —{" "}
            <span className="font-editorial normal-case">storefronts, SaaS, and QR platforms</span>{" "}
            with clean access control and admin flows teams actually use.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
