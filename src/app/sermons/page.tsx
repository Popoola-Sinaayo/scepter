import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { events, featuredEvent } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sermons",
  description: `Join upcoming sermons and events with ${site.name}.`,
};

export default function SermonsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sermon"
        title="Take part in our sermon"
        image="/images/sermons-hero.jpg"
        overlay="dark"
      />

      <section className="bg-white px-4 py-14 sm:px-6 sm:py-20 md:px-10 lg:px-[7.33%]">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading
            eyebrow="Upcoming sermons"
            title="Join us and become part of something great"
          />

          <div className="mt-8 grid overflow-hidden sm:mt-12 lg:grid-cols-[minmax(280px,435px)_1fr]">
            <div className="relative bg-cream p-6 pr-20 sm:p-10 sm:pr-24 md:p-12">
              <div className="absolute right-5 top-5 text-right sm:right-8 sm:top-8">
                <p className="font-display text-xl font-bold text-navy sm:text-2xl">
                  {featuredEvent.day}
                </p>
                <p className="font-display text-sm uppercase text-navy sm:text-base">
                  {featuredEvent.month}
                </p>
              </div>
              <p className="bg-gradient-to-r from-[#a54e2b] to-[#dc9853] bg-clip-text font-display text-xs font-bold uppercase tracking-[0.08em] text-transparent">
                {featuredEvent.label}
              </p>
              <h3 className="mt-3 max-w-[16rem] font-display text-xl font-bold uppercase tracking-tight text-navy sm:text-2xl">
                {featuredEvent.title}
              </h3>
              <p className="mt-4 max-w-sm font-display text-base leading-6 text-navy/80">
                {featuredEvent.description}
              </p>
              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <Image
                    src="/icons/clock.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="mt-0.5 shrink-0"
                  />
                  <p className="min-w-0 font-display text-base leading-6 text-navy normal-case tracking-normal">
                    {featuredEvent.time}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Image
                    src="/icons/location.svg"
                    alt=""
                    width={20}
                    height={25}
                    className="mt-0.5 shrink-0"
                  />
                  <p className="min-w-0 font-display text-base leading-6 text-navy normal-case tracking-normal">
                    {featuredEvent.location}
                  </p>
                </div>
              </div>
              <div className="mt-8 sm:mt-10">
                <Button href="/contact" variant="dark">
                  Register
                </Button>
              </div>
            </div>
            <div className="relative min-h-[240px] sm:min-h-[360px] lg:min-h-[512px]">
              <Image
                src={featuredEvent.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 60vw"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-start sm:mt-8 sm:justify-end">
            <Link
              href="#events"
              className="inline-flex items-center gap-3 font-display text-lg text-navy transition hover:text-burgundy sm:text-2xl"
            >
              View all Sermons
              <Image src="/icons/arrow.svg" alt="" width={24} height={15} />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="events"
        className="bg-white px-4 pb-16 sm:px-6 sm:pb-24 md:px-10 lg:px-[7.33%]"
      >
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-center font-display text-[1.75rem] font-bold uppercase tracking-tight text-navy sm:text-4xl md:text-5xl md:leading-[64px]">
            View all events
          </h2>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {events.map((event) => (
              <article
                key={event.title}
                className={`relative flex min-h-[360px] flex-col bg-cream p-6 pr-16 sm:min-h-[430px] sm:p-8 sm:pr-20 ${
                  event.highlight ? "border-b-4 border-primary" : ""
                }`}
              >
                <div className="absolute right-4 top-4 text-right sm:right-6 sm:top-6">
                  <p className="font-display text-xl font-bold text-navy sm:text-2xl">
                    {event.day}
                  </p>
                  <p className="font-display text-sm uppercase text-navy sm:text-base">
                    {event.month}
                  </p>
                </div>
                <p className="bg-gradient-to-r from-[#a54e2b] to-[#dc9853] bg-clip-text font-display text-xs font-bold uppercase tracking-[0.08em] text-transparent">
                  Upcoming Event
                </p>
                <h3 className="mt-3 max-w-[16rem] font-display text-xl font-bold uppercase leading-snug tracking-tight text-navy sm:text-2xl">
                  {event.title}
                </h3>
                <p className="mt-4 font-display text-base leading-6 text-navy/80">
                  {event.description}
                </p>
                <div className="mt-auto space-y-5 pt-8 sm:pt-10">
                  <div className="flex items-start gap-3">
                    <Image
                      src="/icons/clock.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="mt-0.5 shrink-0"
                    />
                    <p className="min-w-0 font-display text-base leading-6 text-navy normal-case tracking-normal">
                      {event.time}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Image
                      src="/icons/location.svg"
                      alt=""
                      width={20}
                      height={25}
                      className="mt-0.5 shrink-0"
                    />
                    <p className="min-w-0 font-display text-base leading-6 text-navy normal-case tracking-normal">
                      {event.location}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
