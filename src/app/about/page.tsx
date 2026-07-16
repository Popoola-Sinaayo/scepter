import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { aboutBenefits, teamMembers } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name} — our mission, vision, and the people who lead us.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Serving the world around us"
        image="/images/about-hero.jpg"
        overlay="light"
        titleClassName="text-navy"
      />

      <section className="bg-white px-4 py-14 sm:px-6 sm:py-20 md:px-10 lg:px-[7.33%]">
        <div className="mx-auto max-w-[900px] text-center">
          <SectionHeading
            eyebrow="Welcome to our ministry"
            title="Love and compassion"
          />
          <p className="mt-6 font-display text-base leading-6 text-navy/80">
            The Scepter exists to love God and neighbor with sincerity — building
            a community where worship, discipleship, and compassion shape everyday
            life.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-[1100px] flex-col items-center justify-center gap-4 sm:mt-14 sm:gap-5 md:flex-row md:items-end">
          <div className="relative h-[240px] w-full overflow-hidden rounded-[24px] sm:h-[300px] sm:rounded-[30px] md:h-[384px] md:w-[293px]">
            <Image
              src="/images/gallery-left.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 293px"
            />
          </div>
          <div className="relative h-[280px] w-full overflow-hidden rounded-[24px] sm:h-[360px] sm:rounded-[32px] md:h-[512px] md:w-[390px]">
            <Image
              src="/images/gallery-center.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 390px"
            />
          </div>
          <div className="relative h-[240px] w-full overflow-hidden rounded-[24px] sm:h-[300px] sm:rounded-[30px] md:h-[384px] md:w-[293px]">
            <Image
              src="/images/gallery-right.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 293px"
            />
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1024px] gap-10 sm:mt-20 sm:gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-display text-sm uppercase text-navy sm:text-base">
              Our mission & vision
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-navy sm:text-3xl">
              Striving for a better tomorrow
            </h3>
            <p className="mt-4 font-display text-base leading-6 text-navy/80">
              We pursue a future where families, cities, and nations are renewed
              by the hope of Christ — starting with faithful presence in our local
              community.
            </p>
          </div>
          <div>
            <p className="font-display text-sm uppercase text-navy sm:text-base">
              What we do
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-navy sm:text-3xl">
              Bringing peace and joy to the world
            </h3>
            <p className="mt-4 font-display text-base leading-6 text-navy/80">
              Through worship gatherings, teaching, outreach, and pastoral care,
              we invite people into a life of peace, purpose, and joyful service.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-14 sm:px-6 sm:pb-20 md:px-10 lg:px-[7.33%]">
        <div className="mx-auto max-w-[1024px]">
          <SectionHeading
            eyebrow="Benefits"
            title="The benefits of joining our ministry"
          />
          <div className="mt-10 space-y-12 sm:mt-16 sm:space-y-16">
            {aboutBenefits.map((item) => (
              <div
                key={item.title}
                className="grid items-center gap-6 sm:gap-10 md:grid-cols-2"
              >
                <div
                  className={`relative h-[220px] overflow-hidden sm:h-[280px] md:h-[320px] ${
                    item.imageLeft ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 500px"
                  />
                </div>
                <div className={item.imageLeft ? "md:order-2" : "md:order-1"}>
                  <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-navy sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[480px] font-display text-base leading-6 text-navy/80">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-16 sm:px-6 sm:pb-24 md:px-10 lg:px-[7.33%]">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading
            eyebrow="Ministry team"
            title="Meet our inspirational team"
          />
          <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="flex flex-col items-center bg-grey px-5 py-10 text-center sm:px-6 sm:py-12"
              >
                <div className="relative size-[128px] overflow-hidden rounded-full border-8 border-white sm:size-[152px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="152px"
                  />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight text-navy sm:mt-8 sm:text-2xl">
                  {member.name}
                </h3>
                <p className="mt-2 font-display text-base text-navy/70">
                  {member.role}
                </p>
                <div className="mt-5 flex items-center gap-5">
                  <a
                    href={site.social.facebook}
                    aria-label="Facebook"
                    className="relative size-4"
                  >
                    <Image
                      src="/icons/facebook-dark.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </a>
                  <a
                    href={site.social.twitter}
                    aria-label="Twitter"
                    className="relative size-4"
                  >
                    <Image
                      src="/icons/twitter-dark.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </a>
                  <a
                    href={site.social.linkedin}
                    aria-label="LinkedIn"
                    className="relative size-4"
                  >
                    <Image
                      src="/icons/linkedin-dark.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
