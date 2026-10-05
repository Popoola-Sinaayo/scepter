import Link from "next/link";
import { Logo } from "./Logo";
import { SocialIcon } from "./SocialIcon";
import { SubscribeForm } from "./SubscribeForm";
import { quickLinks, site, socialLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.3fr_0.7fr_1.4fr] lg:gap-16 lg:px-12">
        <div>
          <Logo variant="light" />
          <p className="mt-6 max-w-sm font-serif text-xl italic leading-snug text-cream/80">
            &ldquo;A chosen generation, a royal priesthood, a holy nation.&rdquo;
          </p>
          <p className="eyebrow mt-2 text-cream/50">1 Peter 2:9</p>
          <div className="mt-8 space-y-2 text-sm text-cream/75">
            <a
              href={`mailto:${site.email}`}
              className="block break-all transition hover:text-cream"
            >
              {site.email}
            </a>
            {site.phone ? <p>{site.phone}</p> : null}
            {site.location ? <p>{site.location}</p> : null}
          </div>
          {socialLinks.length > 0 ? (
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-cream/70 transition hover:text-cream"
                >
                  <SocialIcon name={link.key} />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <p className="eyebrow text-cream/50">Explore</p>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm uppercase tracking-[0.12em] text-cream/80 transition hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <p className="eyebrow text-cream/50">Stay connected</p>
          <h2 className="mt-4 max-w-md font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            Receive teachings and gathering updates.
          </h2>
          <SubscribeForm />
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-6 text-xs uppercase tracking-[0.12em] text-cream/50 sm:flex-row sm:justify-between sm:px-8 lg:px-12">
          <p>
            © {site.copyrightYear} {site.legalName}
          </p>
          <p>Building for centuries.</p>
        </div>
      </div>
    </footer>
  );
}
