"use client";

import { registerChildren } from "@/app/claycon/actions";
import { childAgeRanges, clay } from "@/lib/clay";
import { FormSection, Honeypot, inputClass, TextAreaField, TextField } from "./FormFields";
import { RegistrationComplete, SubmitArea } from "./RegistrationShell";
import { useRegistrationForm } from "./useRegistrationForm";

export function ChildrenForm() {
  const { state, pending, formRef, resultRef, formAction, onSubmit, errors } =
    useRegistrationForm(registerChildren);

  if (state.status === "success") {
    return (
      <RegistrationComplete
        resultRef={resultRef}
        eyebrow="Children's registration received"
        title="Thank you for registering your children"
        reference={state.reference}
        audience="child"
      >
        <p>
          This helps us prepare for the children at {clay.shortTitle}. A confirmation has been sent to
          your email, and further details about the day will follow.
        </p>
      </RegistrationComplete>
    );
  }

  const countErrors = [
    ...(errors.childCounts ?? []),
    ...childAgeRanges.flatMap(({ key }) => errors[key] ?? []),
  ];

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="space-y-12">
      <Honeypot />

      <FormSection step="A" title="Parent or guardian">
        <TextField name="fullName" label="Your full name" autoComplete="name" errors={errors.fullName} />
        <div className="grid gap-9 sm:grid-cols-2">
          <TextField
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            inputMode="email"
            errors={errors.email}
          />
          <TextField
            name="phone"
            label="Phone number"
            hint="WhatsApp-enabled, if available."
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            errors={errors.phone}
          />
        </div>
      </FormSection>

      <FormSection step="B" title="Your children">
        <fieldset data-invalid={countErrors.length ? "" : undefined}>
          <legend className="block text-[1.0625rem] font-bold leading-snug text-ink">
            How many children are coming in each age range?
            <span aria-hidden className="ml-1 text-burgundy">
              *
            </span>
          </legend>
          <p className="mt-1 text-sm leading-6 text-ink/55">Leave a range empty if none.</p>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {childAgeRanges.map(({ key, label }) => (
              <label key={key} htmlFor={key} className="block">
                <span className="text-sm font-bold text-ink/70">{label}</span>
                <input
                  id={key}
                  name={key}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={20}
                  placeholder="0"
                  aria-invalid={countErrors.length > 0}
                  aria-describedby={countErrors.length ? "childCounts-error" : undefined}
                  className={`${inputClass} mt-2`}
                />
              </label>
            ))}
          </div>
          {countErrors.length ? (
            <p id="childCounts-error" className="mt-2 text-sm text-burgundy">
              {countErrors[0]}
            </p>
          ) : null}
        </fieldset>
        <TextAreaField
          name="notes"
          label="Allergies or special needs"
          hint="Anything the children's team should know."
          requirement="optional"
          rows={3}
          maxLength={500}
          errors={errors.notes}
        />
      </FormSection>

      <SubmitArea pending={pending} message={state.message} label="Register children" />
    </form>
  );
}
