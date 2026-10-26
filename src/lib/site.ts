export const site = {
  name: "The Scepter",
  legalName: "The Scepter Christian Ministries",
  tagline: "Formed to reign. Sent to witness.",
  description:
    "The Scepter Christian Ministries forms believers into their identity and function as kings and priests: formed at the altar, deployed into every sphere as witnesses of Christ.",
  url: "https://thescepterglobal.com",
  founder: "Pastor Precious Alo",
  // TODO: confirm the real ministry inbox.
  email: "info@thescepterglobal.org",
  // TODO: replace with the real phone number, or set to "" to hide it.
  phone: "" as string,
  // TODO: replace with the real city / venue, or leave empty to hide it.
  location: "" as string,
  copyrightYear: new Date().getFullYear(),
  // From https://linktr.ee/thescepterglobal. Empty strings are hidden.
  social: {
    instagram: "https://www.instagram.com/thescepterglobal" as string,
    youtube: "https://www.youtube.com/@TheScepterGlobal" as string,
    pastorYoutube: "https://www.youtube.com/@PastorPreciousAlo" as string,
    spotify: "https://open.spotify.com/show/0snnXZiUNDP2Q8XUR9xZfI" as string,
    applePodcasts: "https://podcasts.apple.com/ng/podcast/the-scepter/id1896067998" as string,
    audiomack: "https://audiomack.com/thescepter" as string,
    substack: "https://thescepterglobal.substack.com" as string,
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
    { key: "instagram", icon: "instagram", label: "Instagram", href: site.social.instagram },
    { key: "youtube", icon: "youtube", label: "YouTube", href: site.social.youtube },
    {
      key: "pastorYoutube",
      icon: "youtube",
      label: `${site.founder} on YouTube`,
      href: site.social.pastorYoutube,
    },
    { key: "spotify", icon: "spotify", label: "Spotify", href: site.social.spotify },
    {
      key: "applePodcasts",
      icon: "applePodcasts",
      label: "Apple Podcasts",
      href: site.social.applePodcasts,
    },
    { key: "audiomack", icon: "audiomack", label: "Audiomack", href: site.social.audiomack },
    { key: "substack", icon: "substack", label: "Substack", href: site.social.substack },
    { key: "x", icon: "x", label: "X", href: site.social.x },
    { key: "facebook", icon: "facebook", label: "Facebook", href: site.social.facebook },
    { key: "linkedin", icon: "linkedin", label: "LinkedIn", href: site.social.linkedin },
  ] as const
).filter((link) => link.href !== "");
