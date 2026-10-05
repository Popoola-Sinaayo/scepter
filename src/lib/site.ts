export const site = {
  name: "The Scepter",
  legalName: "The Scepter Christian Ministries",
  tagline: "Formed to reign. Sent to witness.",
  description:
    "The Scepter Christian Ministries forms believers into their identity and function as kings and priests: formed at the altar, deployed into every sphere as witnesses of Christ.",
  url: "https://thescepterglobal.com",
  founder: "Precious Alo",
  // TODO: confirm the real ministry inbox.
  email: "info@thescepterglobal.com",
  // TODO: replace with the real phone number, or set to "" to hide it.
  phone: "" as string,
  // TODO: replace with the real city / venue, or leave empty to hide it.
  location: "" as string,
  copyrightYear: new Date().getFullYear(),
  // TODO: add the real profile URLs. Empty strings are hidden.
  social: {
    instagram: "" as string,
    youtube: "" as string,
    podcast: "" as string,
    x: "" as string,
    facebook: "" as string,
    linkedin: "" as string,
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/doctrine", label: "Doctrine" },
  { href: "/formation", label: "Formation" },
  { href: "/teachings", label: "Teachings" },
] as const;

export const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/doctrine", label: "Our doctrine" },
  { href: "/formation", label: "Formation" },
  { href: "/formation#gatherings", label: "Gatherings" },
  { href: "/teachings", label: "Teachings" },
  { href: "/contact", label: "Contact" },
] as const;

export const socialLinks = (
  [
    { key: "instagram", label: "Instagram", href: site.social.instagram },
    { key: "youtube", label: "YouTube", href: site.social.youtube },
    { key: "podcast", label: "Podcast", href: site.social.podcast },
    { key: "x", label: "X", href: site.social.x },
    { key: "facebook", label: "Facebook", href: site.social.facebook },
    { key: "linkedin", label: "LinkedIn", href: site.social.linkedin },
  ] as const
).filter((link) => link.href !== "");
