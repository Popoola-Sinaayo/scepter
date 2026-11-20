import { DiasporaForm } from "@/components/clay/DiasporaForm";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { clay } from "@/lib/clay";
import { images } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: `Diaspora registration | ${clay.title}`,
  description: `Diaspora registration for ${clay.title}, hosted by ${site.legalName}.`,
  path: "/claycon/diaspora",
});

export default function ClayDiasporaPage() {
  return (
    <>
      <PageHero
        eyebrow={`${clay.title} · Diaspora`}
        title="Diaspora registration."
        description={`Welcome to ${clay.title}. We look forward to having you join us for this gathering.`}
        feature={images.clayconPoster}
      />

      <section className="py-20 sm:py-28">
        <Container narrow>
          <div className="mb-14 space-y-4 border-l-2 border-burgundy bg-cream p-7 text-base leading-7 text-ink/75 sm:p-9">
            <p>
              This form is for guests travelling to the conference from outside Nigeria. It helps the organising team know who is coming from abroad and prepare to welcome you.
            </p>
          </div>
          <DiasporaForm />
        </Container>
      </section>
    </>
  );
}
