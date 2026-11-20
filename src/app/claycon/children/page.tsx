import { ChildrenForm } from "@/components/clay/ChildrenForm";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { clay } from "@/lib/clay";
import { images } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: `Children's registration | ${clay.title}`,
  description: `Children's registration for ${clay.title}, hosted by ${site.legalName}.`,
  path: "/claycon/children",
});

export default function ClayChildrenPage() {
  return (
    <>
      <PageHero
        eyebrow={`${clay.title} · Children`}
        title="Children's registration."
        description={`Welcome to ${clay.title}. We look forward to having you join us for this gathering.`}
        feature={images.clayconPoster}
      />

      <section className="py-20 sm:py-28">
        <Container narrow>
          <div className="mb-14 space-y-4 border-l-2 border-burgundy bg-cream p-7 text-base leading-7 text-ink/75 sm:p-9">
            <p>
              Parents and guardians: please let us know how many children you are bringing and their ages, so the children&apos;s team can prepare for them.
            </p>
            <p className="text-sm text-ink/60">
              Children should be registered by a parent or guardian, who should also register to attend.
            </p>
          </div>
          <ChildrenForm />
        </Container>
      </section>
    </>
  );
}
