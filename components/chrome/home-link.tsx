"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// ponytail: bare "#section" links break off-home (they resolve against the
// current route). This prefixes "/" everywhere except the homepage.
export function HomeLink({
  hash,
  children,
  onClick,
  className,
  ariaLabel,
}: {
  hash: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}) {
  const pathname = usePathname();
  const href = pathname === "/" ? hash : `/${hash}`;
  return (
    <a href={href} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
