import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SocialIcon } from "@/components/SocialIcon";
import { images } from "@/lib/content";
import { site, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Send an enquiry to ${site.legalName}: questions, cohorts, speaking invitations and more.`,
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string | string[] }>;
}) {
  const { subject } = await searchParams;
  const defaultSubject = (Array.isArray(subject) ? subject[0] : subject)?.slice(0, 160) ?? "";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We would love to hear from you."
        description="Questions about the ministry, formation cohorts, gatherings or invitations: send us a message and the team will respond personally."
        image={images.fellowshipMaroon.src}
        imageAlt={images.fellowshipMaroon.alt}
        imagePosition="object-[center_25%]"
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
            <div className="min-w-0">
              <p className="eyebrow text-burgundy">Enquiry form</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                Send us a message
              </h2>
              <div className="mt-10">
                <ContactForm defaultSubject={defaultSubject} />
              </div>
            </div>

            <aside className="min-w-0 space-y-10 border-t border-ink/10 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-2">
              <div>
                <p className="eyebrow text-ink/50">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block break-all font-serif text-2xl font-semibold text-ink transition hover:text-burgundy"
                >
                  {site.email}
                </a>
              </div>
              {site.phone ? (
                <div>
                  <p className="eyebrow text-ink/50">Phone</p>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="mt-3 block font-serif text-2xl font-semibold text-ink transition hover:text-burgundy"
                  >
                    {site.phone}
                  </a>
                </div>
              ) : null}
              {site.location ? (
                <div>
                  <p className="eyebrow text-ink/50">Location</p>
                  <p className="mt-3 font-serif text-2xl font-semibold text-ink">
                    {site.location}
                  </p>
                </div>
              ) : null}
              {socialLinks.length > 0 ? (
                <div>
                  <p className="eyebrow text-ink/50">Follow</p>
                  <div className="mt-4 flex items-center gap-5">
                    {socialLinks.map((link) => (
                      <a
                        key={link.key}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="text-ink/70 transition hover:text-burgundy"
                      >
                        <SocialIcon name={link.key} className="size-6" />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="bg-cream p-7">
                <p className="font-serif text-xl italic leading-snug text-ink">
                  &ldquo;That you may proclaim the praises of Him who called you
                  out of darkness into His marvelous light.&rdquo;
                </p>
                <p className="eyebrow mt-3 text-burgundy">1 Peter 2:9</p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
