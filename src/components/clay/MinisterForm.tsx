"use client";

import { registerMinister } from "@/app/claycon/actions";
import { clay, ministerCompanions } from "@/lib/clay";
import { ChoiceField, FormSection, Honeypot, TextField } from "./FormFields";
import { RegistrationComplete, SubmitArea } from "./RegistrationShell";
import { useRegistrationForm } from "./useRegistrationForm";

export function MinisterForm() {
  const { state, pending, formRef, resultRef, formAction, onSubmit, errors } =
    useRegistrationForm(registerMinister);

  if (state.status === "success") {
    return (
      <RegistrationComplete
        resultRef={resultRef}
        eyebrow="Ministers' registration received"
        title={`Thank you for registering for ${clay.title}`}
        reference={state.reference}
        audience="minister"
      >
        <p>
          We appreciate your ministry and your interest in joining us. Your information has been
          received and will be used to coordinate your registration and relevant conference
          arrangements.
        </p>
        <p>
          Any official assignment or special arrangement will be communicated separately by the
          organising team.
        </p>
      </RegistrationComplete>
    );
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="space-y-12">
      <Honeypot />

      <FormSection step="A" title="Your details">
        <div className="grid gap-9 sm:grid-cols-[1fr_2fr]">
          <TextField
            name="title"
            label="Title"
            placeholder="e.g. Pastor, Bishop, Rev."
            maxLength={80}
            errors={errors.title}
          />
          <TextField name="fullName" label="Full name" autoComplete="name" errors={errors.fullName} />
        </div>
        <TextField
          name="ministry"
          label="Church or ministry"
          autoComplete="organization"
          errors={errors.ministry}
        />
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
            hint="WhatsApp-enabled, if available. Include your country code."
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            errors={errors.phone}
          />
        </div>
        <ChoiceField
          name="companions"
          label="Will anyone be coming with you?"
          hint="Select all that apply."
          type="checkbox"
          layout="grid"
          options={ministerCompanions}
          errors={errors.companions}
        />
        <TextField
          name="socialHandle"
          label="Social media handle"
          hint="For example, @yourname on Instagram."
          requirement="optional"
          errors={errors.socialHandle}
        />
      </FormSection>

      <SubmitArea pending={pending} message={state.message} label="Submit ministers' registration" />
    </form>
  );
}
