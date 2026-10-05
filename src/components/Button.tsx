import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "outline-light" | "light" | "dark";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-burgundy text-cream hover:bg-burgundy-deep shadow-sm",
  outline:
    "border border-burgundy/50 text-burgundy hover:border-burgundy hover:bg-burgundy hover:text-cream",
  "outline-light":
    "border border-cream/50 text-cream hover:border-cream hover:bg-cream hover:text-ink",
  light: "bg-cream text-ink hover:bg-white",
  dark: "bg-ink text-cream hover:bg-navy-deep",
};

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  children,
  variant = "primary",
  href,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 sm:px-9 sm:py-4 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
