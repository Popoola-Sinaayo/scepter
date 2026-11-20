import { SeniorForm } from "@/components/clay/SeniorForm";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { clay } from "@/lib/clay";
import { images } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: `Seniors' registration | ${clay.title}`,
  description: `Seniors' registration for ${clay.title}, hosted by ${site.legalName}.`,
  path: "/claycon/seniors",
});

export default function ClaySeniorPage() {
  return (
    <>
      <PageHero
        eyebrow={`${clay.title} · Seniors`}
        title="Seniors' registration."
        description={`Welcome to ${clay.title}. We look forward to having you join us for this gathering.`}
        feature={images.clayconPoster}
      />

      <section className="py-20 sm:py-28">
        <Container narrow>
          <div className="mb-14 space-y-4 border-l-2 border-burgundy bg-cream p-7 text-base leading-7 text-ink/75 sm:p-9">
            <p>
              This form is for our older guests. It helps the organising team prepare to welcome you, including any help or seating you may need.
            </p>
            <p className="text-sm text-ink/60">
              If you are registering on behalf of a parent or grandparent, please fill in their details and add your own email or phone number so we can reach you.
            </p>
          </div>
          <SeniorForm />
        </Container>
      </section>
    </>
  );
}
