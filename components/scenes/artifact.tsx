import type { Artifact } from "@/lib/data";
import { cn } from "@/lib/utils";

// ponytail: abstract geometric backdrops. Identity only — real screenshots
// carry the visual weight and slot into the frame beside these.
export function ArtifactBackdrop({
  kind,
  dark,
  className,
}: {
  kind: Artifact;
  dark: boolean;
  className?: string;
}) {
  const stroke = dark ? "#F4F0E8" : "#111014";
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 300"
      className={cn("h-full w-full", className)}
      fill="none"
      stroke={stroke}
      strokeOpacity="0.24"
      strokeWidth="1.5"
    >
      {kind === "file-stack" && (
        <g>
          <rect x="60" y="70" width="280" height="180" rx="10" />
          <rect x="80" y="50" width="280" height="180" rx="10" />
          <rect x="100" y="30" width="280" height="180" rx="10" strokeOpacity="0.32" />
          <line x1="130" y1="80" x2="330" y2="80" strokeOpacity="0.32" />
          <line x1="130" y1="110" x2="280" y2="110" strokeOpacity="0.32" />
          <circle cx="330" cy="170" r="22" stroke="#FF5C5C" strokeOpacity="0.8" />
          <path d="M322 170l6 6 11-12" stroke="#FF5C5C" strokeOpacity="0.8" />
        </g>
      )}
      {kind === "approval-queue" && (
        <g>
          {[40, 100, 160, 220].map((y, i) => (
            <g key={y}>
              <rect x="40" y={y} width="320" height="44" rx="22" />
              <circle
                cx="72"
                cy={y + 22}
                r="10"
                stroke={i === 1 ? "#B9A7FF" : stroke}
                strokeOpacity={i === 1 ? 0.9 : 0.32}
              />
              {i === 1 && (
                <path d="M68 62l3 3 5-6" stroke="#B9A7FF" strokeOpacity="0.9" transform={`translate(0 ${y - 40})`} />
              )}
              <line x1="96" y1={y + 22} x2={230 + (i % 2) * 60} y2={y + 22} strokeOpacity="0.32" />
            </g>
          ))}
        </g>
      )}
      {kind === "tag-grid" && (
        <g>
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={52 + c * 52} y={30 + r * 52} width="36" height="36" rx="8" strokeOpacity={(r + c) % 3 === 0 ? 0.4 : 0.14} />
            ))
          )}
          <circle cx="104" cy="82" r="14" stroke="#FF5C5C" strokeOpacity="0.85" />
          <circle cx="104" cy="82" r="4" fill="#FF5C5C" fillOpacity="0.85" stroke="none" />
          <circle cx="312" cy="238" r="14" stroke="#FF5C5C" strokeOpacity="0.5" />
          <path d="M104 82L312 238" strokeDasharray="4 6" strokeOpacity="0.3" />
        </g>
      )}
      {kind === "storefront-shelf" && (
        <g>
          {[60, 150, 240].map((y) => (
            <g key={y}>
              <line x1="30" y1={y + 44} x2="370" y2={y + 44} strokeOpacity="0.4" />
              {[70, 150, 230, 310].map((x, i) => (
                <rect key={x} x={x - 26} y={y - 6} width="52" height={50 - i * 6} rx="6" />
              ))}
            </g>
          ))}
          <rect x="288" y="18" width="82" height="30" rx="15" stroke="#FF5C5C" strokeOpacity="0.8" />
        </g>
      )}
    </svg>
  );
}
