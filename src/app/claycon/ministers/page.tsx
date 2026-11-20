import { MinisterForm } from "@/components/clay/MinisterForm";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { clay } from "@/lib/clay";
import { images } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: `Ministers' registration | ${clay.title}`,
  description: `Registration and ministry information form for ministers, pastors and ministry leaders attending ${clay.title}, hosted by ${site.legalName}.`,
  path: "/claycon/ministers",
});

export default function ClayMinistersPage() {
  return (
    <>
      <PageHero
        eyebrow={`${clay.title} · Ministers`}
        title="Ministers' registration."
        description={`Welcome to ${clay.title}. This form is for ministers, pastors, ministry leaders and church workers serving in leadership capacities.`}
        feature={images.clayconPoster}
      />

      <section className="py-20 sm:py-28">
        <Container narrow>
          <div className="mb-14 space-y-4 border-l-2 border-burgundy bg-cream p-7 text-base leading-7 text-ink/75 sm:p-9">
            <p>
              This short form is for ministers, pastors, ministry leaders and church workers serving in
              leadership capacities. It helps the organising team prepare to welcome you and anyone
              coming with you.
            </p>
            <p className="text-sm text-ink/60">
              Completing this form does not automatically guarantee a speaking engagement,
              ministerial assignment, special seating, or any other official conference role. Such
              arrangements will be communicated by the organising team where applicable.
            </p>
          </div>
          <MinisterForm />
        </Container>
      </section>
    </>
  );
}
