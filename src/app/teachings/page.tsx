import type { Metadata } from "next";
import { CTABand } from "@/components/CTABand";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialIcon } from "@/components/SocialIcon";
import { images, teachings } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Teachings",
  description:
    "Sermons, teaching series and writing from The Scepter on identity, priestly formation and witness in every sphere.",
  openGraph: {
    images: [{ url: images.founderLectern.src, width: 768, height: 1024 }],
  },
};

const channels = [
  {
    key: "youtube",
    title: "Sermons & teaching series",
    description: "Full messages and teaching series on YouTube.",
    href: site.social.youtube,
  },
  {
    key: "instagram",
    title: "Teaching slides & moments",
    description: "Daily doctrine, slides and highlights on Instagram.",
    href: site.social.instagram,
  },
  {
    key: "podcast",
    title: "Podcast",
    description: "Listen to teachings wherever you are.",
    href: site.social.podcast,
  },
] as const;

export default function TeachingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Teachings"
        title="Every sermon is a brick in the building."
        description="Teaching that forms, not merely informs: on identity, priestly formation, and witness in every sphere."
        image={images.founderLectern.src}
        imageAlt={images.founderLectern.alt}
        imagePosition="object-[center_18%]"
      />

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Watch & listen"
              title="Find our teachings"
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {channels.map((channel, index) => {
              const content = (
                <>
                  <SocialIcon name={channel.key} className="size-8 text-burgundy" />
                  <h3 className="mt-6 font-serif text-3xl font-semibold leading-tight text-ink">
                    {channel.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-7 text-ink/70">
                    {channel.description}
                  </p>
                  <span className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-burgundy">
                    {channel.href ? <>Open &rarr;</> : "Coming soon"}
                  </span>
                </>
              );
              const className =
                "flex h-full flex-col border border-ink/10 bg-cream p-8 transition duration-300";
              return (
                <Reveal key={channel.key} delayMs={index * 100} className="h-full">
                  {channel.href ? (
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${className} hover:-translate-y-1 hover:border-burgundy/40`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className={className}>{content}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <Container narrow>
          <Reveal>
            <SectionHeading eyebrow="Latest" title="Recent teachings" />
          </Reveal>
          {teachings.length > 0 ? (
            <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
              {teachings.map((teaching) => (
                <li key={teaching.href}>
                  <a
                    href={teaching.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-8 transition hover:text-burgundy"
                  >
                    <p className="eyebrow text-burgundy">
                      {[teaching.series, teaching.date].filter(Boolean).join(" · ")}
                    </p>
                    <h3 className="mt-2 font-serif text-3xl font-semibold leading-tight">
                      {teaching.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-ink/70">
                      {teaching.excerpt}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="mt-12 border border-dashed border-ink/20 bg-paper p-10 text-center">
              <p className="font-serif text-2xl italic text-ink">
                New teachings are on their way.
              </p>
              <p className="mt-3 text-base leading-7 text-ink/70">
                Subscribe in the footer below to be notified when they are published.
              </p>
            </Reveal>
          )}
        </Container>
      </section>

      <CTABand
        title="Invite The Scepter to teach."
        body="For speaking invitations, conferences and collaborations, reach out to the team."
        primary={{ href: "/contact", label: "Make an enquiry" }}
      />
    </>
  );
}
