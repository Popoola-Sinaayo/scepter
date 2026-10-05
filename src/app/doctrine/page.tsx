import type { Metadata } from "next";
import { CTABand } from "@/components/CTABand";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ScriptureQuote } from "@/components/ScriptureQuote";
import { SectionHeading } from "@/components/SectionHeading";
import { StatementBand } from "@/components/StatementBand";
import {
  anchors,
  failures,
  images,
  priestlyDisciplines,
  thesis,
  witness,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Doctrine",
  description:
    "The theological foundation of The Scepter: the Genesis mandate, the order of Melchizedek, the royal priesthood of 1 Peter 2:9 and the eternal confirmation of Revelation. The altar precedes the throne.",
  openGraph: {
    images: [{ url: images.preachingGesture.src, width: 768, height: 1024 }],
  },
};

export default function DoctrinePage() {
  return (
    <>
      <PageHero
        eyebrow="Our doctrine"
        title="Kings and priests, by the whole counsel of Scripture."
        description="Our doctrine is built on four converging streams of Scripture. Taken together, they form one complete vision of what God intends for the believer."
        image={images.preachingGesture.src}
        imageAlt={images.preachingGesture.alt}
        imagePosition="object-[center_20%]"
      />

      {/* Anchor index */}
      <nav aria-label="Theological anchors" className="border-b border-ink/10 bg-cream">
        <Container>
          <ol className="grid grid-cols-2 divide-ink/10 lg:grid-cols-4 lg:divide-x">
            {anchors.map((anchor) => (
              <li key={anchor.slug}>
                <a
                  href={`#${anchor.slug}`}
                  className="flex items-baseline gap-3 px-2 py-5 transition hover:text-burgundy lg:px-6"
                >
                  <span className="font-serif text-2xl font-semibold text-burgundy">
                    {anchor.number}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-[0.12em]">
                    {anchor.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </Container>
      </nav>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Part one"
              title="The theological anchors"
              description="These four anchors are non-negotiable. They are the ground on which everything else is built."
            />
          </Reveal>
          <div className="mt-16 space-y-20 sm:space-y-28">
            {anchors.map((anchor) => (
              <article
                key={anchor.slug}
                id={anchor.slug}
                className="grid scroll-mt-28 gap-10 lg:grid-cols-[0.35fr_1fr] lg:gap-16"
              >
                <Reveal>
                  <span className="font-serif text-7xl font-semibold leading-none text-burgundy/80 sm:text-8xl">
                    {anchor.number}
                  </span>
                  <p className="eyebrow mt-4 text-ink/50">{anchor.theme}</p>
                  <h3 className="mt-2 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                    {anchor.title}
                  </h3>
                </Reveal>
                <Reveal delayMs={100}>
                  <ScriptureQuote scripture={anchor.scripture} size="lg" />
                  <div className="mt-10 space-y-5 text-lg leading-8 text-ink/75">
                    {anchor.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <StatementBand eyebrow="Part two · The central thesis" statement={thesis.title}>
        <p>{thesis.summary}</p>
      </StatementBand>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Formed as priests"
                title="What priestly formation means"
                description="A person genuinely formed in these disciplines carries a different quality of authority. Their governance is not self-serving and their influence is not self-promoting. It is priestly kingship: authority exercised from the altar."
              />
            </Reveal>
            <ol className="divide-y divide-ink/10 border-y border-ink/10">
              {priestlyDisciplines.map((discipline, index) => (
                <Reveal as="li" key={discipline.title} delayMs={index * 70}>
                  <div className="flex items-baseline gap-6 py-6">
                    <span className="eyebrow w-8 shrink-0 text-burgundy">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold text-ink">
                        {discipline.title}
                      </h3>
                      <p className="mt-1 text-base leading-7 text-ink/70">
                        {discipline.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we correct"
              title="Altar and throne, together"
              description="The Scepter refuses every failure that separates what God has joined. Formed and deployed. Intimate and influential."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {failures.map((failure, index) => (
              <Reveal
                key={failure.title}
                delayMs={index * 100}
                className="flex h-full flex-col border border-ink/10 bg-paper p-8"
              >
                <p className="eyebrow text-burgundy">{failure.label}</p>
                <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink">
                  {failure.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-ink/70">
                  {failure.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 text-cream sm:py-28">
        <Container narrow>
          <Reveal>
            <p className="eyebrow text-cream/60">A critical clarification</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              {witness.title}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-8 text-cream/80">
              {witness.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-10 border-l-2 border-burgundy pl-5 font-serif text-2xl italic leading-snug sm:text-3xl">
              {witness.maxim}
            </p>
          </Reveal>
        </Container>
      </section>

      <CTABand
        eyebrow="From doctrine to formation"
        title="Formation is the bridge between identity and function."
        primary={{ href: "/formation", label: "How we form" }}
        secondary={{ href: "/contact", label: "Ask a question" }}
      />
    </>
  );
}
