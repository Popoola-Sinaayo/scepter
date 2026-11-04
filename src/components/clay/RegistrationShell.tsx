import type { ReactNode, Ref } from "react";
import { Button } from "@/components/Button";
import { clay, type RegistrationAudience } from "@/lib/clay";
import { site } from "@/lib/site";

/** After one form, invite people to the other one. */
const crossInvite = {
  attendee: {
    eyebrow: "Serve with us",
    body: `Would you also like to volunteer at ${clay.shortTitle}? Register to serve in one of our departments.`,
    href: "/claycon/volunteer",
    label: "Register to volunteer",
  },
  volunteer: {
    eyebrow: "Attend the conference",
    body: `Have you registered to attend ${clay.shortTitle}? Register so we can prepare for you.`,
    href: "/claycon/register",
    label: "Register to attend",
  },
} as const;

export function RegistrationComplete({
  resultRef,
  eyebrow,
  title,
  reference,
  audience,
  children,
}: {
  resultRef: Ref<HTMLDivElement>;
  eyebrow: string;
  title: string;
  reference?: string;
  /** Which form was completed: picks the WhatsApp community and the cross-invite. */
  audience: RegistrationAudience;
  children: ReactNode;
}) {
  const whatsappUrl = clay.whatsappUrls[audience];
  const invite = crossInvite[audience];

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
      <div className="mt-8 grid gap-4 border-t border-ink/10 pt-8 sm:grid-cols-2">
        {whatsappUrl ? (
          <div className="flex flex-col bg-paper p-6">
            <p className="eyebrow text-burgundy">Stay connected</p>
            <p className="mt-2 flex-1 text-base leading-7 text-ink/75">
              {audience === "volunteer"
                ? "Join the volunteers' WhatsApp community for updates and next steps."
                : "Would you like to join our WhatsApp community for closer updates about the conference?"}
            </p>
            <Button href={whatsappUrl} className="mt-5 self-start">
              Join on WhatsApp
            </Button>
          </div>
        ) : null}
        <div className="flex flex-col bg-paper p-6">
          <p className="eyebrow text-burgundy">{invite.eyebrow}</p>
          <p className="mt-2 flex-1 text-base leading-7 text-ink/75">{invite.body}</p>
          <Button href={invite.href} variant="outline" className="mt-5 self-start">
            {invite.label}
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <Button href="/claycon" variant="outline">
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
