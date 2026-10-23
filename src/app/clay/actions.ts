"use server";

import { z } from "zod";
import {
  ageRanges,
  clay,
  hearAboutOptions,
  maxVolunteerDepartments,
  volunteerDays,
  volunteerDepartments,
  yesNo,
  yesNoDepends,
  yesNoNotApplicable,
} from "@/lib/clay";
import { isBrevoEmailConfigured, sendBrevoEmail } from "@/lib/brevo";
import { countries } from "@/lib/countries";
import { brandedEmail, emailConfig, escapeHtml, getResend } from "@/lib/email";
import { appendSheetRow, type SheetName, type SheetRow } from "@/lib/sheets";
import { site } from "@/lib/site";

type FieldErrors = Record<string, string[] | undefined>;

export type RegistrationState = {
  status: "idle" | "success" | "error";
  message?: string;
  reference?: string;
  errors?: FieldErrors;
};

const phonePattern = /^\+?[\d\s().-]{7,20}$/;

const field = {
  name: z.string().min(2, "Please enter your full name.").max(120),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z.string().regex(phonePattern, "Please enter a valid phone number."),
  required: (message: string, max = 200) =>
    z.string().min(1, message).max(max, `Please keep this under ${max} characters.`),
  optional: (max = 200) => z.string().max(max, `Please keep this under ${max} characters.`),
  choice: <T extends readonly [string, ...string[]]>(options: T, message = "Please choose an option.") =>
    z.enum(options, { error: message }),
  optionalChoice: <T extends readonly [string, ...string[]]>(options: T) =>
    z.enum(options).or(z.literal("")),
  multi: <T extends readonly [string, ...string[]]>(options: T, message?: string) =>
    message ? z.array(z.enum(options)).min(1, message) : z.array(z.enum(options)),
};

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function list(formData: FormData, key: string) {
  return formData.getAll(key).filter((value): value is string => typeof value === "string");
}

function addError(errors: FieldErrors, key: string, message: string) {
  errors[key] = [...(errors[key] ?? []), message];
}

function createReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return `CLAY-${Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("")}`;
}

function invalid(errors: FieldErrors): RegistrationState {
  return { status: "error", message: "Please check the highlighted fields.", errors };
}

function eventDetailsHtml() {
  const lines = [
    `<strong>${escapeHtml(clay.shortTitle)}</strong>`,
    clay.dates ? `📅 ${escapeHtml(clay.dates)}` : "",
    clay.venue ? `📍 ${escapeHtml(clay.venue)}` : "",
  ].filter(Boolean);
  return `<p style="padding:16px;border-left:3px solid #9e2b2b;background:#fdf8ec;font-size:16px;line-height:1.7;">${lines.join("<br />")}</p>`;
}

function eventDetailsText() {
  return [clay.shortTitle, clay.dates ? `📅 ${clay.dates}` : "", clay.venue ? `📍 ${clay.venue}` : ""]
    .filter(Boolean)
    .join("\n");
}

function rowToHtml(row: SheetRow) {
  const rows = Object.entries(row)
    .filter(([, value]) => value !== "")
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#6b7280;">${escapeHtml(key)}</td><td style="padding:6px 0;vertical-align:top;">${escapeHtml(String(value)).replace(/\n/g, "<br />")}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;">${rows}</table>`;
}

