import { Reveal } from "@/components/chrome/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  kicker,
  title,
  accent,
  dark = false,
  className,
}: {
  index: string;
  kicker: string;
  title: string;
  accent?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF5C5C]">
        {index}. {kicker}
      </p>
      <h2
        className={cn(
          "font-display mt-3 text-4xl md:text-6xl",
          dark ? "text-[#F4F0E8]" : "text-[#111014]"
        )}
      >
        {title}{" "}
        {accent && <span className="font-editorial normal-case">{accent}</span>}
      </h2>
    </Reveal>
  );
}
