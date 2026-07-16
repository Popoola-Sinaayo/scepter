type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  light = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : "text-left"} ${className}`}
    >
      {eyebrow ? (
        <p
          className={`font-display text-sm uppercase sm:text-base ${
            light ? "text-primary" : "text-navy"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-2 font-display text-[1.75rem] font-bold uppercase leading-tight tracking-tight sm:text-3xl md:text-5xl md:leading-[64px] ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
