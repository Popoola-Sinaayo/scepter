export type Scripture = {
  text: string;
  reference: string;
};

export const images = {
  founderPortrait: {
    src: "/images/ministry/founder-portrait.jpg",
    alt: "Precious Alo, founder of The Scepter, smiling in a cream suit in front of a wall of album artwork",
  },
  founderLectern: {
    src: "/images/ministry/founder-lectern.jpg",
    alt: "Precious Alo teaching from a clear lectern with a tablet and microphone",
  },
  founderSeated: {
    src: "/images/ministry/founder-seated.jpg",
    alt: "Precious Alo seated and smiling during a gathering, hands clasped",
  },
  preaching: {
    src: "/images/ministry/preaching-bw.jpg",
    alt: "Precious Alo preaching with a microphone, pointing upward, in black and white",
  },
  preachingGesture: {
    src: "/images/ministry/preaching-gesture.jpg",
    alt: "Precious Alo preaching with an open hand, microphone raised, against a burgundy-lit curtain",
  },
  teachingRoom: {
    src: "/images/ministry/teaching-room.jpg",
    alt: "Precious Alo ministering to a room of young believers standing in worship",
  },
  worshipLead: {
    src: "/images/ministry/worship-lead.jpg",
    alt: "A young man leading worship with eyes closed, holding a microphone",
  },
  groupStage: {
    src: "/images/ministry/group-stage.jpg",
    alt: "Precious Alo with four members of The Scepter community in front of a burgundy curtain",
  },
  communityLineup: {
    src: "/images/ministry/community-lineup.jpg",
    alt: "Nine members of The Scepter community standing together on stage",
  },
  fellowshipDuo: {
    src: "/images/ministry/fellowship-duo.jpg",
    alt: "Two members of The Scepter giving thumbs up and smiling on stage",
  },
  fellowshipMaroon: {
    src: "/images/ministry/fellowship-maroon.jpg",
    alt: "Precious Alo with a ministry partner, both smiling and giving thumbs up",
  },
  brothersDuo: {
    src: "/images/ministry/brothers-duo.jpg",
    alt: "Precious Alo standing with a member of The Scepter community",
  },
} as const;

export const preamble = {
  lead: "The Church has produced many converts. It has produced fewer kings.",
  body: "Scripture is unambiguous: the redeemed have been made a kingdom of priests. Not merely forgiven subjects, but formed rulers. The Scepter exists to close that gap. It is not a movement built on inspiration. It is an institution built on formation.",
  maxim: "Inspiration produces moments. Formation produces men.",
};

export const thesis = {
  title: "The altar precedes the throne.",
  summary:
    "Priesthood produces kingship. You cannot reign without first being formed in the priestly office. Authority, influence and cultural leadership are the fruit of a life shaped at the altar.",
};

export const priestlyDisciplines = [
  {
    title: "Intimacy",
    description: "Access to the Presence is the priest's first assignment.",
  },
  {
    title: "Intercession",
    description: "The priest stands between God and the people.",
  },
  {
    title: "Sacrifice",
    description: "The priest learns to give what costs him something.",
  },
  {
    title: "Holiness",
    description: "Set apart, not merely set aside.",
  },
  {
    title: "Mediation",
    description: "Carrying others before God, and carrying God to others.",
  },
] as const;

