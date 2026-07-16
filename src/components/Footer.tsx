import Link from "next/link";
import Image from "next/image";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { quickLinks, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid w-full max-w-[1500px] gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:px-10 lg:grid-cols-[1.2fr_0.8fr_0.7fr_1.6fr] lg:gap-10 lg:px-[7.33%] lg:py-16">
        <div>
          <Logo variant="accent" />
          <p className="mt-4 font-display text-xs uppercase text-white/80">
            © Copyright The Scepter {site.copyrightYear}
          </p>
          <div className="mt-6 space-y-2 font-display text-xs uppercase text-white/90">
            <p>{site.phone}</p>
            <p>{site.address}</p>
            <a
              href={`mailto:${site.email}`}
              className="block break-all transition hover:text-primary"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="contents max-sm:grid max-sm:grid-cols-2 max-sm:gap-8">
          <div>
            <p className="font-display text-base text-primary">Quicklinks</p>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-xs uppercase text-white/80 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-base text-primary">Connect</p>
            <div className="mt-4 flex items-center gap-4">
              <a
                href={site.social.facebook}
                aria-label="Facebook"
                className="relative size-5 overflow-hidden sm:size-4"
              >
                <Image
                  src="/icons/facebook.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </a>
              <a
                href={site.social.twitter}
                aria-label="Twitter"
                className="relative size-5 overflow-hidden sm:size-4"
              >
                <Image
                  src="/icons/twitter.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </a>
              <a
                href={site.social.linkedin}
                aria-label="LinkedIn"
                className="relative size-5 overflow-hidden sm:size-4"
              >
                <Image
                  src="/icons/linkedin.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="max-w-[360px] font-display text-xl font-bold uppercase leading-tight tracking-tight text-white sm:text-2xl md:text-[32px] md:leading-[44px]">
            Subscribe to get latest updates and news
          </h2>
          <form
            className="mt-6 flex flex-col gap-3 sm:relative sm:block"
            action="#"
            method="post"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              name="email"
              placeholder="Yourmail@gmail.com"
              className="h-14 w-full rounded-xl border border-white/15 bg-transparent px-5 font-display text-base text-white placeholder:text-white/80 outline-none focus:border-primary sm:h-[64px] sm:pr-40"
            />
            <Button
              type="submit"
              className="h-14 w-full !rounded-xl sm:absolute sm:right-0 sm:top-0 sm:h-[64px] sm:w-auto"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
}
