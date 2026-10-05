import type { Metadata } from "next";
import Image from "next/image";
import { CTABand } from "@/components/CTABand";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ScriptureQuote } from "@/components/ScriptureQuote";
import { SectionHeading } from "@/components/SectionHeading";
import { StatementBand } from "@/components/StatementBand";
import { anchors, founder, images, institution, preamble, witness } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.legalName} is an institution built on formation, forming believers into their identity as kings and priests. Meet our founder, ${site.founder}.`,
  openGraph: {
    images: [{ url: images.communityLineup.src, width: 1024, height: 682 }],
  },
};

const pillars = [
  {
    title: "Our mission",
    body: "To form believers into their identity and function as kings and priests, through deep doctrine, priestly disciplines and intentional discipleship.",
  },
  {
    title: "Our vision",
    body: "A generation formed at the altar and deployed into every sphere of civilization as witnesses, shaping nations through the people we form.",
  },
  {
    title: "Our posture",
    body: "Formation before function. Witness, not dominion. Patience over trends. We go deep before we go wide.",
  },
] as const;

export default function AboutPage() {
  const royalPriesthood = anchors[2].scripture;

  return (
    <>
      <PageHero
        eyebrow="About The Scepter"
        title="An institution built on formation."
        description={preamble.body}
        image={images.communityLineup.src}
        imageAlt={images.communityLineup.alt}
        imagePosition="object-[center_30%]"
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow text-burgundy">Who we are</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
                {preamble.lead}
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink/75">
                The Scepter Christian Ministries exists to close the gap between
                who Scripture says believers are and how they actually live. We
                do not invent an identity for believers. We form them into the
                one Scripture has already declared.
              </p>
            </Reveal>
            <Reveal delayMs={120} className="lg:pt-14">
              <ScriptureQuote scripture={royalPriesthood} size="lg" />
            </Reveal>
          </div>

          <div className="mt-20 grid gap-10 border-t border-ink/10 pt-14 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delayMs={index * 100}>
                <h3 className="font-serif text-3xl font-semibold text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-ink/70">{pillar.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="founder" className="scroll-mt-24 bg-cream py-20 sm:py-28">
        <Container>
          <div className="grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal variant="fade-left" className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={images.founderPortrait.src}
                alt={images.founderPortrait.alt}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 45vw"
              />
            </Reveal>
            <Reveal variant="fade-right" delayMs={120} className="md:pt-8">
              <p className="eyebrow text-burgundy">The founder</p>
              <h2 className="mt-4 font-serif text-5xl font-semibold leading-none tracking-tight text-ink sm:text-6xl">
                {founder.name}
              </h2>
              <p className="eyebrow mt-4 text-ink/50">
                {founder.role}, {site.legalName}
              </p>
              <div className="mt-8 space-y-5 text-lg leading-8 text-ink/75">
                {founder.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-10 border-l-2 border-burgundy pl-5 font-serif text-2xl italic leading-snug text-ink sm:text-3xl">
                &ldquo;{founder.quote}&rdquo;
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3 sm:gap-5">
            <Reveal className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={images.preachingGesture.src}
                alt={images.preachingGesture.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width:640px) 100vw, 33vw"
              />
            </Reveal>
            <Reveal delayMs={100} className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={images.founderSeated.src}
                alt={images.founderSeated.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width:640px) 100vw, 33vw"
              />
            </Reveal>
            <Reveal delayMs={200} className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={images.founderLectern.src}
                alt={images.founderLectern.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width:640px) 100vw, 33vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <StatementBand eyebrow="A critical clarification" statement={witness.title} tone="ink">
        <p>{witness.body[0]}</p>
      </StatementBand>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow={institution.lead}
                title={institution.title}
                description={institution.body}
              />
              <p className="mt-8 font-serif text-2xl italic text-burgundy sm:text-3xl">
                {institution.maxim}
              </p>
            </Reveal>
            <Reveal delayMs={120} className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={images.groupStage.src}
                alt={images.groupStage.alt}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Walk with us"
        title="Let the building begin."
        body="Explore the doctrine that shapes everything we do, or reach out to the team."
        primary={{ href: "/doctrine", label: "Read our doctrine" }}
        secondary={{ href: "/contact", label: "Contact us" }}
      />
    </>
  );
}
