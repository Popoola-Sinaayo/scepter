"use client";

import { useState } from "react";
import { registerAttendee } from "@/app/clay/actions";
import { ageRanges, clay, hearAboutOptions, yesNo } from "@/lib/clay";
import { countries } from "@/lib/countries";
import {
  ChoiceField,
  FormSection,
  Honeypot,
  Reveal,
  SelectField,
  TextAreaField,
  TextField,
} from "./FormFields";
import { RegistrationComplete, SubmitArea } from "./RegistrationShell";
import { useRegistrationForm } from "./useRegistrationForm";

export function AttendeeForm() {
  const { state, pending, formRef, resultRef, formAction, onSubmit, errors } =
    useRegistrationForm(registerAttendee);
  const [needsAccessibility, setNeedsAccessibility] = useState("");
  const [inGroup, setInGroup] = useState("");

  if (state.status === "success") {
    return (
      <RegistrationComplete
        resultRef={resultRef}
        eyebrow="Registration received"
        title={`Thank you for registering for ${clay.title}`}
        reference={state.reference}
      >
        <p>
          Your registration details have been received. Further information about the schedule and
          attendance arrangements will be communicated through your email.
        </p>
        <p>We look forward to welcoming you!</p>
      </RegistrationComplete>
    );
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="space-y-12">
      <Honeypot />

      <FormSection step="A" title="Personal information">
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
            hint="WhatsApp-enabled, if available. Include your country code."
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            errors={errors.phone}
          />
        </div>
        <div className="grid gap-9 sm:grid-cols-2">
          <TextField
            name="city"
            label="City and state of residence"
            autoComplete="address-level2"
            errors={errors.city}
          />
          <SelectField
            name="country"
            label="Country of residence"
            options={countries}
            placeholder="Select your country"
            errors={errors.country}
          />
        </div>
        <div className="grid gap-9 sm:grid-cols-2">
          <SelectField
            name="ageRange"
            label="Age range"
            requirement="recommended"
            options={ageRanges}
            placeholder="Select your age range"
            errors={errors.ageRange}
          />
        </div>
        <ChoiceField
          name="heardAbout"
          label="How did you hear about CLAY Conference?"
          options={hearAboutOptions}
          layout="grid"
          errors={errors.heardAbout}
        />
      </FormSection>

      <FormSection step="B" title="Attendance and logistics">
        <ChoiceField
          name="withChildren"
          label="Will you be attending with children?"
          options={yesNo}
          errors={errors.withChildren}
        />
        <ChoiceField
          name="needsAccessibility"
          label="Will you require any accessibility assistance?"
          options={yesNo}
          onChange={(value) => setNeedsAccessibility(value)}
          errors={errors.needsAccessibility}
        >
          <Reveal show={needsAccessibility === "Yes"}>
            <TextField
              name="accessibilityDetails"
              label="What assistance would be helpful?"
              maxLength={500}
              errors={errors.accessibilityDetails}
            />
          </Reveal>
        </ChoiceField>
        <ChoiceField
          name="futureUpdates"
          label="Are you interested in receiving information about future programmes from The Scepter Christian Ministries?"
          requirement="optional"
          options={yesNo}
          errors={errors.futureUpdates}
        />
      </FormSection>

      <FormSection step="C" title="Conference-specific information">
        <ChoiceField
          name="firstTime"
          label="Is this your first time attending a programme organised by The Scepter Christian Ministries?"
          requirement="optional"
          options={yesNo}
          errors={errors.firstTime}
        />
        <ChoiceField
          name="inGroup"
          label="Are you attending as part of a church, ministry or organised group?"
          requirement="optional"
          options={yesNo}
          onChange={(value) => setInGroup(value)}
          errors={errors.inGroup}
        >
          <Reveal show={inGroup === "Yes"}>
            <TextField
              name="groupName"
              label="What is the name of your church, ministry or group?"
              errors={errors.groupName}
            />
          </Reveal>
        </ChoiceField>
        <TextAreaField
          name="arrangements"
          label="Are there any specific arrangements you would like the conference team to be aware of?"
          requirement="optional"
          errors={errors.arrangements}
        />
      </FormSection>

      <SubmitArea pending={pending} message={state.message} label="Complete registration" />
    </form>
  );
}