export const anchors = [
  {
    number: "I",
    slug: "genesis-mandate",
    title: "The Genesis Mandate",
    theme: "Dominion and stewardship",
    scripture: {
      text: "Let Us make man in Our image, according to Our likeness; let them have dominion…",
      reference: "Genesis 1:26",
    },
    summary:
      "God's first word about humanity was a word about function. The Fall complicated this mandate; redemption restores it.",
    body: [
      "Before the Fall, before the Law, before the Cross, God's first word about humanity was a word about function: dominion. Man was created to govern, steward and develop creation, reflecting the rule of God through image-bearers.",
      "The Fall did not abolish this mandate. Redemption restores it, not merely as forgiveness of sin but as the re-commissioning of image-bearers into their original calling, exercised from formation, not ambition.",
    ],
  },
  {
    number: "II",
    slug: "melchizedek-order",
    title: "The Melchizedek Order",
    theme: "The priest-king archetype",
    scripture: {
      text: "You are a priest forever according to the order of Melchizedek.",
      reference: "Psalm 110:4 · Hebrews 7",
    },
    summary:
      "King of Salem and priest of God Most High, Melchizedek refuses the separation of altar and throne. Christ holds both eternally.",
    body: [
      "Under the Law, priests came from Levi and kings from Judah; the two offices were kept apart. Melchizedek held both, and Christ, a priest after his order, holds both forever.",
      "The believer, united to Christ, participates in this order. It is a statement about what the redeemed person is: a priest-king after the order of the One who is both Lamb and Lion.",
    ],
  },
  {
    number: "III",
    slug: "royal-priesthood",
    title: "The Royal Priesthood",
    theme: "The ecclesial declaration",
    scripture: {
      text: "But you are a chosen generation, a royal priesthood, a holy nation, His own special people, that you may proclaim the praises of Him who called you out of darkness into His marvelous light.",
      reference: "1 Peter 2:9",
    },
    summary:
      "Peter writes to ordinary believers and calls them a royal priesthood: a present reality, with a purpose of proclamation.",
    body: [
      "Peter is writing to the Church, to ordinary believers scattered across the Roman world. He calls them a royal priesthood: not a metaphor, not a future hope, but a present reality.",
      "The verse describes not only what believers are, but what they are for: to proclaim the praises of Him who called them. The identity is missional. The Scepter does not invent an identity for believers; it forms them into the one Scripture has already declared.",
    ],
  },
  {
    number: "IV",
    slug: "eternal-confirmation",
    title: "The Eternal Confirmation",
    theme: "The eschatological seal",
    scripture: {
      text: "And have made us kings and priests to our God; and we shall reign on the earth.",
      reference: "Revelation 1:6 · 5:10",
    },
    summary:
      "From Patmos, John confirms that this identity does not fade. The question is not whether we are kings and priests, but whether we function as such.",
    body: [
      "If 1 Peter declares what the Church is now, Revelation confirms that this identity is eternal. John opens his vision anchored in the believer's identity as kings and priests.",
      "From the Genesis mandate, through Melchizedek, declared by Peter and confirmed by John: the question is not whether believers are kings and priests, but whether they are functioning as such. Formation is the bridge between identity and function.",
    ],
  },
] as const;

export const failures = [
  {
    label: "Failure one",
    title: "Kingship without priesthood",
    description:
      "The ambitious believer: gifted, influential and present in culture, but spiritually shallow. Influence arrives before formation and becomes an extension of an unformed self.",
  },
  {
    label: "Failure two",
    title: "Priesthood without kingship",
    description:
      "The pietistic believer: deeply intimate with God, but culturally absent. Formed but never deployed, leaving territory they were meant to steward.",
  },
  {
    label: "Failure three",
    title: "Formation without mission",
    description:
      "Believers who are formed but never sent. The priest who never intercedes and the king who never witnesses have both missed their calling.",
  },
] as const;

export const witness = {
  title: "Formation for witness, not dominion.",
  body: [
    "The Scepter is not building Christian elites. It is forming witnesses. The vision of kings and priests in every sphere is not a vision of conquest or a spiritual aristocracy. It is a vision of light carried into places that have not yet encountered it.",
    "Melchizedek's first recorded act was a blessing, not a declaration of power. Revelation's kings and priests stand beside the Lamb who was slain, whose mission was redemption, not domination.",
  ],
  maxim:
    "We go into every sphere not to dominate but to witness. Not to build our kingdoms but to make His name known.",
};

