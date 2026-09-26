"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// ponytail: editorial cover reveal. Instant-skip on reduced-motion.
// Pure exit choreography, no assets.
export function Preloader() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  // Server and client must match on first render; start the reveal in the effect.
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (reduce) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing initial client-only animation state
    setLeaving(false);
    setShow(true);
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setLeaving(true), 1400);
    const t2 = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, [pathname, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label="Loading portfolio"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          animate={leaving ? { clipPath: "inset(0 0 100% 0)" } : {}}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-[#21152E] px-5 py-8 text-[#F4F0E8] md:px-10"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F4F0E8]/60"
          >
            LOG—26 / Delhi, IN / Opening
          </motion.p>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: leaving ? "-110%" : "0%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[18vw] leading-[0.9] md:text-[10rem]"
            >
              Ship <span className="font-editorial normal-case">log</span>
              <span aria-hidden className="text-[#FF5C5C]">*</span>
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-[#F4F0E8]/60"
          >
            <span>Aniket Sarbha</span>
            <span aria-hidden className="h-px flex-1 mx-6 bg-white/15" />
            <span>04 shipments</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
