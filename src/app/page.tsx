import Image from "next/image";
import Link from "next/link";
import { AnchorCard } from "@/components/AnchorCard";
import { Button } from "@/components/Button";
import { CTABand } from "@/components/CTABand";
import { Container } from "@/components/Container";
import { DimensionCard } from "@/components/DimensionCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StatementBand } from "@/components/StatementBand";
import {
  anchors,
  dimensions,
  founder,
  images,
  preamble,
  priestlyDisciplines,
  spheres,
  thesis,
  vision,
} from "@/lib/content";
import { site, socialLinks } from "@/lib/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ReligiousOrganization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/logos/logo-cream-on-red.png`,
  email: site.email,
  description: site.description,
  slogan: site.tagline,
  founder: { "@type": "Person", name: site.founder },
  sameAs: socialLinks.map((link) => link.href),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Hero */}
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-ink sm:min-h-[calc(100svh-5rem)]">
        <Image
          src={images.preaching.src}
          alt={images.preaching.alt}
          fill
          priority
          className="hero-media -z-10 object-cover object-[70%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-ink/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
        <Container className="pb-16 pt-32 sm:pb-24">
          <p className="hero-enter hero-enter-delay-1 eyebrow text-cream/75">
            {site.legalName}
          </p>
          <h1 className="hero-enter hero-enter-delay-2 mt-5 max-w-3xl font-serif text-6xl font-semibold leading-[0.95] tracking-tight text-cream sm:text-7xl md:text-8xl">
            Formed to reign.
            <br />
            <em className="font-medium text-cream/85">Sent to witness.</em>
          </h1>
          <p className="hero-enter hero-enter-delay-3 mt-7 max-w-xl text-base leading-7 text-cream/80 sm:text-lg">
            We form believers into their identity and function as kings and
            priests: shaped at the altar, deployed into every sphere of life as
            witnesses of Christ.
          </p>
          <div className="hero-enter hero-enter-delay-4 mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/doctrine">Our doctrine</Button>
            <Button href="/contact" variant="outline-light">
              Make an enquiry
            </Button>
          </div>
        </Container>
      </section>

      {/* Preamble */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow text-burgundy">Why The Scepter exists</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
                {preamble.lead}
              </h2>
            </Reveal>
            <Reveal delayMs={120} className="lg:pt-10">
              <p className="text-lg leading-8 text-ink/75">{preamble.body}</p>
              <p className="mt-8 border-l-2 border-burgundy pl-5 font-serif text-2xl italic leading-snug text-ink">
                {preamble.maxim}
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-burgundy hover:text-burgundy-deep"
              >
                About the ministry <span aria-hidden>&rarr;</span>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Thesis */}
      <StatementBand eyebrow="The central thesis" statement={thesis.title}>
        <p>{thesis.summary}</p>
      </StatementBand>

      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <Reveal>
            <p className="eyebrow text-center text-burgundy">
              The priestly disciplines
            </p>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {priestlyDisciplines.map((discipline, index) => (
              <Reveal
                key={discipline.title}
                delayMs={index * 80}
                className="bg-cream p-6 sm:p-7"
              >
                <h3 className="font-serif text-2xl font-semibold text-ink">
                  {discipline.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">
                  {discipline.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Anchors */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Four theological anchors"
              title="Built on the whole arc of Scripture"
              description="From Genesis to Revelation, four converging streams of Scripture form one vision of what God intends for the believer."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {anchors.map((anchor, index) => (
              <Reveal key={anchor.slug} delayMs={index * 90} className="h-full">
                <AnchorCard
                  number={anchor.number}
                  title={anchor.title}
                  theme={anchor.theme}
                  scripture={anchor.scripture}
                  summary={anchor.summary}
                  href={`/doctrine#${anchor.slug}`}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Dimensions */}
      <section className="bg-ink py-20 text-cream sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                align="left"
                light
                eyebrow="Our formation philosophy"
                title="Not inspiration. Formation."
                description="Everything we produce, from content to cohorts to curricula, is designed to form, not merely to inform or inspire."
              />
              <div className="mt-10">
                <Button href="/formation" variant="outline-light">
                  How we form
                </Button>
              </div>
            </Reveal>
            <div className="grid gap-10 sm:grid-cols-2">
              {dimensions.map((dimension, index) => (
                <Reveal key={dimension.title} delayMs={index * 90}>
                  <DimensionCard {...dimension} tone="dark" />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Community */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Formed together"
              title="A community of kings and priests"
              description="Formation is never solitary. It happens in community, through doctrine, accountability and shared life."
            />
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-6 sm:gap-5">
            <Reveal className="relative aspect-[3/2] overflow-hidden sm:col-span-4 sm:row-span-2 sm:aspect-auto sm:min-h-[420px]">
              <Image
                src={images.communityLineup.src}
                alt={images.communityLineup.alt}
                fill
                className="object-cover object-[center_35%] transition duration-700 hover:scale-105"
                sizes="(max-width:640px) 100vw, 66vw"
              />
            </Reveal>
            <Reveal delayMs={100} className="relative aspect-[3/2] overflow-hidden sm:col-span-2">
              <Image
                src={images.worshipLead.src}
                alt={images.worshipLead.alt}
                fill
                className="object-cover object-top transition duration-700 hover:scale-105"
                sizes="(max-width:640px) 100vw, 33vw"
              />
            </Reveal>
            <Reveal delayMs={200} className="relative aspect-[3/2] overflow-hidden sm:col-span-2">
              <Image
                src={images.fellowshipMaroon.src}
                alt={images.fellowshipMaroon.alt}
                fill
                className="object-cover object-top transition duration-700 hover:scale-105"
                sizes="(max-width:640px) 100vw, 33vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Founder */}
      <section className="bg-cream py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal variant="fade-left" className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden">
              <Image
                src={images.founderPortrait.src}
                alt={images.founderPortrait.alt}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 400px"
              />
            </Reveal>
            <Reveal variant="fade-right" delayMs={120}>
              <p className="eyebrow text-burgundy">Meet the founder</p>
              <h2 className="mt-4 font-serif text-5xl font-semibold leading-none tracking-tight text-ink sm:text-6xl">
                {founder.name}
              </h2>
              <p className="eyebrow mt-4 text-ink/50">{founder.role}</p>
              <p className="mt-8 font-serif text-2xl italic leading-snug text-ink sm:text-3xl">
                &ldquo;{founder.quote}&rdquo;
              </p>
              <p className="mt-6 max-w-xl text-base leading-7 text-ink/70">
                {founder.bio[0]}
              </p>
              <div className="mt-8">
                <Button href="/about#founder" variant="outline">
                  Read more
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow text-burgundy">The vision of output</p>
            <p className="mt-6 font-serif text-3xl font-medium italic leading-snug text-ink sm:text-4xl md:text-5xl">
              &ldquo;{vision.quote}&rdquo;
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg">
              {vision.body}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {spheres.map((sphere, index) => (
              <Reveal key={sphere.title} delayMs={index * 70} className="bg-paper p-7 sm:p-8">
                <h3 className="font-serif text-2xl font-semibold text-ink">
                  {sphere.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-ink/70">
                  {sphere.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Begin your formation"
        title="Go deep before going wide."
        body="Whether you want to join a cohort, invite the ministry, or simply ask a question, we would love to hear from you."
        primary={{ href: "/contact", label: "Make an enquiry" }}
        secondary={{ href: "/formation#gatherings", label: "Gatherings & cohorts" }}
      />
    </>
  );
}