export const formationIsNot = [
  {
    title: "Inspiration",
    description: "produces feelings, but not change.",
  },
  {
    title: "Information",
    description: "produces knowledge, but not transformation.",
  },
  {
    title: "Imitation",
    description: "produces performance, but not identity.",
  },
] as const;

export const formationDefinition =
  "Formation is the deliberate, structured process by which a person is shaped theologically, spiritually, characterologically and intellectually into the full stature of their identity in Christ. It is the patient, architectural work of becoming: time, structure, accountability, doctrine and community engaging the whole person.";

export const dimensions = [
  {
    number: "01",
    title: "Theological formation",
    description:
      "Believers who think Christianly about every sphere of life: governance, science, culture, economics and art. Theology is not a department; it is the integrating framework for all of reality.",
  },
  {
    number: "02",
    title: "Spiritual formation",
    description:
      "The interior life is the source of all exterior function. Prayer, fasting, the Word, worship and community are the priestly disciplines that form character.",
  },
  {
    number: "03",
    title: "Leadership formation",
    description:
      "Kings govern. We equip leadership as a vocational calling: decision-making under pressure, institutional design and bearing responsibility for others.",
  },
  {
    number: "04",
    title: "Vocational formation",
    description:
      "Every sphere is a kingly assignment. We form believers for specific spheres, with a theological framework for their work.",
  },
] as const;

export const spheres = [
  {
    title: "Governance",
    description: "Policy architects and leaders whose governance is priestly in posture.",
  },
  {
    title: "Science",
    description: "Researchers whose pursuit of knowledge is worshipful.",
  },
  {
    title: "Academia",
    description: "Scholars advancing a Christian intellectual tradition.",
  },
  {
    title: "Arts & culture",
    description: "Artists and writers who shape the imagination of their generation.",
  },
  {
    title: "Enterprise",
    description: "Builders of institutions as an act of cultural stewardship.",
  },
  {
    title: "The Church",
    description: "Pastors and theologians grounded in deep doctrine.",
  },
] as const;

export const vision = {
  quote:
    "In 40 years, The Scepter's most powerful argument will not be its content. It will be the people it formed.",
  body: "We measure success not by attendance or engagement, but by the quality of people formed over time. The vision is generational.",
};

export const institution = {
  title: "Not a program. An institution.",
  lead: "Programs end. Institutions endure.",
  body: "The Scepter is being built to outlast its founder and to be known not by how many attended its events, but by how many nations were shaped by the people it formed. That requires patience, doctrine and a willingness to go deep before going wide.",
  maxim: "We are not in a hurry. We are building for centuries.",
};

export const founder = {
  name: "Precious Alo",
  role: "Founder & Primary Visionary",
  // TODO: replace with the founder's own bio.
  bio: [
    "Precious Alo is the founder and primary visionary of The Scepter Christian Ministries. He carries a burden to see believers move beyond conversion into formation, rising into their identity as kings and priests.",
    "Through teaching, discipleship and gatherings, he stewards a vision of a generation formed at the altar and sent into every sphere of society as witnesses of Christ.",
  ],
  quote: "Formation precedes function. The altar precedes the throne.",
};

export type Gathering = {
  name: string;
  description: string;
  schedule: string;
  location: string;
};

// TODO: replace with real gatherings and cohorts. Entries with an empty
// schedule are shown as "Details coming soon".
export const gatherings: Gathering[] = [
  {
    name: "Formation Cohorts",
    description:
      "Structured, small-group journeys through doctrine, spiritual disciplines and leadership, with accountability and community.",
    schedule: "",
    location: "",
  },
  {
    name: "Scepter Gatherings",
    description:
      "Times of worship, teaching and prayer where the community gathers around the Word and the Presence.",
    schedule: "",
    location: "",
  },
];

export type Teaching = {
  title: string;
  series?: string;
  date: string;
  href: string;
  excerpt: string;
};

// Add teachings here as they are published, newest first.
export const teachings: Teaching[] = [];
