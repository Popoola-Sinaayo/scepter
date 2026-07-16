export const homeCards = [
  {
    title: "About us",
    description:
      "The Scepter is a ministry rooted in faith, compassion, and community — welcoming every heart seeking truth and purpose.",
    icon: "/icons/about-icon.svg",
    shape: "/icons/about-shape.svg" as string | undefined,
    href: "/about",
  },
  {
    title: "Get involved",
    description:
      "Join a small group, serve on a team, or walk with us through outreach — there is a place for you here.",
    icon: "/icons/involve-icon.svg",
    shape: undefined as string | undefined,
    href: "/sermons",
  },
  {
    title: "Giving back",
    description:
      "Your generosity fuels worship, discipleship, and care for the people around us near and far.",
    icon: "/icons/giving-icon.svg",
    shape: "/icons/giving-shape.svg" as string | undefined,
    href: "/contact",
  },
];

export const benefitTiles = [
  {
    title: "Watch and listen to our sermons",
    description:
      "Grow through weekly teaching rooted in Scripture and lived faith.",
    image: "/images/benefit-1.jpg",
  },
  {
    title: "Watch and listen to our sermons",
    description:
      "Gather with family and friends as we worship and encourage one another.",
    image: "/images/benefit-2.jpg",
  },
  {
    title: "Watch and listen to our sermons",
    description:
      "Serve together in outreach that brings hope to our city and beyond.",
    image: "/images/benefit-3.jpg",
  },
  {
    title: "Watch and listen to our sermons",
    description:
      "Find rest, prayer, and spiritual formation for every season of life.",
    image: "/images/benefit-4.jpg",
  },
] as const;

export const blogPosts = [
  {
    category: "Relationship",
    title: "Walking in grace together",
    excerpt:
      "How fellowship and honesty deepen our walk with God and one another.",
    author: "Matthew Johnson",
    date: "Tuesday 13 May, 2024",
    featured: true,
  },
  {
    category: "Relationship",
    title: "Faith that shapes the home",
    excerpt:
      "Practical rhythms for families seeking to honor Christ each day.",
    author: "Matthew Johnson",
    date: "Tuesday 13 May, 2024",
    featured: false,
  },
  {
    category: "Relationship",
    title: "Community that carries you",
    excerpt:
      "Why belonging to a local body of believers still matters today.",
    author: "Matthew Johnson",
    date: "Tuesday 13 May, 2024",
    featured: false,
  },
  {
    category: "Relationship",
    title: "Hope for every season",
    excerpt:
      "Encouragement for hearts navigating joy, grief, and everything between.",
    author: "Matthew Johnson",
    date: "Tuesday 13 May, 2024",
    featured: false,
  },
] as const;

export const aboutBenefits = [
  {
    title: "Find fulfillment and joy",
    description:
      "At The Scepter we believe life in Christ produces lasting joy — not fleeting emotion, but a rooted peace that sustains us.",
    image: "/images/benefit-fulfillment.jpg",
    imageLeft: false,
  },
  {
    title: "Shared values",
    description:
      "We gather around Scripture, prayer, and a shared call to love our neighbors with sincerity and courage.",
    image: "/images/benefit-values.jpg",
    imageLeft: true,
  },
  {
    title: "Charity events",
    description:
      "From city outreaches to global partnerships, we give our time and resources to serve people with dignity.",
    image: "/images/benefit-charity.jpg",
    imageLeft: false,
  },
  {
    title: "All are welcome",
    description:
      "Whether you are new to faith or lifelong in your walk, you will find a seat, a story, and a spiritual home here.",
    image: "/images/benefit-welcome.jpg",
    imageLeft: true,
  },
] as const;

export const teamMembers = [
  {
    name: "Kim Bowen",
    role: "Pastor, Church",
    image: "/images/team-1.jpg",
  },
  {
    name: "Danielle Watkins",
    role: "Pastor, Church",
    image: "/images/team-2.jpg",
  },
  {
    name: "Naomi Craig",
    role: "Pastor, Church",
    image: "/images/team-3.jpg",
  },
  {
    name: "Santos Payne",
    role: "Pastor, Church",
    image: "/images/team-4.jpg",
  },
] as const;

export const featuredEvent = {
  label: "Upcoming Event",
  title: "Watch and listen to our sermons",
  description:
    "Join us for a night of worship, teaching, and renewed vision for our community.",
  day: "20",
  month: "July",
  time: "Friday 23:39 IST Saturday 11:20 ISD",
  location: "No 233 Main St. New York, United States",
  image: "/images/sermon-featured.jpg",
} as const;

export const events = [
  {
    title: "100 random acts of kindness",
    description: "Small steps of love that leave a lasting impact in our city.",
    day: "20",
    month: "July",
    time: "Friday 23:39 IST Saturday 11:20 ISD",
    location: "No 233 Main St. New York, United States",
    highlight: true,
  },
  {
    title: "Faith is a process, not a destination",
    description: "A gathering for honest conversations about growth and grace.",
    day: "20",
    month: "July",
    time: "Friday 23:39 IST Saturday 11:20 ISD",
    location: "No 233 Main St. New York, United States",
    highlight: false,
  },
  {
    title: "There is nothing impossible",
    description: "Stories of hope and prayer as we trust God for more.",
    day: "20",
    month: "July",
    time: "Friday 23:39 IST Saturday 11:20 ISD",
    location: "No 233 Main St. New York, United States",
    highlight: false,
  },
  {
    title: "Watch and listen to our sermons",
    description: "Open teaching nights for the whole community.",
    day: "20",
    month: "July",
    time: "Friday 23:39 IST Saturday 11:20 ISD",
    location: "No 233 Main St. New York, United States",
    highlight: false,
  },
] as const;
