export const clay = {
  name: "CLAY Conference 2026",
  theme: "EMERGENCE",
  title: "CLAY Conference 2026 — EMERGENCE",
  // TODO: add the confirmed dates and venue. Empty values are hidden.
  dates: "" as string,
  venue: "" as string,
} as const;

export const yesNo = ["Yes", "No"] as const;
export const yesNoDepends = ["Yes", "No", "Depends"] as const;
export const yesNoNotSure = ["Yes", "No", "Not sure"] as const;
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
  "Church or ministry announcement",
  "Friend or personal invitation",
  "Social media",
  "Website",
  "Pastor or ministry leader",
  "Other",
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
  "Protocol and Guest Relations",
  "Ushering and Seating",
  "Registration and Accreditation",
  "Media and Communications",
  "Technical and Production",
  "Music and Worship",
  "Prayer and Intercession",
  "Logistics and Operations",
  "Welfare and Hospitality",
  "Publicity and Marketing",
  "Transport and Parking",
  "Medical and First Aid",
  "Children's Ministry",
  "Sanitation",
  "Stage Management",
  "General Support",
] as const;

export const volunteerSkills = [
  "Event planning and coordination",
  "Communication and customer service",
  "Photography and videography",
  "Graphic design and creative design",
  "Social media management",
  "Audio engineering and sound",
  "Lighting and stage production",
  "Singing and musical instruments",
  "Administration and data entry",
  "Logistics and transportation",
  "Hospitality and catering",
  "First aid or relevant medical qualifications",
  "Security or safety experience",
  "Children's work or safeguarding",
  "Technical support and IT",
  "Other",
] as const;

// TODO: replace with the confirmed dates for training, setup, rehearsals and the conference,
// e.g. "Training — Saturday 7 November".
export const volunteerDays = [
  "Volunteer training",
  "Venue setup",
  "Rehearsals",
  "Conference day 1",
  "Conference day 2",
  "Pack-down",
] as const;

// TODO: replace with the confirmed volunteer schedules.
export const volunteerTimes = [
  "Morning (8am – 12pm)",
  "Afternoon (12pm – 4pm)",
  "Evening (4pm – 9pm)",
  "Flexible / any time",
] as const;
