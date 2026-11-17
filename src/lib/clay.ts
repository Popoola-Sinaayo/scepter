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

export const genders = ["Male", "Female", "Prefer not to say"] as const;

export const ministerRegistrationTypes = [
  "Individual minister",
  "Part of a church or ministry delegation",
  "Representing a ministry or Christian organisation",
  "Other",
] as const;

// These categories accommodate different church traditions; they are not a ranking of spiritual authority.
export const ministerDesignations = [
  "General Overseer / Presiding Bishop",
  "Archbishop / Bishop",
  "Senior Pastor / Lead Pastor",
  "Resident Pastor / Branch Pastor",
  "Associate Pastor / Assistant Pastor",
  "Minister / Preacher",
  "Evangelist",
  "Missionary",
  "Apostle",
  "Prophet / Prophetic Minister",
  "Teacher of the Word",
  "Worship Pastor / Music Minister",
  "Youth Pastor / Youth Ministry Leader",
  "Children's Ministry Leader",
  "Departmental / Unit Leader",
  "Church Elder / Deacon / Deaconess",
  "Ministry Executive / Administrator",
  "Christian Organisation Leader",
  "Other",
] as const;

export const yearsInMinistry = [
  "Less than 1 year",
  "1–3 years",
  "4–7 years",
  "8–15 years",
  "16–25 years",
  "More than 25 years",
  "Prefer not to say",
] as const;

export const yearsInPosition = [
  "Less than 1 year",
  "1–3 years",
  "4–7 years",
  "8–15 years",
  "More than 15 years",
  "Prefer not to say",
] as const;

export const leadershipScopes = [
  "Individual ministry or department",
  "Local church or congregation",
  "Multiple branches or congregations",
  "Regional or zonal ministry",
  "National ministry",
  "International ministry",
  "Independent or itinerant ministry",
  "Other",
] as const;

export const leadershipSizes = [
  "Fewer than 50 people",
  "50–199",
  "200–499",
  "500–999",
  "1,000 or more",
  "Multiple congregations; difficult to estimate",
  "Prefer not to say",
  "Not applicable",
] as const;

export const ministryAreas = [
  "Pastoral leadership",
  "Preaching and teaching",
  "Evangelism and missions",
  "Discipleship and spiritual formation",
  "Prayer and intercession",
  "Prophetic ministry",
  "Worship and music",
  "Youth ministry",
  "Children's ministry",
  "Men's ministry",
  "Women's ministry",
  "Family and marriage ministry",
  "Community outreach and social impact",
  "Leadership development",
  "Church administration and operations",
  "Media and communications",
  "Christian education and training",
  "Missions and church planting",
  "Counselling and pastoral care",
  "Other",
] as const;

export const ministryGrowthAreas = [
  "Spiritual formation and discipleship",
  "Leadership development",
  "Church growth and community engagement",
  "Evangelism and missions",
  "Worship and prayer",
  "Youth and children's development",
  "Family and pastoral care",
  "Ministry administration and governance",
  "Media and digital ministry",
  "Other",
] as const;

export const attendanceReasons = [
  "Spiritual renewal and personal formation",
  "Deeper understanding of the conference theme, Emergence",
  "Fellowship with other ministers and Christian leaders",
  "Leadership development",
  "Prayer and worship",
  "Ministry networking and relationship-building",
  "Learning and ministry development",
  "Representing my church or organisation",
  "Supporting the vision of The Scepter Christian Ministries",
  "Other",
] as const;

export const participationModes = [
  "Attending as a participant only",
  "Open to serving if invited",
  "Already assigned an official role",
  "Attending as an official representative of my ministry",
] as const;

export const ministerServingAreas = [
  "Prayer and intercession",
  "Worship and music",
  "Teaching or facilitation",
  "Guest relations and protocol",
  "Pastoral support",
  "Ushering and hospitality",
  "Leadership or ministry support",
  "Other",
] as const;

export const inPersonOptions = ["Yes", "No", "Not yet confirmed"] as const;

export const partyTypes = [
  "Alone",
  "With family",
  "With church members",
  "With a ministry delegation",
  "With colleagues or other guests",
] as const;

export const accessibilityOptions = ["No", "Yes", "Prefer to discuss privately"] as const;

export const communicationMethods = ["WhatsApp", "Phone call", "Email", "SMS/text message"] as const;
