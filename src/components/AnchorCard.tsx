import Link from "next/link";
import type { Scripture } from "@/lib/content";

type AnchorCardProps = {
  number: string;
  title: string;
  theme: string;
  scripture: Scripture;
  summary: string;
  href: string;
};

export function AnchorCard({
  number,
  title,
  theme,
  scripture,
  summary,
  href,
}: AnchorCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col border border-ink/10 bg-paper p-7 transition duration-300 hover:-translate-y-1 hover:border-burgundy/40 hover:shadow-[0_20px_40px_-24px_rgba(20,22,28,0.35)] sm:p-8"
    >
      <span className="font-serif text-5xl font-semibold leading-none text-burgundy/80">
        {number}
      </span>
      <p className="eyebrow mt-6 text-ink/50">{theme}</p>
      <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-ink sm:text-3xl">
        {title}
      </h3>
      <p className="eyebrow mt-4 text-burgundy">{scripture.reference}</p>
      <p className="mt-4 flex-1 text-base leading-7 text-ink/70">{summary}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-burgundy">
        Read more
        <span aria-hidden className="transition duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </span>
    </Link>
  );
}
