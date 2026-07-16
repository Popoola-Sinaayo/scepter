import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import {
  benefitTiles,
  blogPosts,
  featuredEvent,
  homeCards,
} from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] overflow-hidden md:min-h-[820px]">
        <Image
          src="/images/hero-home.jpg"
          alt="Worship at The Scepter"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
        <div className="relative mx-auto flex min-h-[70vh] w-full max-w-[1500px] flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 md:min-h-[820px] md:px-10 lg:px-[7.33%]">
          <p className="font-display text-sm uppercase tracking-wide text-white sm:text-base">
            {site.name}
          </p>
          <h1 className="mt-3 max-w-[700px] font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:mt-4 sm:text-4xl md:text-6xl md:leading-[74px]">
            {site.tagline}
          </h1>
          <div className="mt-8 sm:mt-10">
            <Button href="/about">Learn more</Button>
          </div>
          <p className="mt-6 max-w-md font-display text-sm leading-6 text-white/85 sm:mt-8 sm:text-base">
            Become a part of our community — worship, grow, and serve with us.
          </p>
        </div>
      </section>

      {/* Relevant cards */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-20 md:px-10 lg:px-[7.33%]">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading title="A church that's relevant" />
          <div className="mt-8 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
            {homeCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative overflow-hidden bg-cream transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-[160px] bg-primary/80 sm:h-[180px]">
                  {card.shape ? (
                    <Image
                      src={card.shape}
                      alt=""
                      width={120}
                      height={120}
                      className="absolute right-4 top-4 opacity-40"
                    />
                  ) : null}
                  <div className="absolute left-6 top-8 size-12 overflow-hidden sm:left-8 sm:top-10">
                    <Image
                      src={card.icon}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-navy sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 font-display text-base leading-6 text-navy/80">
                    {card.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Love and compassion */}
      <section className="bg-white px-4 pb-16 sm:px-6 sm:pb-24 md:px-10 lg:px-[7.33%]">
        <div className="mx-auto max-w-[900px] text-center">
          <SectionHeading
            eyebrow="Welcome to our church"
            title="Love and compassion"
          />
          <p className="mt-6 font-display text-base leading-6 text-navy/80">
            At The Scepter we gather to worship, grow, and care for one another —
            creating a home where every person can encounter hope and belonging.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/about">Read more</Button>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-[1100px] flex-col items-center justify-center gap-4 sm:mt-14 sm:gap-5 md:flex-row md:items-end">
          <div className="relative h-[240px] w-full overflow-hidden rounded-[24px] sm:h-[300px] sm:rounded-[30px] md:h-[384px] md:w-[293px]">
            <Image
              src="/images/gallery-left.jpg"
              alt="Prayer"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 293px"
            />
          </div>
          <div className="relative h-[280px] w-full overflow-hidden rounded-[24px] sm:h-[360px] sm:rounded-[32px] md:h-[512px] md:w-[390px]">
            <Image
              src="/images/gallery-center.jpg"
              alt="Community reading Scripture"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 390px"
            />
          </div>
          <div className="relative h-[240px] w-full overflow-hidden rounded-[24px] sm:h-[300px] sm:rounded-[30px] md:h-[384px] md:w-[293px]">
            <Image
              src="/images/gallery-right.jpg"
              alt="Gathering in faith"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 293px"
            />
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="bg-grey px-4 py-14 sm:px-6 sm:py-20 md:px-10 lg:px-[7.33%]">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading
            eyebrow="Watch and listen"
            title="The benefits of joining our church"
          />
          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {benefitTiles.map((tile, index) => (
              <article
                key={`${tile.title}-${index}`}
                className="group relative aspect-[4/3] overflow-hidden sm:aspect-square"
              >
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <h3 className="font-display text-lg font-bold uppercase leading-snug tracking-tight sm:text-xl">
                    {tile.title}
                  </h3>
                  <p className="mt-2 font-display text-sm leading-5 text-white/85">
                    {tile.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured event */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-20 md:px-10 lg:px-[7.33%]">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading
            eyebrow="Upcoming sermons & events"
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
                <Button href="/sermons" variant="dark">
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
              href="/sermons"
              className="inline-flex items-center gap-3 font-display text-lg text-navy transition hover:text-burgundy sm:text-2xl"
            >
              View all Sermons
              <Image src="/icons/arrow.svg" alt="" width={24} height={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Serve quote */}
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
        <Image
          src="/images/hero-cathedral.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-10 lg:px-[7.33%]">
          <div className="relative max-w-[520px] bg-white p-6 sm:p-10 md:p-14">
            <Image
              src="/icons/quote.svg"
              alt=""
              width={120}
              height={90}
              className="absolute right-4 top-4 w-16 opacity-70 sm:right-8 sm:top-8 sm:w-[120px]"
            />
            <h2 className="relative max-w-[360px] pr-12 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-navy sm:pr-0 sm:text-3xl md:text-[40px] md:leading-[52px]">
              We want to serve the world around us
            </h2>
            <div className="relative mt-6 sm:mt-8">
              <Button href="/contact">Visit</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section
        id="blog"
        className="bg-white px-4 py-14 sm:px-6 sm:py-20 md:px-10 lg:px-[7.33%]"
      >
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading
            eyebrow="Read our Blog"
            title="Share, inspire, innovate"
          />
          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <article
                key={post.title}
                className={`flex min-h-[300px] flex-col bg-cream p-6 sm:min-h-[340px] sm:p-8 ${
                  post.featured ? "border-b-4 border-primary" : ""
                }`}
              >
                <p className="bg-gradient-to-r from-[#a54e2b] to-[#dc9853] bg-clip-text font-display text-xs font-bold uppercase tracking-[0.08em] text-transparent">
                  {post.category}
                </p>
                <h3 className="mt-4 font-display text-xl font-bold uppercase leading-snug tracking-tight text-navy sm:text-2xl">
                  {post.title}
                </h3>
                <p className="mt-4 flex-1 font-display text-base leading-6 text-navy/80">
                  {post.excerpt}
                </p>
                <div className="mt-6 border-t border-navy/10 pt-4 font-display text-sm text-navy/70">
                  <p>By {post.author}</p>
                  <p className="mt-1">{post.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
