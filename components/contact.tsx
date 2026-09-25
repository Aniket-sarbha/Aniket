"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { CopyEmail } from "@/components/ui/copy-email";
import { Magnetic } from "@/components/ui/magnetic";
import { HomeLink } from "@/components/chrome/home-link";
import { ManifestRow } from "@/components/chrome/manifest-row";

export function Contact() {
  const reduce = useReducedMotion();
  return (
    <section id="contact" className="scroll-mt-20 overflow-hidden bg-[#21152E] py-28 text-center text-[#F4F0E8]">
      <div className="mx-auto max-w-5xl px-5">
        <motion.div
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <ManifestRow dark items={["05", "Contact", "Reply over email"]} className="justify-center" />
        </motion.div>
        <motion.h2
          initial={reduce ? {} : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-4 text-[16vw] leading-[0.9] sm:text-7xl md:text-8xl"
        >
          Start a <span className="font-editorial normal-case">shipment</span>
          <span aria-hidden className="text-[#FF5C5C]">*</span>
        </motion.h2>
        <p className="mx-auto mt-5 max-w-md text-[#F4F0E8]/60">
          Open to full-time roles and freelance builds. Fastest reply over email.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic>
            <Button variant="dark" href={`mailto:${profile.email}`}>
              <Mail size={15} /> {profile.email}
            </Button>
          </Magnetic>
          <Magnetic>
            <Button variant="ghostDark" href={profile.resume} download>
              Download Resume
            </Button>
          </Magnetic>
          <Magnetic>
            <CopyEmail />
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden bg-[#21152E] pb-10 pt-20 text-[#F4F0E8]">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <ManifestRow dark items={["End of log", "LOG—26", "04 shipments"]} />
        <div className="mt-6 grid grid-cols-12 items-end gap-x-5 gap-y-8">
          <p className="font-display col-span-12 text-[13vw] leading-[0.9] md:col-span-9 md:text-8xl">
            End of <span className="font-editorial normal-case">log</span>
            <span aria-hidden className="text-[#FF5C5C]">.</span>
          </p>
          <div className="col-span-12 md:col-span-3">
            <div
              aria-hidden
              className="font-display flex aspect-square w-28 items-center justify-center rounded-xl bg-[#F4F0E8] text-4xl leading-none text-[#21152E]"
            >
              A<span className="text-[#FF5C5C]">.</span>S
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-[#F4F0E8]/50">© 2026 Aniket Sarbha · Delhi, India</p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F4F0E8]/60">
            {[
              { label: "Work", hash: "#projects" },
              { label: "Stack", hash: "#skills" },
              { label: "About", hash: "#about" },
              { label: "Contact", hash: "#contact" },
            ].map((l) => (
              <HomeLink key={l.hash} hash={l.hash} className="hover:text-[#FF5C5C]">
                {l.label}
              </HomeLink>
            ))}
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[#FF5C5C]" aria-label="GitHub profile">GH</a>
            <a href={`mailto:${profile.email}`} className="hover:text-[#FF5C5C]" aria-label="Email me">EM</a>
          </nav>
          <HomeLink
            hash="#top"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#FF5C5C] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF5C5C] transition-colors hover:bg-[#FF5C5C] hover:text-[#F4F0E8]"
          >
            Back to top <ArrowUp size={13} />
          </HomeLink>
        </div>
      </div>
    </footer>
  );
}
