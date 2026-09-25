"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      onMouseMove={(e) => {
        if (window.innerWidth < 768) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setOffset({
          x: (e.clientX - rect.left - rect.width / 2) * 0.15,
          y: (e.clientY - rect.top - rect.height / 2) * 0.15,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
