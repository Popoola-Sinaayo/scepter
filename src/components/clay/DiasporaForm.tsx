"use client";

import { registerDiaspora } from "@/app/claycon/actions";
import { clay } from "@/lib/clay";
import { countries } from "@/lib/countries";
import { FormSection, Honeypot, SelectField, TextField } from "./FormFields";
import { RegistrationComplete, SubmitArea } from "./RegistrationShell";
import { useRegistrationForm } from "./useRegistrationForm";

export function DiasporaForm() {
  const { state, pending, formRef, resultRef, formAction, onSubmit, errors } =
    useRegistrationForm(registerDiaspora);

  if (state.status === "success") {
    return (
      <RegistrationComplete
        resultRef={resultRef}
        eyebrow="Diaspora registration received"
        title={`Thank you for registering for ${clay.title}`}
        reference={state.reference}
        audience="diaspora"
      >
        <p>
          Thank you for travelling to be with us. A confirmation has been sent to your email, and
          further details about the day will follow.
        </p>
      </RegistrationComplete>
    );
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="space-y-12">
      <Honeypot />

      <FormSection step="A" title="Your details">
        <TextField name="fullName" label="Full name" autoComplete="name" errors={errors.fullName} />
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
            hint="WhatsApp-enabled, with your country code."
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            errors={errors.phone}
          />
        </div>
        <div className="grid gap-9 sm:grid-cols-2">
          <SelectField
            name="country"
            label="Country you live in"
            options={countries}
            placeholder="Select your country"
            errors={errors.country}
          />
          <TextField
            name="partySize"
            label="How many people are travelling?"
            hint="Including you."
            type="number"
            inputMode="numeric"
            min={1}
            max={50}
            errors={errors.partySize}
          />
        </div>
      </FormSection>

      <SubmitArea pending={pending} message={state.message} label="Submit registration" />
    </form>
  );
}
