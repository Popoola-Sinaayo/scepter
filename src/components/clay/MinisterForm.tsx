"use client";

import { useState } from "react";
import { registerMinister } from "@/app/claycon/actions";
import {
  accessibilityOptions,
  attendanceReasons,
  clay,
  communicationMethods,
  genders,
  inPersonOptions,
  leadershipScopes,
  leadershipSizes,
  ministerDesignations,
  ministerRegistrationTypes,
  ministerServingAreas,
  ministryAreas,
  ministryGrowthAreas,
  participationModes,
  partyTypes,
  yearsInMinistry,
  yearsInPosition,
  yesNo,
  yesNoNotApplicable,
} from "@/lib/clay";
import { countries } from "@/lib/countries";
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

export function MinisterForm() {
  const { state, pending, formRef, resultRef, formAction, onSubmit, errors } =
    useRegistrationForm(registerMinister);
  const [registrationType, setRegistrationType] = useState("");
  const [designation, setDesignation] = useState("");
  const [hasWebsite, setHasWebsite] = useState("");
  const [nominated, setNominated] = useState("");
  const [participation, setParticipation] = useState("");
  const [receivedCommunication, setReceivedCommunication] = useState("");
  const [party, setParty] = useState("");
  const [travelling, setTravelling] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [protocol, setProtocol] = useState("");

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

      <FormSection step="A" title="Personal information">
        <div className="grid gap-9 sm:grid-cols-2">
          <TextField
            name="fullName"
            label="Full name and title"
            hint="For example, Pastor John Adeyemi."
            autoComplete="name"
            maxLength={160}
            errors={errors.fullName}
          />
          <TextField
            name="preferredName"
            label="Preferred name for conference identification"
            requirement="optional"
            errors={errors.preferredName}
          />
        </div>
        <ChoiceField
          name="gender"
          label="Gender"
          requirement="optional"
          options={genders}
          errors={errors.gender}
        />
        <div className="grid gap-9 sm:grid-cols-2">
          <TextField
            name="phone"
            label="Phone number"
            hint="Include your country code."
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            errors={errors.phone}
          />
          <TextField
            name="whatsapp"
            label="WhatsApp number, if different"
            requirement="optional"
            type="tel"
            inputMode="tel"
            errors={errors.whatsapp}
          />
        </div>
        <TextField
          name="email"
          label="Email address"
          type="email"
          autoComplete="email"
          inputMode="email"
          errors={errors.email}
        />
        <div className="grid gap-9 sm:grid-cols-2">
          <SelectField
            name="country"
            label="Country of residence"
            options={countries}
            placeholder="Select your country"
            errors={errors.country}
          />
          <TextField
            name="city"
            label="State and city of residence"
            autoComplete="address-level2"
            errors={errors.city}
          />
        </div>
        <ChoiceField
          name="registrationType"
          label="Are you registering as an individual minister or as part of a ministry/church delegation?"
          options={ministerRegistrationTypes}
          layout="stack"
          onChange={(value) => setRegistrationType(value)}
          errors={errors.registrationType}
        >
          <Reveal show={registrationType === "Part of a church or ministry delegation"}>
            <TextField
              name="delegationName"
              label="What is the name of the group?"
              errors={errors.delegationName}
            />
          </Reveal>
        </ChoiceField>
      </FormSection>

      <FormSection step="B" title="Ministerial identity and leadership level">
        <ChoiceField
          name="designation"
          label="What is your current ministerial designation or leadership office?"
          hint="These categories are intended to accommodate different church traditions. They are not a ranking of spiritual authority."
          options={ministerDesignations}
          layout="grid"
          onChange={(value) => setDesignation(value)}
          errors={errors.designation}
        >
          <Reveal show={designation === "Other"}>
            <TextField
              name="designationOther"
              label="Please specify your designation."
              errors={errors.designationOther}
            />
          </Reveal>
        </ChoiceField>
        <div className="grid gap-9 sm:grid-cols-2">
          <TextField
            name="organisation"
            label="Name of your church, ministry or Christian organisation"
            errors={errors.organisation}
          />
          <TextField
            name="denomination"
            label="Denomination or Christian tradition, if applicable"
            requirement="optional"
            errors={errors.denomination}
          />
        </div>
        <TextAreaField
          name="currentRole"
          label="Your current ministry role and primary responsibilities"
          errors={errors.currentRole}
        />
        <ChoiceField
          name="yearsInMinistry"
          label="How long have you served in ministry or Christian leadership?"
          options={yearsInMinistry}
          layout="grid"
          errors={errors.yearsInMinistry}
        />
        <ChoiceField
          name="yearsInPosition"
          label="How long have you served in your current leadership position?"
          requirement="optional"
          options={yearsInPosition}
          layout="grid"
          errors={errors.yearsInPosition}
        />
        <ChoiceField
          name="leadershipScope"
          label="What is your current scope of leadership?"
          options={leadershipScopes}
          layout="grid"
          errors={errors.leadershipScope}
        />
        <ChoiceField
          name="leadershipSize"
          label="If relevant, approximately how many people or congregations are within your current leadership responsibility?"
          requirement="optional"
          options={leadershipSizes}
          layout="grid"
          errors={errors.leadershipSize}
        />
      </FormSection>

      <FormSection step="C" title="Ministry background and area of service">
        <ChoiceField
          name="ministryAreas"
          label="Which areas of ministry do you currently serve in?"
          hint="Select all that apply."
          type="checkbox"
          options={ministryAreas}
          layout="grid"
          errors={errors.ministryAreas}
        />
        <TextAreaField
          name="ministryFocus"
          label="Briefly describe your ministry's central focus, vision or assignment."
          errors={errors.ministryFocus}
        />
        <TextAreaField
          name="responsibilities"
          label="What are the principal responsibilities of your current ministry office?"
          errors={errors.responsibilities}
        />
        <TextAreaField
          name="initiatives"
          label="What ministry initiatives, programmes or projects are you currently involved in?"
          requirement="optional"
          errors={errors.initiatives}
        />
        <ChoiceField
          name="growthAreas"
          label="What are the main areas of ministry growth or development you are currently pursuing?"
          hint="Select all that apply."
          requirement="optional"
          type="checkbox"
          options={ministryGrowthAreas}
          layout="grid"
          errors={errors.growthAreas}
        />
        <ChoiceField
          name="hasWebsite"
          label="Is there a public website or social media page for your church or ministry?"
          requirement="optional"
          options={yesNo}
          onChange={(value) => setHasWebsite(value)}
          errors={errors.hasWebsite}
        >
          <Reveal show={hasWebsite === "Yes"}>
            <TextField
              name="websiteLink"
              label="Please provide the link, if available."
              requirement="optional"
              maxLength={300}
              errors={errors.websiteLink}
            />
          </Reveal>
        </ChoiceField>
      </FormSection>

      <FormSection step="D" title="Ministerial reference and verification">
        <div className="grid gap-9 sm:grid-cols-2">
          <TextField
            name="referenceName"
            label="Name of your senior pastor, supervising minister or ministry leader"
            requirement="optional"
            errors={errors.referenceName}
          />
          <TextField
            name="referenceDesignation"
            label="Their designation and ministry/organisation"
            requirement="optional"
            errors={errors.referenceDesignation}
          />
        </div>
        <TextField
          name="referenceContact"
          label="Their contact information"
          requirement="optional"
          errors={errors.referenceContact}
        />
        <ChoiceField
          name="officiallyNominated"
          label="Are you attending as an officially nominated or delegated representative of your church or ministry?"
          options={yesNoNotApplicable}
          onChange={(value) => setNominated(value)}
          errors={errors.officiallyNominated}
        >
          <Reveal show={nominated === "Yes"}>
            <TextField
              name="nominatedBy"
              label="Who authorised or nominated you to represent the organisation?"
              errors={errors.nominatedBy}
            />
          </Reveal>
        </ChoiceField>
        <ChoiceField
          name="willingToConfirm"
          label="Would you be willing to provide further information if the organising team needs to confirm an official ministry delegation or role?"
          options={yesNoNotApplicable}
          errors={errors.willingToConfirm}
        />
      </FormSection>

      <FormSection step="E" title="Conference purpose and expectations">
        <ChoiceField
          name="attendanceReasons"
          label={`What is your primary reason for attending ${clay.title}?`}
          hint="Select all that apply."
          type="checkbox"
          options={attendanceReasons}
          layout="grid"
          errors={errors.attendanceReasons}
        />
        <TextAreaField
          name="hopes"
          label="What do you hope to receive, learn or take away from this conference?"
          errors={errors.hopes}
        />
        <TextAreaField
          name="themeRelevance"
          label="Which aspects of the conference theme, EMERGENCE, are particularly relevant to your current season of ministry?"
          requirement="optional"
          errors={errors.themeRelevance}
        />
        <TextAreaField
          name="subjects"
          label="Are there particular ministry or leadership subjects you would appreciate the opportunity to engage with during the conference?"
          requirement="optional"
          errors={errors.subjects}
        />
        <ChoiceField
          name="futureInfo"
          label="Would you be interested in receiving information about future ministry gatherings, leadership programmes or initiatives organised by The Scepter Christian Ministries?"
          requirement="optional"
          options={yesNo}
          errors={errors.futureInfo}
        />
      </FormSection>

      <FormSection step="F" title="Participation and official assignments">
        <ChoiceField
          name="participation"
          label="Are you attending solely as a participant, or would you also be interested in serving if the conference team has a suitable need?"
          options={participationModes}
          layout="stack"
          onChange={(value) => setParticipation(value)}
          errors={errors.participation}
        >
          <Reveal show={participation === "Open to serving if invited"}>
            <ChoiceField
              name="servingAreas"
              label="Which area best matches your experience?"
              hint="Select all that apply."
              type="checkbox"
              options={ministerServingAreas}
              layout="grid"
              errors={errors.servingAreas}
            />
          </Reveal>
          <Reveal show={participation === "Already assigned an official role"}>
            <TextAreaField
              name="assignmentDetails"
              label="Please state the role and the name of the person who confirmed it."
              errors={errors.assignmentDetails}
            />
          </Reveal>
        </ChoiceField>
        <ChoiceField
          name="receivedCommunication"
          label="Have you received any official communication from the conference team regarding a speaking, ministering or leadership assignment?"
          options={yesNoNotApplicable}
          onChange={(value) => setReceivedCommunication(value)}
          errors={errors.receivedCommunication}
        >
          <Reveal show={receivedCommunication === "Yes"}>
            <TextAreaField
              name="communicationDetails"
              label="Please provide the name of the conference contact and any relevant details."
              errors={errors.communicationDetails}
            />
          </Reveal>
        </ChoiceField>
        <TextAreaField
          name="coordinationNeeds"
          label="Is there any specific information or coordination you require from the conference team before the event?"
          requirement="optional"
          errors={errors.coordinationNeeds}
        />
      </FormSection>

      <FormSection step="G" title="Attendance and travel logistics">
        <ChoiceField
          name="inPerson"
          label="Will you attend in person?"
          options={inPersonOptions}
          errors={errors.inPerson}
        />
        <ChoiceField
          name="party"
          label="Are you attending alone or with a group?"
          options={partyTypes}
          layout="grid"
          onChange={(value) => setParty(value)}
          errors={errors.party}
        >
          <Reveal show={party !== "" && party !== "Alone"}>
            <div className="max-w-xs">
              <TextField
                name="partySize"
                label="Approximately how many people will be in your party?"
                type="number"
                inputMode="numeric"
                min={1}
                max={1000}
                errors={errors.partySize}
              />
            </div>
          </Reveal>
        </ChoiceField>
        <ChoiceField
          name="needsDirections"
          label="Will you require assistance with directions or locating the venue?"
          options={yesNo}
          errors={errors.needsDirections}
        />
        <ChoiceField
          name="travelling"
          label="Will you be travelling from outside the host city?"
          options={yesNo}
          onChange={(value) => setTravelling(value)}
          errors={errors.travelling}
        >
          <Reveal show={travelling === "Yes"}>
            <TextField
              name="travellingFrom"
              label="What city and state or country will you be travelling from?"
              errors={errors.travellingFrom}
            />
          </Reveal>
        </ChoiceField>
        <ChoiceField
          name="travelInfo"
          label="Would you like to be contacted about any officially organised travel or accommodation information, if such arrangements become available?"
          requirement="optional"
          options={yesNo}
          errors={errors.travelInfo}
        />
        <ChoiceField
          name="accessibility"
          label="Do you have any accessibility or mobility requirements that the conference team should consider?"
          options={accessibilityOptions}
          onChange={(value) => setAccessibility(value)}
          errors={errors.accessibility}
        >
          <Reveal show={accessibility === "Yes"}>
            <TextAreaField
              name="accessibilityDetails"
              label="Please briefly describe the assistance required."
              maxLength={500}
              errors={errors.accessibilityDetails}
            />
          </Reveal>
        </ChoiceField>
      </FormSection>

      <FormSection step="H" title="Protocol and communication">
        <ChoiceField
          name="protocolRequirement"
          label="Do you have a specific protocol or seating requirement that has already been communicated to the conference team?"
          options={yesNoNotApplicable}
          onChange={(value) => setProtocol(value)}
          errors={errors.protocolRequirement}
        >
          <Reveal show={protocol === "Yes"}>
            <TextAreaField
              name="protocolDetails"
              label="Please provide details and the name of the person coordinating the arrangement."
              errors={errors.protocolDetails}
            />
          </Reveal>
        </ChoiceField>
        <ChoiceField
          name="arrivalAssistance"
          label="Do you require any assistance with registration, accreditation or arrival coordination?"
          options={yesNo}
          errors={errors.arrivalAssistance}
        />
        <ChoiceField
          name="communicationMethod"
          label="Preferred means of communication for conference updates"
          options={communicationMethods}
          errors={errors.communicationMethod}
        />
        <TextField
          name="addressAs"
          label="Is there a preferred name or designation the team should use when communicating with you?"
          requirement="optional"
          errors={errors.addressAs}
        />
        <TextAreaField
          name="welcomeInfo"
          label="Is there any information that would help the team welcome you appropriately or coordinate your attendance?"
          requirement="optional"
          errors={errors.welcomeInfo}
        />
      </FormSection>

      <FormSection step="I" title="Consent and declaration">
        <ConsentField
          name="confirmAccurate"
          errors={errors.confirmAccurate}
          statement="I confirm that the information supplied is accurate to the best of my knowledge."
        />
        <ConsentField
          name="understandNoGuarantee"
          errors={errors.understandNoGuarantee}
          statement="I understand that this registration is for conference attendance and does not, by itself, confirm a speaking engagement, official assignment, reserved accommodation, transport or special protocol arrangement."
        />
        <ConsentField
          name="consentData"
          errors={errors.consentData}
          statement="I consent to the use of my registration information for conference administration, relevant event communication and attendance coordination."
        />
      </FormSection>

      <SubmitArea pending={pending} message={state.message} label="Submit ministers' registration" />
    </form>
  );
}
