export const site = {
  name: "The Scepter",
  tagline: "For Jesus in every sphere",
  email: "info@thescepterglobal",
  phone: "(480) 555-0103",
  address: "4517 Washington Ave.",
  contactAddress: ["NH 234 Public Square", "San Francisco 65368"],
  copyrightYear: new Date().getFullYear(),
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/sermons", label: "Sermon" },
  { href: "/blog", label: "Blog" },
] as const;

export const quickLinks = [
  { href: "/about", label: "About us" },
  { href: "/sermons", label: "Sermons" },
  { href: "/sermons#events", label: "Events" },
  { href: "/blog", label: "Blog" },
] as const;
