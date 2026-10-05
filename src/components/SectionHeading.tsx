type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left"} ${className}`}
    >
      {eyebrow ? (
        <p className={`eyebrow ${light ? "text-cream/70" : "text-burgundy"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${
            light ? "text-cream/75" : "text-ink/70"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
