export const clay = {
  name: "CLAY Conference 2026",
  theme: "EMERGENCE",
  title: "CLAY Conference 2026 — EMERGENCE",
  shortTitle: "CLAYCON 2026 — EMERGENCE",
  // Empty values are hidden.
  dates: "November 28th, 2026" as string,
  venue: "Solution Arena, 156 Ikorodu Road, Onipanu, Lagos" as string,
  // WhatsApp communities offered after registering, one per form. Empty hides it.
  whatsappUrls: {
    attendee: "https://chat.whatsapp.com/G5bQgpqA6DUJERwYUZdNCV?mode=gi_t" as string,
    volunteer: "https://chat.whatsapp.com/BsWRe9hgPO63tUSDooyT6w?mode=gi_t" as string,
    // TODO: replace with a ministers' group if one is created; uses the attendees' group for now.
    minister: "https://chat.whatsapp.com/G5bQgpqA6DUJERwYUZdNCV?mode=gi_t" as string,
  },
} as const;

export type RegistrationAudience = keyof typeof clay.whatsappUrls;

export const yesNo = ["Yes", "No"] as const;
export const yesNoDepends = ["Yes", "No", "Depends"] as const;
export const yesNoNotApplicable = ["Yes", "No", "Not applicable"] as const;

export const ageRanges = [
  "Under 18",
  "18–24",
  "25–34",
  "35–44",
  "45–54",
  "55 and above",
  "Prefer not to say",
] as const;

export const hearAboutOptions = [
  "Friend or family member",
  "Social media",
  "Website",
  "Billboard or flyer",
  "Pastor or ministry leader",
] as const;

export const volunteerDepartments = [
  "Protocol",
  "Ushering",
  "Registration",
  "Social Media & Content",
  "Photography",
  "Videography",
  "Graphic Design",
  "Motion Design",
  "Technical and Production",
  "Music",
  "Logistics",
  "Welfare",
  "Hospitality",
  "Publicity",
  "Transport",
  "Medical",
  "Children's Ministry",
  "Sanitation",
  "Stage Management",
  "General Support",
] as const;

// TODO: add the confirmed dates, e.g. "Volunteer training — Saturday 21 November".
export const volunteerDays = [
  "Volunteer training",
  "Venue setup",
  "Rehearsals",
  "Conference day",
  "Pack-down",
] as const;

/* —— Ministers' registration —— */

export const ministerCompanions = ["Spouse", "Children", "Attaché", "No one, attending alone"] as const;
