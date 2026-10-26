import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { clay } from "@/lib/clay";
import { images } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: clay.title,
  description: `Register to attend or volunteer at ${clay.title}, hosted by ${site.legalName}.`,
  path: "/clay",
});

const paths = [
  {
    href: "/clay/register",
    eyebrow: "Attend",
    title: "Register to attend",
    body: "Register for general attendance. Let us know if you will be bringing children so we can prepare for you.",
    cta: "Register now",
  },
  {
    href: "/clay/volunteer",
    eyebrow: "Serve",
    title: "Volunteer to serve",
    body: "Give your time, skills and energy to help create a well-organised, welcoming and impactful conference.",
    cta: "Apply to volunteer",
  },
] as const;

export default function ClayPage() {
  const details = [
    { label: "Dates", value: clay.dates },
    { label: "Venue", value: clay.venue },
  ].filter((detail) => detail.value);

  return (
    <>
      <PageHero
        eyebrow={`${clay.name} · Hosted by ${site.legalName}`}
        title={`${clay.theme.charAt(0)}${clay.theme.slice(1).toLowerCase()}.`}
        description={`Welcome to ${clay.title}. We look forward to having you join us for this gathering.`}
        image={images.communityCover.src}
        imageAlt={images.communityCover.alt}
        imagePosition="object-[center_35%]"
      />

      <section className="py-20 sm:py-28">
        <Container>
          {details.length > 0 ? (
            <dl className="mb-14 flex flex-wrap gap-x-14 gap-y-6 border-b border-ink/10 pb-10">
              {details.map((detail) => (
                <div key={detail.label}>
                  <dt className="eyebrow text-ink/50">{detail.label}</dt>
                  <dd className="mt-2 font-serif text-2xl font-semibold text-ink">{detail.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="grid gap-6 md:grid-cols-2">
            {paths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group flex flex-col border border-ink/10 bg-cream/50 p-8 transition hover:-translate-y-1 hover:border-burgundy/40 hover:bg-cream sm:p-10"
              >
                <p className="eyebrow text-burgundy">{path.eyebrow}</p>
                <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink">
                  {path.title}
                </h2>
                <p className="mt-4 flex-1 text-base leading-7 text-ink/70">{path.body}</p>
                <span className="mt-8 font-display text-sm font-bold uppercase tracking-[0.14em] text-burgundy">
                  {path.cta}
                  <span aria-hidden className="ml-2 inline-block transition group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
