"use client";

import { useActionState } from "react";
import { sendEnquiry, type EnquiryState } from "@/app/contact/actions";
import { Button } from "./Button";

const initialState: EnquiryState = { status: "idle" };

const inputClass =
  "w-full border border-ink/15 bg-paper px-5 py-4 text-base text-ink outline-none transition placeholder:text-ink/40 focus:border-burgundy aria-[invalid=true]:border-burgundy";

type FieldProps = {
  id: "name" | "email" | "subject" | "message";
  label: string;
  optional?: boolean;
  errors?: string[];
  children: React.ReactNode;
};

function Field({ id, label, optional, errors, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-ink/60">
        {label}
        {optional ? <span className="ml-2 normal-case tracking-normal text-ink/40">(optional)</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {errors?.length ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-burgundy">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="border-l-2 border-burgundy bg-cream p-8 sm:p-10">
        <p className="eyebrow text-burgundy">Message sent</p>
        <p className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink">
          Thank you for reaching out.
        </p>
        <p className="mt-4 text-base leading-7 text-ink/70">
          {state.message ?? "We have received your message and will be in touch soon."}
        </p>
      </div>
    );
  }

  const errors = state.errors ?? {};
  const values = state.values ?? {};

  return (
    <form action={formAction} noValidate className="space-y-6">
      <input type="hidden" name="enquiryType" value="General enquiry" />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Full name" errors={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="email" label="Email" errors={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="subject" label="Subject" optional errors={errors.subject}>
        <input
          id="subject"
          name="subject"
          type="text"
          defaultValue={values.subject ?? defaultSubject}
          aria-invalid={Boolean(errors.subject)}
          className={inputClass}
        />
      </Field>

      <Field id="message" label="Message" errors={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {state.status === "error" && state.message ? (
        <p role="alert" className="border-l-2 border-burgundy bg-burgundy/5 px-4 py-3 text-sm text-burgundy">
          {state.message}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
