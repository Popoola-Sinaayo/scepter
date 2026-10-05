import type { Scripture } from "@/lib/content";

type ScriptureQuoteProps = {
  scripture: Scripture;
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
};

export function ScriptureQuote({
  scripture,
  tone = "light",
  size = "md",
  className = "",
}: ScriptureQuoteProps) {
  const dark = tone === "dark";
  return (
    <figure
      className={`border-l-2 pl-5 sm:pl-7 ${dark ? "border-cream/40" : "border-burgundy"} ${className}`}
    >
      <blockquote
        className={`font-serif italic leading-snug ${
          size === "lg" ? "text-2xl sm:text-3xl md:text-4xl" : "text-xl sm:text-2xl"
        } ${dark ? "text-cream" : "text-ink"}`}
      >
        &ldquo;{scripture.text}&rdquo;
      </blockquote>
      <figcaption
        className={`eyebrow mt-4 ${dark ? "text-cream/60" : "text-burgundy"}`}
      >
        {scripture.reference}
      </figcaption>
    </figure>
  );
}
