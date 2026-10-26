import { AttendeeForm } from "@/components/clay/AttendeeForm";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { clay } from "@/lib/clay";
import { images } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: `Register | ${clay.title}`,
  description: `Register to attend ${clay.title}, hosted by ${site.legalName}.`,
  path: "/clay/register",
});

export default function ClayRegisterPage() {
  return (
    <>
      <PageHero
        eyebrow={`${clay.title} · General attendance`}
        title="Register to attend."
        description={`Welcome to ${clay.title}, hosted by ${site.legalName}. We look forward to having you join us for this gathering.`}
        image={images.clayRegister.src}
        imageAlt={images.clayRegister.alt}
        imagePosition="object-[center_25%]"
        logo={{ src: "/logos/claycon-logo-light.png", width: 326, height: 210 }}
      />

      <section className="py-20 sm:py-28">
        <Container narrow>
          <div className="mb-14 space-y-4 border-l-2 border-burgundy bg-cream p-7 text-base leading-7 text-ink/75 sm:p-9">
            <p>
              Kindly complete the registration form below to help us prepare for your attendance and
              provide a smooth conference experience.
            </p>
            <p>
              Please provide accurate information so we can prepare for you. If you will be
              attending with children, kindly indicate this in the form.
            </p>
            <p className="font-serif text-xl italic text-ink">We look forward to welcoming you!</p>
          </div>
          <AttendeeForm />
        </Container>
      </section>
    </>
  );
}
