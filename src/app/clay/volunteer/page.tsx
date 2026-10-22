import { VolunteerForm } from "@/components/clay/VolunteerForm";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { clay } from "@/lib/clay";
import { images } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: `Volunteer | ${clay.title}`,
  description: `Volunteer to serve at ${clay.title}, hosted by ${site.legalName}.`,
  path: "/clay/volunteer",
});

export default function ClayVolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow={`${clay.title} · Volunteers`}
        title="Volunteer to serve."
        description={`Thank you for your interest in serving at ${clay.title}.`}
        image={images.clayVolunteers.src}
        imageAlt={images.clayVolunteers.alt}
        imagePosition="object-[center_35%]"
      />

      <section className="py-20 sm:py-28">
        <Container narrow>
          <div className="mb-14 space-y-4 border-l-2 border-burgundy bg-cream p-7 text-base leading-7 text-ink/75 sm:p-9">
            <p>
              Our volunteers play an important role in creating a well-organised, welcoming and
              impactful conference experience. If you would like to contribute your time, skills and
              energy towards making the conference a success, please complete this form.
            </p>
            <p>
              Your responses will help us understand your interests, experience, availability and
              preferred areas of service.
            </p>
            <p className="text-sm text-ink/60">
              Please note that submitting this form does not automatically guarantee volunteer
              placement. The volunteer coordination team will communicate the next steps.
            </p>
          </div>
          <VolunteerForm />
        </Container>
      </section>
    </>
  );
}
