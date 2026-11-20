"use client";

import { registerSenior } from "@/app/claycon/actions";
import { clay, seniorAgeRanges, yesNo } from "@/lib/clay";
import { ChoiceField, FormSection, Honeypot, TextAreaField, TextField } from "./FormFields";
import { RegistrationComplete, SubmitArea } from "./RegistrationShell";
import { useRegistrationForm } from "./useRegistrationForm";

export function SeniorForm() {
  const { state, pending, formRef, resultRef, formAction, onSubmit, errors } =
    useRegistrationForm(registerSenior);

  if (state.status === "success") {
    return (
      <RegistrationComplete
        resultRef={resultRef}
        eyebrow="Seniors' registration received"
        title={`Thank you for registering for ${clay.title}`}
        reference={state.reference}
        audience="senior"
      >
        <p>
          We are honoured to have you with us. A confirmation has been sent to the email address you
          gave, and further details about the day will follow.
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
            hint="Yours, or a family member's."
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
        <ChoiceField
          name="ageRange"
          label="Age range"
          options={seniorAgeRanges}
          errors={errors.ageRange}
        />
        <ChoiceField
          name="accompanied"
          label="Will someone be coming with you?"
          hint="For example, a family member or carer."
          options={yesNo}
          errors={errors.accompanied}
        />
        <TextAreaField
          name="assistance"
          label="Is there any assistance we can provide?"
          hint="For example, a wheelchair, help with steps, or seating close to the front."
          requirement="optional"
          rows={3}
          maxLength={500}
          errors={errors.assistance}
        />
      </FormSection>

      <SubmitArea pending={pending} message={state.message} label="Submit registration" />
    </form>
  );
}
