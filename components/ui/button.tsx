import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300",
  {
    variants: {
      variant: {
        primary: "bg-[#FF5C5C] text-[#F4F0E8] hover:bg-[#111014]",
        dark: "bg-[#F4F0E8] text-[#21152E] hover:bg-[#B9A7FF] hover:text-[#21152E]",
        ghost: "border border-[#111014]/20 text-[#111014] hover:border-[#111014] hover:bg-[#111014]/5",
        ghostDark: "border border-white/20 text-[#F4F0E8] hover:border-[#F4F0E8] hover:bg-white/5",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, ...props }: Props) {
  return <a className={cn(buttonVariants({ variant }), className)} {...props} />;
}
