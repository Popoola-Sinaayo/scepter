export const clay = {
  name: "CLAY Conference 2026",
  theme: "EMERGENCE",
  title: "CLAY Conference 2026 — EMERGENCE",
  shortTitle: "CLAYCON 2026 — EMERGENCE",
  // Empty values are hidden.
  dates: "November 28th, 2026" as string,
  venue: "Solution Arena, 156 Ikorodu Road, Onipanu, Lagos" as string,
} as const;

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

// TODO: confirm the eligibility wording for Seniors and Ministers before publishing.
export const registrationCategories = [
  {
    value: "General Attendance",
    description: "Open to everyone attending the conference.",
  },
  {
    value: "Seniors",
    description: "For attendees aged 60 and above.",
  },
  {
    value: "Ministers",
    description: "For pastors, ministers and leaders currently serving in a church or ministry.",
  },
] as const;

export const registrationCategoryValues = registrationCategories.map((c) => c.value) as [
  (typeof registrationCategories)[number]["value"],
  ...(typeof registrationCategories)[number]["value"][],
];

export const childAgeRanges = [
  "Under 2 years",
  "2–4 years",
  "5–8 years",
  "9–12 years",
  "13–17 years",
] as const;

export const maxVolunteerDepartments = 2;

export const volunteerDepartments = [
  "Protocol",
  "Ushering",
  "Registration",
  "Media",
  "Photography",
  "Videography",
  "Graphic Design",
  "Motion Design",
  "Technical and Production",
  "Music",
  "Logistics",
  "Welfare",
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
