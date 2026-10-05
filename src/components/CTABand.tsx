import Image from "next/image";
import { Button } from "./Button";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

type CTABandProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
};

export function CTABand({ eyebrow, title, body, primary, secondary }: CTABandProps) {
  return (
    <section className="relative isolate overflow-hidden bg-burgundy py-20 text-cream sm:py-28">
      <Image
        src="/logos/scepter-mark-cream.png"
        alt=""
        width={416}
        height={230}
        className="pointer-events-none absolute -right-20 -bottom-10 -z-10 w-[420px] opacity-[0.07] sm:w-[640px]"
      />
      <Container narrow>
        <Reveal className="text-center">
          {eyebrow ? <p className="eyebrow text-cream/70">{eyebrow}</p> : null}
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h2>
          {body ? (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-cream/80 sm:text-lg">
              {body}
            </p>
          ) : null}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={primary.href} variant="light">
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} variant="outline-light">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
