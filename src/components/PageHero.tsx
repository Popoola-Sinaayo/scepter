import Image from "next/image";
import { Container } from "./Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  imagePosition = "object-center",
}: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[380px] items-end overflow-hidden bg-ink sm:min-h-[460px] md:min-h-[540px]">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            className={`hero-media -z-10 object-cover ${imagePosition}`}
            sizes="100vw"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--burgundy-deep),transparent_60%)]" />
      )}
      <Container className="pb-14 pt-28 sm:pb-20">
        <p className="hero-enter hero-enter-delay-1 eyebrow text-cream/75">{eyebrow}</p>
        <h1 className="hero-enter hero-enter-delay-2 mt-4 max-w-3xl font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-cream sm:text-6xl md:text-7xl">
          {title}
        </h1>
        {description ? (
          <p className="hero-enter hero-enter-delay-3 mt-6 max-w-2xl text-base leading-7 text-cream/80 sm:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
