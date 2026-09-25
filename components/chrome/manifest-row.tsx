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
        // ponytail: functional text uses bark on ivory (AA); coral stays for
        // the decorative aria-hidden separators below.
        dark ? "text-[#F4F0E8]/60" : "text-[#57515B]",
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