function rowToText(row: SheetRow) {
  return Object.entries(row)
    .filter(([, value]) => value !== "")
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

type SaveInput = {
  sheet: SheetName;
  row: SheetRow;
  name: string;
  email: string;
  label: string;
  ack: { subject: string; heading: string; html: string; text: string };
};

type OutgoingEmail = { to: string; replyTo?: string; subject: string; html: string; text: string };

/** Sends with Brevo when configured, otherwise Resend. Returns false if nothing could send it. */
async function sendEmail(message: OutgoingEmail, label: string) {
  if (isBrevoEmailConfigured()) {
    const sent = await sendBrevoEmail({ ...message, to: { email: message.to } });
    if (sent.ok) return true;
    console.error(`Failed to send ${label} via Brevo`, sent);
  }

  const resend = getResend();
  if (resend) {
    const sent = await resend.emails.send({ from: emailConfig.from, ...message });
    if (!sent.error) return true;
    console.error(`Failed to send ${label} via Resend`, sent.error);
  }

  return false;
}

async function saveRegistration({ sheet, row, name, email, label, ack }: SaveInput) {
  const saved = await appendSheetRow(sheet, row);

  if (!saved.ok) {
    console.error(`Failed to save ${label} to Google Sheets`, saved);

    // Fallback: email the team so the registration is not lost.
    const notified = await sendEmail(
      {
        to: emailConfig.to,
        replyTo: email,
        subject: `[${clay.name}] ${label} from ${name} (not saved to sheet)`,
        html: brandedEmail({
          heading: `New ${label.toLowerCase()}`,
          body: `<p style="padding:12px 16px;background:#fcf0d6;">This registration could not be saved to Google Sheets, so please add it manually.<br /><span style="font-size:13px;color:#6b7280;">${escapeHtml(saved.message)}</span></p>${rowToHtml(row)}`,
        }),
        text: `This registration could not be saved to Google Sheets (${saved.message}).\n\n${rowToText(row)}`,
      },
      `${label} fallback`,
    );
    if (!notified) return false;
  }

  await sendEmail(
    {
      to: email,
      replyTo: emailConfig.to,
      subject: ack.subject,
      html: brandedEmail({ heading: ack.heading, body: ack.html }),
      text: ack.text,
    },
    `${label} confirmation`,
  );

  return true;
}

const unavailable: RegistrationState = {
  status: "error",
  message: `Registration is temporarily unavailable. Please try again shortly, or email us at ${site.email}.`,
};

/* —— Form 1: General attendance —— */

const attendeeSchema = z.object({
  fullName: field.name,
  email: field.email,
  phone: field.phone,
  city: field.required("Please enter your city and state."),
  country: field.choice(countries, "Please select your country."),
  ageRange: field.optionalChoice(ageRanges),
  heardAbout: field.choice(hearAboutOptions, "Please tell us how you heard about the conference."),
  needsAccessibility: field.choice(yesNo),
  accessibilityDetails: field.optional(500),
  futureUpdates: field.optionalChoice(yesNo),
  firstTime: field.optionalChoice(yesNo),
  inGroup: field.optionalChoice(yesNo),
  groupName: field.optional(),
  arrangements: field.optional(2000),
});

export async function registerAttendee(
  _prevState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  if (text(formData, "clay_hp")) return { status: "success", reference: createReference() };

  const parsed = attendeeSchema.safeParse({
    fullName: text(formData, "fullName"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    city: text(formData, "city"),
    country: text(formData, "country"),
    ageRange: text(formData, "ageRange"),
    heardAbout: text(formData, "heardAbout"),
    needsAccessibility: text(formData, "needsAccessibility"),
    accessibilityDetails: text(formData, "accessibilityDetails"),
    futureUpdates: text(formData, "futureUpdates"),
    firstTime: text(formData, "firstTime"),
    inGroup: text(formData, "inGroup"),
    groupName: text(formData, "groupName"),
    arrangements: text(formData, "arrangements"),
  });

  const errors: FieldErrors = parsed.success ? {} : z.flattenError(parsed.error).fieldErrors;
  const raw = parsed.success ? parsed.data : null;

  if (text(formData, "needsAccessibility") === "Yes" && !text(formData, "accessibilityDetails")) {
    addError(errors, "accessibilityDetails", "Please tell us what assistance would be helpful.");
  }
  if (text(formData, "inGroup") === "Yes" && !text(formData, "groupName")) {
    addError(errors, "groupName", "Please enter the name of your church, ministry or group.");
  }

  if (!raw || Object.keys(errors).length > 0) return invalid(errors);

  const reference = createReference();
  const row: SheetRow = {
    Reference: reference,
    "Full name": raw.fullName,
    Email: raw.email,
    "Phone (WhatsApp)": raw.phone,
    "City and state": raw.city,
    Country: raw.country,
    "Age range": raw.ageRange,
    "Heard about CLAY via": raw.heardAbout,
    "Needs accessibility assistance": raw.needsAccessibility,
    "Accessibility details": raw.needsAccessibility === "Yes" ? raw.accessibilityDetails : "",
    "Future programme updates": raw.futureUpdates,
    "First Scepter programme": raw.firstTime,
    "Attending with a group": raw.inGroup,
    "Church, ministry or group name": raw.inGroup === "Yes" ? raw.groupName : "",
    "Specific arrangements": raw.arrangements,
  };

  const firstName = escapeHtml(raw.fullName.split(" ")[0]);
  const saved = await saveRegistration({
    sheet: "Attendees",
    row,
    name: raw.fullName,
    email: raw.email,
    label: "Conference registration",
    ack: {
      subject: `You're registered for ${clay.title}`,
      heading: `Thank you for registering, ${firstName}.`,
      html: `<p>You have been registered for <strong>${escapeHtml(clay.title)}</strong>.</p>
${eventDetailsHtml()}
<p style="padding:16px;background:#fcf0d6;"><strong>Reference:</strong> ${reference}</p>
<p>Further information about the schedule and attendance arrangements will be communicated to you by email.</p>
<p>We look forward to welcoming you!</p>
<p>Grace and peace,<br />${escapeHtml(site.legalName)}</p>`,
      text: `Thank you for registering, ${raw.fullName.split(" ")[0]}.\n\nYou have been registered for ${clay.title}.\n\n${eventDetailsText()}\n\nReference: ${reference}\n\nFurther information about the schedule and attendance arrangements will be communicated to you by email.\n\nWe look forward to welcoming you!\n\n${site.legalName}`,
    },
  });

  return saved ? { status: "success", reference } : unavailable;
}

/* —— Form 2: Volunteers —— */

const volunteerSchema = z.object({
  fullName: field.name,
  email: field.email,
  phone: field.phone,
  ageRange: field.choice(ageRanges, "Please select your age range."),
  city: field.required("Please enter your city and area of residence."),
  church: field.optional(),
  churchReference: field.optional(),
  volunteeredBefore: field.choice(yesNo),
  experience: field.optional(2000),
  departments: field
    .multi(volunteerDepartments, "Please select at least one department.")
    .max(maxVolunteerDepartments, `Please select no more than ${maxVolunteerDepartments} departments.`),
  otherArea: field.optional(),
  otherSkills: field.optional(2000),
  skillsDescription: field.optional(2000),
  availableDays: field.multi(volunteerDays, "Please select the days you are available."),
  trainingAvailability: field.choice(yesNoDepends),
  setupAvailability: field.choice(yesNoDepends),
  cleanupAvailability: field.choice(yesNoDepends),
  schedulingConstraints: field.optional(2000),
  followGuidelines: field.choice(yesNo),
  attendOrientation: field.choice(yesNo),
  collaborate: field.choice(yesNo),
  safeguarding: field.choice(yesNoNotApplicable),
  assignmentInfo: field.optional(2000),
  anythingElse: field.optional(2000),
  consent: z.literal("yes", { error: "Please confirm and give your consent to continue." }),
});

export async function registerVolunteer(
  _prevState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  if (text(formData, "clay_hp")) return { status: "success", reference: createReference() };

  const parsed = volunteerSchema.safeParse({
    fullName: text(formData, "fullName"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    ageRange: text(formData, "ageRange"),
    city: text(formData, "city"),
    church: text(formData, "church"),
    churchReference: text(formData, "churchReference"),
    volunteeredBefore: text(formData, "volunteeredBefore"),
    experience: text(formData, "experience"),
    departments: list(formData, "departments"),
    otherArea: text(formData, "otherArea"),
    otherSkills: text(formData, "otherSkills"),
    skillsDescription: text(formData, "skillsDescription"),
    availableDays: list(formData, "availableDays"),
    trainingAvailability: text(formData, "trainingAvailability"),
    setupAvailability: text(formData, "setupAvailability"),
    cleanupAvailability: text(formData, "cleanupAvailability"),
    schedulingConstraints: text(formData, "schedulingConstraints"),
    followGuidelines: text(formData, "followGuidelines"),
    attendOrientation: text(formData, "attendOrientation"),
    collaborate: text(formData, "collaborate"),
    safeguarding: text(formData, "safeguarding"),
    assignmentInfo: text(formData, "assignmentInfo"),
    anythingElse: text(formData, "anythingElse"),
    consent: text(formData, "consent"),
  });

  const errors: FieldErrors = parsed.success ? {} : z.flattenError(parsed.error).fieldErrors;
  const raw = parsed.success ? parsed.data : null;

  if (text(formData, "volunteeredBefore") === "Yes" && !text(formData, "experience")) {
    addError(errors, "experience", "Please briefly describe your volunteering experience.");
  }

  if (!raw || Object.keys(errors).length > 0) return invalid(errors);

  const reference = createReference();
  const row: SheetRow = {
    Reference: reference,
    "Full name": raw.fullName,
    Email: raw.email,
    "Phone (WhatsApp)": raw.phone,
    "Age range": raw.ageRange,
    "City and area": raw.city,
    "Church or ministry": raw.church,
    "Church leader or reference": raw.churchReference,
    "Volunteered before": raw.volunteeredBefore,
    "Volunteering experience": raw.volunteeredBefore === "Yes" ? raw.experience : "",
    "Preferred departments": raw.departments.join(", "),
    "Other area to serve": raw.otherArea,
    "Other skills or qualifications": raw.otherSkills,
    "Skills for selected department": raw.skillsDescription,
    "Available days": raw.availableDays.join(", "),
    "Pre-conference training": raw.trainingAvailability,
    "Venue setup": raw.setupAvailability,
    "Post-event cleanup": raw.cleanupAvailability,
    "Scheduling constraints": raw.schedulingConstraints,
    "Will follow volunteer guidelines": raw.followGuidelines,
    "Will attend orientation": raw.attendOrientation,
    "Will work collaboratively": raw.collaborate,
    "Safeguarding checks": raw.safeguarding,
    "Assignment information": raw.assignmentInfo,
    "Anything else": raw.anythingElse,
    "Consent given": "Yes",
  };

  const firstName = escapeHtml(raw.fullName.split(" ")[0]);
  const saved = await saveRegistration({
    sheet: "Volunteers",
    row,
    name: raw.fullName,
    email: raw.email,
    label: "Volunteer registration",
    ack: {
      subject: `Thank you for volunteering | ${clay.title}`,
      heading: `Thank you, ${firstName}.`,
      html: `<p>Thank you for your willingness to serve at <strong>${escapeHtml(clay.title)}</strong>.</p>
<p>Your volunteer registration has been received. Our volunteer coordination team will review your preferences, skills and availability and communicate the next steps.</p>
${eventDetailsHtml()}
<p style="padding:16px;background:#fcf0d6;"><strong>Reference:</strong> ${reference}<br />
<strong>Preferred departments:</strong> ${escapeHtml(raw.departments.join(", "))}</p>
<p>We appreciate your heart to serve and look forward to connecting with you!</p>
<p>Grace and peace,<br />${escapeHtml(site.legalName)}</p>`,
      text: `Thank you, ${raw.fullName.split(" ")[0]}.\n\nThank you for your willingness to serve at ${clay.title}.\n\nYour volunteer registration has been received. Our volunteer coordination team will review your preferences, skills and availability and communicate the next steps.\n\n${eventDetailsText()}\n\nReference: ${reference}\nPreferred departments: ${raw.departments.join(", ")}\n\nWe appreciate your heart to serve and look forward to connecting with you!\n\n${site.legalName}`,
    },
  });

  return saved ? { status: "success", reference } : unavailable;
}
