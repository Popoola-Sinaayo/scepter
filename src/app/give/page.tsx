import { CTABand } from "@/components/CTABand";
import { Container } from "@/components/Container";
import { CopyButton } from "@/components/CopyButton";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ScriptureQuote } from "@/components/ScriptureQuote";
import { giving, images } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Partner with us",
  description: `Give to and partner with ${site.legalName} as we form believers into their identity as kings and priests.`,
  path: "/give",
});

export default function GivePage() {
  return (
    <>
      <PageHero
        eyebrow="Giving & partnership"
        title="Partner with us."
        description="Your giving helps us form a generation at the altar and send them into every sphere as witnesses of Christ."
        image={images.communityLineup.src}
        imageAlt={images.communityLineup.alt}
        imagePosition="object-[center_30%]"
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow text-burgundy">Why we give</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                Building an institution that outlasts us.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-ink/75 sm:text-lg sm:leading-8">
                <p>
                  Every gift supports formation cohorts, gatherings, teaching, and conferences such
                  as CLAY. Partnership is not a transaction. It is fellowship in the work of
                  forming kings and priests.
                </p>
              </div>
              <ScriptureQuote
                className="mt-10"
                scripture={{
                  text: "So let each one give as he purposes in his heart, not grudgingly or of necessity; for God loves a cheerful giver.",
                  reference: "2 Corinthians 9:7",
                }}
              />
            </Reveal>

            <Reveal delayMs={120}>
              <div className="border-t-4 border-burgundy bg-cream p-7 sm:p-10">
                <p className="eyebrow text-burgundy">Bank transfer</p>
                <p className="mt-3 font-serif text-3xl font-semibold text-ink">{giving.bank}</p>
                <p className="mt-1 text-base text-ink/70">
                  Account name: <span className="font-bold text-ink">{giving.accountName}</span>
                </p>
                <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                  {giving.accounts.map((account) => (
                    <li
                      key={account.currency}
                      className="flex items-center justify-between gap-4 py-5"
                    >
                      <div className="min-w-0">
                        <p className="eyebrow text-ink/50">
                          {account.currency} · {account.label}
                        </p>
                        <p className="mt-1 font-serif text-2xl font-semibold tracking-wider text-ink sm:text-3xl">
                          {account.number}
                        </p>
                      </div>
                      <CopyButton value={account.number} label={account.currency} />
                    </li>
                  ))}
                </ul>
                {site.phone ? (
                  <p className="mt-6 text-sm leading-6 text-ink/65">
                    For enquiries about giving, call or WhatsApp{" "}
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="font-bold text-ink underline underline-offset-2 hover:text-burgundy"
                    >
                      {site.phone}
                    </a>
                    .
                  </p>
                ) : null}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Walk with us"
        title="More than giving: be formed with us."
        body="Join The Scepter community and grow in your identity and function as a king and priest."
        primary={{ href: site.joinUrl, label: "Join The Scepter" }}
        secondary={{ href: "/clay/register", label: "Register for CLAYCON 2026" }}
      />
    </>
  );
}
