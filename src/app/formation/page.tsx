import { CTABand } from "@/components/CTABand";
import { Container } from "@/components/Container";
import { DimensionCard } from "@/components/DimensionCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  dimensions,
  formationDefinition,
  formationIsNot,
  images,
  spheres,
  vision,
} from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Formation",
  description:
    "How The Scepter forms believers: theological, spiritual, leadership and vocational formation for every sphere of life.",
  path: "/formation",
});

export default function FormationPage() {
  return (
    <>
      <PageHero
        eyebrow="Formation"
        title="The patient, architectural work of becoming."
        description="Formation is our primary methodology. Everything we produce is designed to form, not merely to inform or inspire."
        image={images.teachingRoom.src}
        imageAlt={images.teachingRoom.alt}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow text-burgundy">What formation is</p>
              <p className="mt-5 font-serif text-3xl font-medium leading-snug text-ink sm:text-4xl">
                {formationDefinition}
              </p>
            </Reveal>
            <Reveal delayMs={120} className="lg:pt-10">
              <p className="eyebrow text-ink/50">And what it is not</p>
              <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                {formationIsNot.map((item) => (
                  <li key={item.title} className="py-6">
                    <p className="text-lg leading-8 text-ink/75">
                      <span className="font-serif text-2xl font-semibold text-ink line-through decoration-burgundy decoration-2">
                        {item.title}
                      </span>{" "}
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Four dimensions"
              title="Forming the whole person"
              description="Mind, will, affections and habits, engaged deliberately through doctrine, community and accountability."
            />
          </Reveal>
          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {dimensions.map((dimension, index) => (
              <Reveal key={dimension.title} delayMs={index * 90}>
                <DimensionCard {...dimension} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 text-cream sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                align="left"
                light
                eyebrow="Spheres of deployment"
                title="Formed and sent into every sphere"
                description={vision.body}
              />
              <p className="mt-10 border-l-2 border-burgundy pl-5 font-serif text-2xl italic leading-snug">
                &ldquo;{vision.quote}&rdquo;
              </p>
            </Reveal>
            <div className="grid gap-px overflow-hidden border border-cream/10 bg-cream/10 sm:grid-cols-2">
              {spheres.map((sphere, index) => (
                <Reveal key={sphere.title} delayMs={index * 70} className="bg-ink p-7">
                  <h3 className="font-serif text-2xl font-semibold">{sphere.title}</h3>
                  <p className="mt-2 text-base leading-7 text-cream/70">
                    {sphere.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Not in a hurry"
        title="We are building for centuries."
        body="If you sense a call to be formed, not just inspired, we would love to walk with you."
        primary={{ href: site.joinUrl, label: "Join The Scepter" }}
        secondary={{ href: "/teachings", label: "Explore teachings" }}
      />
    </>
  );
}
