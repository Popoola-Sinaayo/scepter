type DimensionCardProps = {
  number: string;
  title: string;
  description: string;
  tone?: "light" | "dark";
};

export function DimensionCard({
  number,
  title,
  description,
  tone = "light",
}: DimensionCardProps) {
  const dark = tone === "dark";
  return (
    <article
      className={`flex h-full flex-col border-t-2 pt-6 ${dark ? "border-cream/30" : "border-burgundy"}`}
    >
      <span className={`eyebrow ${dark ? "text-cream/60" : "text-burgundy"}`}>
        {number}
      </span>
      <h3
        className={`mt-3 font-serif text-2xl font-semibold leading-tight sm:text-3xl ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h3>
      <p className={`mt-4 text-base leading-7 ${dark ? "text-cream/75" : "text-ink/70"}`}>
        {description}
      </p>
    </article>
  );
}
