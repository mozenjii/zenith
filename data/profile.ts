/**
 * Identity and contact facts.
 *
 * Reconciled on 2026-09-05 against the personal knowledge brain, the public
 * GitHub API, and a live check of every URL below. Three corrections were made
 * to what this file used to say, all of them material:
 *
 *  - The role at Epoches was "AI Systems Intern". It was **AI Systems
 *    Architect**, Nov 2025 - May 2026, and he **founded** the company. Intern
 *    understated it by two levels.
 *  - The current position was missing entirely. It is Start-up Owner at the
 *    National Incubation Center Lahore, since Aug 2026. A profile that omits
 *    what you are doing now is stale on arrival.
 *  - Education stopped at FAST. The A-Level and O-Level results are strong and
 *    were simply absent.
 *
 * The ORCID iD is verified against the public ORCID API and resolves to this
 * person. It registers no works yet, which is why nothing on this site claims
 * a publication. See data/research.ts.
 */
export const profile = {
  name: "Mohib Ahmad",
  initials: "MA",
  location: "Lahore, Pakistan",
  timezone: "Asia/Karachi (UTC+5)",
  pronouns: "he/him",

  /** One line, present tense, no adjectives that cannot be checked. */
  role: "Computer science undergraduate, founder, and independent researcher.",
  headline: "Systems that hold up when someone checks them.",
  subheadline:
    "A compiler for legal rules, a prior-authorization control plane, a shipped AI-services company, and a math paper. Each one below links to the artifact behind it.",

  /**
   * Portrait crops of the one supplied photograph, both centerd on the subject:
   *  - `portrait`      3:4, head through the crossed arms - hero
   *  - `portraitSquare` 1:1, head and shoulders - sidebar tile
   * This is the only photograph of him in the repository. Re-crop from the
   * original rather than generating a substitute.
   */
  portrait: "/assets/profile/portrait.jpg",
  portraitSquare: "/assets/profile/portrait-square.jpg",

  email: "mhbamdm@gmail.com",
  emailUniversity: "l240985@lhr.nu.edu.pk",
  github: "https://github.com/mozenjii",
  githubHandle: "mozenjii",
  linkedin: "https://www.linkedin.com/in/mohibhhhh/",
  linkedinHandle: "mohibhhhh",
  orcid: "0009-0001-8170-8179",
  orcidUrl: "https://orcid.org/0009-0001-8170-8179",
  resumePath: "/assets/resume/primary_resume_mohib.pdf",

  /**
   * Deliberately omitted: the phone number that appears on the resume. It
   * carries the most exposure and the least value of anything in the set, and
   * a public web page is not a resume handed to one recruiter.
   */

  current: {
    role: "Start-up Owner",
    org: "National Incubation Center Lahore",
    since: "Aug 2026",
    note: "Pakistan's national startup incubator, full-time and on-site."
  },

  education: {
    school: "FAST NUCES Lahore",
    degree: "BS Computer Science",
    gpa: "3.98 / 4.0",
    period: "Aug 2024 - Aug 2028",
    classOf: "2028",
    /** Standing as of the current academic year, in US terms. */
    standing: "Junior"
  }
} as const;

export type EducationStage = {
  stage: string;
  institution: string;
  period: string;
  result: string;
  /**
   * What the qualification means to a US reader. A-Levels and O-Levels are the
   * British system and carry no weight with an American recruiter who has never
   * seen them - "A*AA" reads as a typo rather than as a top grade. The
   * equivalence is spelled out rather than assumed.
   */
  usEquivalent?: string;
  /** Distinctions earned at this institution specifically. */
  distinctions: string[];
};

/** The full ladder. Unbroken, and strong at every stage. */
export const educationLadder: EducationStage[] = [
  {
    stage: "BS Computer Science",
    institution: "FAST NUCES Lahore",
    period: "Aug 2024 - Aug 2028",
    result: "3.98 / 4.0 GPA",
    usEquivalent:
      "Four-year bachelor's degree. FAST NUCES is Pakistan's top-ranked computer science university.",
    distinctions: ["Silver Medalist", "Dean's List, twice"]
  },
  {
    stage: "A-Levels — Computer Science, Physics, Math",
    institution: "Lahore Grammar School, Paragon",
    period: "Aug 2022 - Aug 2024",
    result: "A*AA",
    usEquivalent:
      "British pre-university exams, comparable to AP courses. A* is the top grade available.",
    distinctions: ["High Achiever's Award", "Founder & President, Coding & Development Society"]
  },
  {
    stage: "O-Levels — Sciences",
    institution: "Source Code Academia",
    period: "Aug 2019 - Aug 2022",
    result: "7 A*s",
    usEquivalent: "British high school qualifications. Top grade in all seven subjects.",
    distinctions: ["Silver and Bronze medals, HRCA", "Vice President, Digital Literacy Club"]
  }
];

/** Awards that sit above any single institution. */
export const awards = [
  { label: "3rd place, National AI Hackathon", detail: "Lahore, 2026" },
  { label: "Silver Medalist", detail: "FAST NUCES" },
  { label: "Dean's List", detail: "Twice" }
];
