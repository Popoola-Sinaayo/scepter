import type { ReactNode, Ref } from "react";
import { Button } from "@/components/Button";
import { clay } from "@/lib/clay";
import { site } from "@/lib/site";

export function RegistrationComplete({
  resultRef,
  eyebrow,
  title,
  reference,
  children,
}: {
  resultRef: Ref<HTMLDivElement>;
  eyebrow: string;
  title: string;
  reference?: string;
  children: ReactNode;
}) {
  return (
    <div
      ref={resultRef}
      role="status"
      className="scroll-mt-28 border-l-2 border-burgundy bg-cream p-8 sm:p-12"
    >
      <p className="eyebrow text-burgundy">{eyebrow}</p>
      <p className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">{title}</p>
      <div className="mt-5 space-y-4 text-base leading-7 text-ink/75">{children}</div>
      {clay.dates || clay.venue ? (
        <dl className="mt-6 grid gap-4 border-t border-ink/10 pt-6 sm:grid-cols-2">
          {clay.dates ? (
            <div>
              <dt className="eyebrow text-ink/50">Date</dt>
              <dd className="mt-1 font-serif text-xl font-semibold text-ink">{clay.dates}</dd>
            </div>
          ) : null}
          {clay.venue ? (
            <div>
              <dt className="eyebrow text-ink/50">Venue</dt>
              <dd className="mt-1 font-serif text-xl font-semibold text-ink">{clay.venue}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
      {reference ? (
        <p className="mt-6 text-sm text-ink/60">
          Your reference: <span className="font-bold tracking-wider text-ink">{reference}</span>
        </p>
      ) : null}
      <div className="mt-8">
        <Button href="/clay" variant="outline">
          Back to CLAY 2026
        </Button>
      </div>
    </div>
  );
}

export function SubmitArea({
  pending,
  message,
  label,
}: {
  pending: boolean;
  message?: string;
  label: string;
}) {
  return (
    <div className="space-y-6 border-t border-ink/10 pt-10">
      <p className="text-sm leading-6 text-ink/55">
        <strong className="font-bold text-ink/70">Privacy notice.</strong> The information you provide is
        used by {site.legalName} only to organise this conference and communicate with you about it (and,
        if you opt in, about future programmes). It is stored securely, accessed only by the conference
        team and never sold or shared with third parties. To update or remove your details, email{" "}
        <a href={`mailto:${site.email}`} className="underline underline-offset-2 hover:text-burgundy">
          {site.email}
        </a>
        .
      </p>
      {message ? (
        <p
          role="alert"
          className="border-l-2 border-burgundy bg-burgundy/5 px-4 py-3 text-sm text-burgundy"
        >
          {message}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Submitting…" : label}
      </Button>
    </div>
  );
}
