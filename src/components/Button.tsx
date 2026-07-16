import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "dark";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-ink hover:bg-primary-hover shadow-sm",
  secondary:
    "bg-transparent text-primary border border-primary/40 hover:bg-primary/10",
  dark: "bg-navy text-primary hover:bg-ink",
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
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-xl px-8 py-4 font-display text-sm uppercase tracking-wide transition-colors duration-200 sm:px-10 sm:py-5 sm:text-base ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
