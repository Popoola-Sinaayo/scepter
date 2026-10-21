"use server";

import { z } from "zod";
import {
  ageRanges,
  childAgeRanges,
  clay,
  hearAboutOptions,
  maxVolunteerDepartments,
  registrationCategoryValues,
  volunteerDays,
  volunteerDepartments,
  volunteerSkills,
  volunteerTimes,
  yesNo,
  yesNoDepends,
  yesNoNotApplicable,
  yesNoNotSure,
} from "@/lib/clay";
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

async function saveRegistration({ sheet, row, name, email, label, ack }: SaveInput) {
  const resend = getResend();
  const saved = await appendSheetRow(sheet, row);

  if (!saved.ok) {
    console.error(`Failed to save ${label} to Google Sheets`, saved);

    // Fallback: email the team so the registration is not lost.
    const fallback = resend
      ? await resend.emails.send({
          from: emailConfig.from,
          to: emailConfig.to,
          replyTo: email,
          subject: `[${clay.name}] ${label} from ${name} (not saved to sheet)`,
          html: brandedEmail({
            heading: `New ${label.toLowerCase()}`,
            body: `<p style="padding:12px 16px;background:#fcf0d6;">This registration could not be saved to Google Sheets, so please add it manually.<br /><span style="font-size:13px;color:#6b7280;">${escapeHtml(saved.message)}</span></p>${rowToHtml(row)}`,
          }),
          text: `This registration could not be saved to Google Sheets (${saved.message}).\n\n${rowToText(row)}`,
        })
      : null;

    if (!fallback || fallback.error) {
      if (fallback?.error) console.error(`Failed to email ${label} fallback`, fallback.error);
      return false;
    }
  }

  if (resend) {
    const sent = await resend.emails.send({
      from: emailConfig.from,
      to: email,
      replyTo: emailConfig.to,
      subject: ack.subject,
      html: brandedEmail({ heading: ack.heading, body: ack.html }),
      text: ack.text,
    });
    if (sent.error) console.error(`Failed to send ${label} confirmation`, sent.error);
  }

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
  church: field.optional(),
  heardAbout: field.choice(hearAboutOptions, "Please tell us how you heard about the conference."),
  heardAboutOther: field.optional(),
  category: field.choice(registrationCategoryValues, "Please choose a registration category."),
  inPerson: field.choice(yesNo),
  withChildren: field.choice(yesNo),
  childrenCount: field.optional(),
  childrenAges: field.multi(childAgeRanges),
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
    church: text(formData, "church"),
    heardAbout: text(formData, "heardAbout"),
    heardAboutOther: text(formData, "heardAboutOther"),
    category: text(formData, "category"),
    inPerson: text(formData, "inPerson"),
    withChildren: text(formData, "withChildren"),
    childrenCount: text(formData, "childrenCount"),
    childrenAges: list(formData, "childrenAges"),
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

  const withChildren = text(formData, "withChildren") === "Yes";
  const childrenCount = Number(text(formData, "childrenCount"));
  if (withChildren) {
    if (!Number.isInteger(childrenCount) || childrenCount < 1 || childrenCount > 20) {
      addError(errors, "childrenCount", "Please enter how many children will accompany you (1–20).");
    }
    if (list(formData, "childrenAges").length === 0) {
      addError(errors, "childrenAges", "Please select the age ranges of the children.");
    }
  }
  if (text(formData, "needsAccessibility") === "Yes" && !text(formData, "accessibilityDetails")) {
    addError(errors, "accessibilityDetails", "Please tell us what assistance would be helpful.");
  }
  if (text(formData, "inGroup") === "Yes" && !text(formData, "groupName")) {
    addError(errors, "groupName", "Please enter the name of your church, ministry or group.");
  }

  if (!raw || Object.keys(errors).length > 0) return invalid(errors);

  const reference = createReference();
  const hasChildren = raw.withChildren === "Yes";
  const row: SheetRow = {
    Reference: reference,
    "Full name": raw.fullName,
    Email: raw.email,
    "Phone (WhatsApp)": raw.phone,
    "City and state": raw.city,
    Country: raw.country,
    "Age range": raw.ageRange,
    "Church or ministry": raw.church,
    "Heard about CLAY via":
      raw.heardAbout === "Other" && raw.heardAboutOther
        ? `Other: ${raw.heardAboutOther}`
        : raw.heardAbout,
    "Registration category": raw.category,
    "Attending in person": raw.inPerson,
    "Attending with children": raw.withChildren,
    "Number of children": hasChildren ? childrenCount : "",
    "Children's age ranges": hasChildren ? raw.childrenAges.join(", ") : "",
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
      html: `<p>Your registration for <strong>${escapeHtml(clay.title)}</strong> has been received.</p>
<p style="padding:16px;background:#fcf0d6;"><strong>Reference:</strong> ${reference}<br />
<strong>Category:</strong> ${escapeHtml(raw.category)}<br />
<strong>Attending in person:</strong> ${raw.inPerson}${hasChildren ? `<br /><strong>Children:</strong> ${childrenCount}` : ""}</p>
<p>Further information about the conference, including the venue, schedule and attendance arrangements, will be communicated to you by email.</p>
<p>We look forward to welcoming you!</p>
<p>Grace and peace,<br />${escapeHtml(site.legalName)}</p>`,
      text: `Thank you for registering, ${raw.fullName.split(" ")[0]}.\n\nYour registration for ${clay.title} has been received.\n\nReference: ${reference}\nCategory: ${raw.category}\nAttending in person: ${raw.inPerson}${hasChildren ? `\nChildren: ${childrenCount}` : ""}\n\nFurther information about the conference, including the venue, schedule and attendance arrangements, will be communicated to you by email.\n\nWe look forward to welcoming you!\n\n${site.legalName}`,
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
  skills: field.multi(volunteerSkills, "Please select at least one skill or area of experience."),
  skillsOther: field.optional(),
  skillsDescription: field.optional(2000),
  otherDepartments: field.optionalChoice(yesNo),
  otherDepartmentsDetails: field.optional(),
  availableDays: field.multi(volunteerDays, "Please select the days you are available."),
  availableTimes: field.multi(volunteerTimes, "Please select the times you are available."),
  trainingAvailability: field.choice(yesNoDepends),
  setupAvailability: field.choice(yesNoDepends),
  cleanupAvailability: field.choice(yesNoDepends),
  schedulingConstraints: field.optional(2000),
  transportAssistance: field.choice(yesNoNotSure),
  needsAccessibility: field.optionalChoice(yesNo),
  accessibilityDetails: field.optional(500),
  hasWhatsApp: field.optionalChoice(yesNo),
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
    skills: list(formData, "skills"),
    skillsOther: text(formData, "skillsOther"),
    skillsDescription: text(formData, "skillsDescription"),
    otherDepartments: text(formData, "otherDepartments"),
    otherDepartmentsDetails: text(formData, "otherDepartmentsDetails"),
    availableDays: list(formData, "availableDays"),
    availableTimes: list(formData, "availableTimes"),
    trainingAvailability: text(formData, "trainingAvailability"),
    setupAvailability: text(formData, "setupAvailability"),
    cleanupAvailability: text(formData, "cleanupAvailability"),
    schedulingConstraints: text(formData, "schedulingConstraints"),
    transportAssistance: text(formData, "transportAssistance"),
    needsAccessibility: text(formData, "needsAccessibility"),
    accessibilityDetails: text(formData, "accessibilityDetails"),
    hasWhatsApp: text(formData, "hasWhatsApp"),
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
  if (text(formData, "needsAccessibility") === "Yes" && !text(formData, "accessibilityDetails")) {
    addError(errors, "accessibilityDetails", "Please tell us what assistance would be helpful.");
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
    Skills: [
      ...raw.skills.filter((skill) => skill !== "Other"),
      ...(raw.skills.includes("Other") ? [raw.skillsOther ? `Other: ${raw.skillsOther}` : "Other"] : []),
    ].join(", "),
    "Skills and experience details": raw.skillsDescription,
    "Willing to support other departments": raw.otherDepartments,
    "Other departments": raw.otherDepartments === "Yes" ? raw.otherDepartmentsDetails : "",
    "Available days": raw.availableDays.join(", "),
    "Available times": raw.availableTimes.join(", "),
    "Pre-conference training": raw.trainingAvailability,
    "Venue setup": raw.setupAvailability,
    "Post-event cleanup": raw.cleanupAvailability,
    "Scheduling constraints": raw.schedulingConstraints,
    "Needs transport assistance": raw.transportAssistance,
    "Accessibility requirements": raw.needsAccessibility,
    "Accessibility details": raw.needsAccessibility === "Yes" ? raw.accessibilityDetails : "",
    "Smartphone and WhatsApp": raw.hasWhatsApp,
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
<p style="padding:16px;background:#fcf0d6;"><strong>Reference:</strong> ${reference}<br />
<strong>Preferred departments:</strong> ${escapeHtml(raw.departments.join(", "))}</p>
<p>We appreciate your heart to serve and look forward to connecting with you!</p>
<p>Grace and peace,<br />${escapeHtml(site.legalName)}</p>`,
      text: `Thank you, ${raw.fullName.split(" ")[0]}.\n\nThank you for your willingness to serve at ${clay.title}.\n\nYour volunteer registration has been received. Our volunteer coordination team will review your preferences, skills and availability and communicate the next steps.\n\nReference: ${reference}\nPreferred departments: ${raw.departments.join(", ")}\n\nWe appreciate your heart to serve and look forward to connecting with you!\n\n${site.legalName}`,
    },
  });

  return saved ? { status: "success", reference } : unavailable;
}
