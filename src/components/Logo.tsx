import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "light" | "dark" | "accent";
  className?: string;
  showWordmark?: boolean;
};

const srcMap = {
  light: "/logos/scepter-mark-cream.png",
  dark: "/logos/scepter-mark-navy.png",
  accent: "/logos/scepter-mark-cream.png",
} as const;

const wordmarkMap = {
  light: "text-[#f9f1d6]",
  dark: "text-[#333e50]",
  accent: "text-primary",
} as const;

export function Logo({
  variant = "light",
  className = "",
  showWordmark = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex min-w-0 items-center gap-2 sm:gap-3 ${wordmarkMap[variant]} ${className}`}
      aria-label="The Scepter home"
    >
      <Image
        src={srcMap[variant]}
        alt=""
        width={60}
        height={33}
        className="h-7 w-auto shrink-0 object-contain sm:h-8"
      />
      {showWordmark ? (
        <span className="truncate font-display text-base font-bold uppercase tracking-wide leading-none sm:text-lg">
          The Scepter
        </span>
      ) : null}
    </Link>
  );
}
