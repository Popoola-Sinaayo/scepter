"use client";

import { useState } from "react";
import { registerVolunteer } from "@/app/clay/actions";
import {
  ageRanges,
  clay,
  maxVolunteerDepartments,
  volunteerDays,
  volunteerDepartments,
  yesNo,
  yesNoDepends,
  yesNoNotApplicable,
} from "@/lib/clay";
import {
  ChoiceField,
  ConsentField,
  FormSection,
  Honeypot,
  Reveal,
  SelectField,
  TextAreaField,
  TextField,
} from "./FormFields";
import { RegistrationComplete, SubmitArea } from "./RegistrationShell";
import { useRegistrationForm } from "./useRegistrationForm";

export function VolunteerForm() {
  const { state, pending, formRef, resultRef, formAction, onSubmit, errors } =
    useRegistrationForm(registerVolunteer);
  const [volunteeredBefore, setVolunteeredBefore] = useState("");
  const [departments, setDepartments] = useState<string[]>([]);

  function toggleDepartment(value: string, checked: boolean) {
    setDepartments((current) => (checked ? [...current, value] : current.filter((v) => v !== value)));
  }

  if (state.status === "success") {
    return (
      <RegistrationComplete
        resultRef={resultRef}
        eyebrow="Volunteer registration received"
        title={`Thank you for your willingness to serve at ${clay.title}`}
        reference={state.reference}
      >
        <p>
          Your volunteer registration has been received. Our volunteer coordination team will review
          your preferences, skills and availability and communicate the next steps.
        </p>
        <p>We appreciate your heart to serve and look forward to connecting with you!</p>
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
          <SelectField
            name="ageRange"
            label="Age range"
            options={ageRanges}
            placeholder="Select your age range"
            errors={errors.ageRange}
          />
          <TextField
            name="city"
            label="City and area of residence"
            autoComplete="address-level2"
            errors={errors.city}
          />
        </div>
        <div className="grid gap-9 sm:grid-cols-2">
          <TextField
            name="church"
            label="Church or ministry affiliation"
            requirement="recommended"
            errors={errors.church}
          />
          <TextField
            name="churchReference"
            label="Name of your church leader or reference"
            hint="If applicable."
            requirement="optional"
            errors={errors.churchReference}
          />
        </div>
        <ChoiceField
          name="volunteeredBefore"
          label="Have you volunteered at a church programme or event before?"
          options={yesNo}
          onChange={(value) => setVolunteeredBefore(value)}
          errors={errors.volunteeredBefore}
        >
          <Reveal show={volunteeredBefore === "Yes"}>
            <TextAreaField
              name="experience"
              label="Briefly describe your experience."
              errors={errors.experience}
            />
          </Reveal>
        </ChoiceField>
      </FormSection>

      <FormSection step="B" title="Department and skills">
        <ChoiceField
          name="departments"
          label="Which department would you be interested in serving with?"
          hint={`Select up to ${maxVolunteerDepartments} preferred departments.`}
          type="checkbox"
          layout="grid"
          options={volunteerDepartments}
          selected={departments}
          maxSelected={maxVolunteerDepartments}
          onChange={toggleDepartment}
          errors={errors.departments}
        />
        <TextField
          name="otherArea"
          label="Is there another area you would like to serve in that is not listed? Please specify."
          requirement="optional"
          errors={errors.otherArea}
        />
        <TextAreaField
          name="otherSkills"
          label="Do you have any other skills, qualifications or areas of expertise that could be useful to CLAY Conference beyond your selected department?"
          requirement="optional"
          errors={errors.otherSkills}
        />
        <TextAreaField
          name="skillsDescription"
          label="Briefly describe what relevant skills or experiences you have for the department you selected."
          requirement="optional"
          errors={errors.skillsDescription}
        />
      </FormSection>

      <FormSection step="C" title="Availability and commitment">
        <ChoiceField
          name="availableDays"
          label="Which days are you available to serve?"
          hint="Select all that apply."
          type="checkbox"
          layout="grid"
          options={volunteerDays}
          errors={errors.availableDays}
        />
        <ChoiceField
          name="trainingAvailability"
          label="Are you available for pre-conference meetings or training?"
          options={yesNoDepends}
          errors={errors.trainingAvailability}
        />
        <ChoiceField
          name="setupAvailability"
          label="Are you available for venue setup before the conference?"
          options={yesNoDepends}
          errors={errors.setupAvailability}
        />
        <ChoiceField
          name="cleanupAvailability"
          label="Are you available for post-event cleanup and pack-down?"
          options={yesNoDepends}
          errors={errors.cleanupAvailability}
        />
        <TextAreaField
          name="schedulingConstraints"
          label="Do you have any scheduling constraints the team should know about?"
          requirement="optional"
          errors={errors.schedulingConstraints}
        />
      </FormSection>

      <FormSection step="D" title="Volunteer conduct and safeguarding">
        <ChoiceField
          name="followGuidelines"
          label="Are you willing to follow the conference's volunteer guidelines and instructions from your assigned team lead?"
          options={yesNo}
          errors={errors.followGuidelines}
        />
        <ChoiceField
          name="attendOrientation"
          label="Are you willing to attend required volunteer orientation or briefing sessions?"
          options={yesNo}
          errors={errors.attendOrientation}
        />
        <ChoiceField
          name="collaborate"
          label="Are you willing to work collaboratively with other volunteers and maintain respectful conduct?"
          options={yesNo}
          errors={errors.collaborate}
        />
        <ChoiceField
          name="safeguarding"
          label="If assigned to a role involving children or other vulnerable people, are you willing to complete the ministry's required safeguarding checks and training?"
          options={yesNoNotApplicable}
          errors={errors.safeguarding}
        />
        <TextAreaField
          name="assignmentInfo"
          label="Is there any additional information that would help us assign you appropriately?"
          requirement="optional"
          errors={errors.assignmentInfo}
        />
      </FormSection>

      <FormSection step="E" title="Final confirmation">
        <TextAreaField
          name="anythingElse"
          label="Is there anything else you would like the volunteer coordination team to know?"
          requirement="optional"
          errors={errors.anythingElse}
        />
        <ConsentField
          name="consent"
          errors={errors.consent}
          statement="I confirm that the information provided is accurate and understand that submitting this form does not guarantee volunteer placement. I consent to the use of my information for volunteer selection, coordination and conference-related communication, as explained in the privacy notice below."
        />
      </FormSection>

      <SubmitArea pending={pending} message={state.message} label="Submit volunteer registration" />
    </form>
  );
}
