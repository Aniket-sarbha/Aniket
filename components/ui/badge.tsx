import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "border-[#111014]/15 bg-[#111014]/5 text-[#111014]",
        dark: "border-white/15 bg-white/5 text-[#F4F0E8]",
        live: "border-[#FF5C5C] bg-[#FF5C5C] font-medium text-[#F4F0E8]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
