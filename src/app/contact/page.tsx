import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} at ${site.email}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch with our ministry"
        image="/images/contact-hero.jpg"
        overlay="dark"
      />

      <section className="bg-grey px-4 py-14 sm:px-6 sm:py-20 md:px-10 lg:px-[7.33%]">
        <div className="mx-auto grid max-w-[1280px] gap-10 sm:gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="min-w-0">
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink sm:text-2xl">
              Contact form:
            </h2>
            <form className="mt-6 space-y-4 sm:mt-8 sm:space-y-5" action="#" method="post">
              <label className="block">
                <span className="sr-only">Your full name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full Name"
                  required
                  className="w-full rounded bg-white px-4 py-4 font-display text-base text-navy outline-none ring-1 ring-transparent placeholder:text-navy focus:ring-primary sm:px-5 sm:py-5"
                />
              </label>
              <label className="block">
                <span className="sr-only">Your email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full rounded bg-white px-4 py-4 font-display text-base text-navy outline-none ring-1 ring-transparent placeholder:text-navy focus:ring-primary sm:px-5 sm:py-5"
                />
              </label>
              <label className="block">
                <span className="sr-only">Query related</span>
                <input
                  type="text"
                  name="query"
                  placeholder="Query Related"
                  className="w-full rounded bg-white px-4 py-4 font-display text-base text-navy outline-none ring-1 ring-transparent placeholder:text-navy focus:ring-primary sm:px-5 sm:py-5"
                />
              </label>
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={5}
                  required
                  className="w-full resize-y rounded bg-white px-4 py-4 font-display text-base text-navy outline-none ring-1 ring-transparent placeholder:text-navy focus:ring-primary sm:px-5 sm:py-5"
                />
              </label>
              <Button type="submit" className="w-full !rounded-xl">
                Send message
              </Button>
            </form>
          </div>

          <div className="min-w-0 space-y-8 pt-2 sm:space-y-10 lg:pt-14">
            <div>
              <p className="font-display text-base text-ink/70 sm:text-lg">
                Address
              </p>
              <p className="mt-3 font-display text-xl font-bold uppercase leading-snug tracking-tight text-navy sm:text-2xl">
                {site.contactAddress[0]}
                <br />
                {site.contactAddress[1]}
              </p>
            </div>

            <div>
              <p className="font-display text-base text-ink/70">
                Contact Details
              </p>
              <p className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-navy sm:text-2xl">
                {site.phone}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block break-all font-display text-lg font-bold uppercase tracking-tight text-navy transition hover:text-burgundy sm:text-2xl"
              >
                {site.email}
              </a>
            </div>

            <div>
              <p className="font-display text-base text-ink/70">Find us here</p>
              <div className="mt-4 flex items-center gap-6">
                <a
                  href={site.social.facebook}
                  aria-label="Facebook"
                  className="relative size-[26px]"
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
                  className="relative size-[26px]"
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
                  className="relative size-[26px]"
                >
                  <Image
                    src="/icons/linkedin-dark.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
