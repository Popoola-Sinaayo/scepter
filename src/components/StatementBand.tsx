import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

type StatementBandProps = {
  eyebrow?: string;
  statement: string;
  children?: ReactNode;
  tone?: "burgundy" | "ink" | "cream";
};

const tones = {
  burgundy: "bg-burgundy text-cream",
  ink: "bg-ink text-cream",
  cream: "bg-cream text-ink",
} as const;

export function StatementBand({
  eyebrow,
  statement,
  children,
  tone = "burgundy",
}: StatementBandProps) {
  const light = tone !== "cream";
  return (
    <section className={`relative overflow-hidden py-20 sm:py-28 ${tones[tone]}`}>
      <Container narrow>
        <Reveal className="text-center">
          {eyebrow ? (
            <p className={`eyebrow ${light ? "text-cream/70" : "text-burgundy"}`}>
              {eyebrow}
            </p>
          ) : null}
          <p className="mt-5 font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            {statement}
          </p>
          {children ? (
            <div
              className={`mx-auto mt-8 max-w-2xl text-base leading-7 sm:text-lg ${
                light ? "text-cream/80" : "text-ink/75"
              }`}
            >
              {children}
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
