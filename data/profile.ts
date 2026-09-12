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

  /*
    There is deliberately no portrait path here any more.

    The one supplied photograph lives at
    `public/assets/profile/portrait.jpg` (3:4, head through the crossed arms).
    That is a *source*: `scripts/build-images.mjs` derives every rendered
    variant from it and records the result in `config/images.json`, which is
    what `components/ui/Portrait.tsx` reads.

    A 1:1 `portrait-square.jpg` also used to sit here, for a square tile on
    /about. It is gone: any square window on a 3:4 frame lands on head and
    shoulders, which made it the most closed-in image on the site. That tile is
    3:4 now and shares this photograph. Recover the file from git history if a
    genuinely square context ever appears.

    A path here would let a component point an <img> straight at the 285KB
    original and quietly bypass all of that, which is exactly what the pipeline
    exists to prevent. Use `<Portrait base="portrait" />` instead.

    This is the only photograph of him in the repository. Re-crop from the
    original rather than generating a substitute.
  */

  email: "mhbamdm@gmail.com",
  emailUniversity: "l240985@lhr.nu.edu.pk",
  github: "https://github.com/mozenjii",
  githubHandle: "mozenjii",
  linkedin: "https://www.linkedin.com/in/mohibhhhh/",
  linkedinHandle: "mohibhhhh",
  orcid: "0009-0001-8170-8179",
  orcidUrl: "https://orcid.org/0009-0001-8170-8179",
  /*
    Filename matters here: this is served with `download`, so whatever it is
    called is what lands in the recruiter's Downloads folder. The previous
    `primary_resume_mohib.pdf` was an internal working name.
  */
  resumePath: "/assets/resume/mohib-ahmad-resume.pdf",

  /**
   * No phone number in this object, and that is still deliberate for the
   * structured data: nothing on a rendered page should carry it, because a
   * page is scraped and a resume is handed to one person.
   *
   * The PDF above is a different matter. It does carry the number, verbatim,
   * because Mohib chose that on 2026-09-06 with the trade stated: the site is
   * public, so the PDF is indexable and harvestable, and taking it down later
   * does not un-scrape it. That is his call to make and it is made. Do not
   * quietly redact the file on a later pass.
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
    /*
      3.79 is the CGPA, over the 36 credits of the CS degree.

      This field read 3.98 until 2026-09-06, and that was wrong in a way worth
      spelling out so it is not "corrected" back. 3.98 is the Fall 2025
      SEMESTER GPA. Spring 2026 was 3.63, and the cumulative across both is
      3.79. A single semester is not a CGPA and must never be quoted as one -
      least of all on a page whose whole argument is that its claims check out.

      It also disagreed with his own resume, which says CGPA 3.79/4.0. A
      recruiter opening both saw 3.98 on the site and 3.79 on the PDF, which
      reads as inflation on the site rather than as two different measures.
    */
    gpa: "3.79 / 4.0",
    /*
      One degree, Aug 2024 to Aug 2028.

      He started at FAST Islamabad and moved to FAST Lahore, changing from
      Software Engineering to Computer Science. The Islamabad coursework was
      exempted at Lahore rather than repeated, so it counts toward this degree.
      Same university throughout, and the qualification he will hold is a
      single BS Computer Science from FAST NUCES Lahore - which is how his own
      resume states it, and his own record to describe.

      Only the CGPA reset on the move, which is why 3.79 is computed over the
      Lahore record. That detail is in the brain; it does not belong on a
      portfolio, and 3.98 is still not the number (see below).
    */
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
    result: "3.79 / 4.0 CGPA",
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
