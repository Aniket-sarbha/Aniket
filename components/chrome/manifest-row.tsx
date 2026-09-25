import { cn } from "@/lib/utils";

// ponytail: single mono metadata line used as the recurring rhythm device.
export function ManifestRow({
  items,
  dark = false,
  className,
}: {
  items: string[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.18em]",
        dark ? "text-[#F4F0E8]/60" : "text-[#8E8790]",
        className
      )}
    >
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 && <span aria-hidden className="mx-2 text-[#FF5C5C]">/</span>}
          {item}
        </span>
      ))}
    </p>
  );
}
