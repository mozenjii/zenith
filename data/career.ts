/**
 * Employment and leadership record, most recent first.
 *
 * Compiled 2026-09-05. Two entries needed a single canonical source chosen, so
 * that this file and LinkedIn agree:
 *
 *  - The Physics-Computing and Kolmogorov-Arnold Network sessions are credited
 *    to GDG, where the detailed record of them sits.
 *  - MLSA dates and title follow LinkedIn: Dec 2025, "Lead, Outreach & PR".
 *
 * `metrics` entries are outcomes with a number attached. Anything that could
 * not be stated as a number stayed in `summary` instead of being inflated.
 */

export type Role = {
  id: string;
  title: string;
  org: string;
  /** Present tense for the current role. */
  period: string;
  type: "Full-time" | "Remote" | "Part-time" | "Seasonal" | "Society";
  current?: boolean;
  /** Founding roles are called out - there are four of them. */
  founding?: boolean;
  summary: string;
  metrics?: string[];
  link?: string;
};

export const roles: Role[] = [
  {
    id: "nic",
    title: "Start-up Owner",
    org: "National Incubation Center Lahore",
    period: "Aug 2026 - present",
    type: "Full-time",
    current: true,
    founding: true,
    summary:
      "Building inside Pakistan's national startup incubator, full-time and on-site. Google VP and Google representatives visited during this period."
  },
  {
    id: "epoches",
    title: "AI Systems Architect",
    org: "Epoches",
    period: "Nov 2025 - May 2026",
    type: "Remote",
    founding: true,
    summary:
      "Founded and ran the AI services agency - AI services, automations, and managed AI employees for businesses. Built context-engineered workflows with guardrails and vector retrieval for SMEs across healthcare, retail, and professional services.",
    metrics: ["Shipped and operates epoches.co", "SME delivery across 3 sectors"],
    link: "https://epoches.co"
  },
  {
    id: "algorizms",
    title: "Co-Founder & CEO",
    org: "Algorizms",
    period: "Jun 2025 - Dec 2025",
    type: "Full-time",
    founding: true,
    summary:
      "B2B SaaS startup in Islamabad. Ran campus recruiting, shipped the MVP on a sprint cadence, and wrote the operating playbooks.",
    metrics: [
      "23 interns recruited from 600+ applicants",
      "15+ pilot client demos secured",
      "~40% lift in user adoption",
      "~30% lift in team productivity"
    ]
  },
  {
    id: "mlsa",
    title: "Lead, Outreach & PR",
    org: "Microsoft Learn Student Ambassadors, Islamabad",
    period: "Jan 2025 - Dec 2025",
    type: "Part-time",
    summary:
      "Mobilized campus leads across the chapter, owning outreach, speakers, and logistics.",
    metrics: [
      "10+ campus leads mobilized",
      "5 networking events, 250+ attendees",
      "12 industry experts secured for keynotes",
      "35% lift in event registrations"
    ]
  },
  {
    id: "nascon",
    title: "Vice Head of Code Craft",
    org: "NaSCon",
    period: "Mar 2025 - Apr 2025",
    type: "Seasonal",
    summary: "Ran the Code Craft competition track at FAST's flagship national student convention."
  },
  {
    id: "gdg",
    title: "Head of Technical Workshops",
    org: "Google Developer Groups on Campus, FAST Islamabad",
    period: "Oct 2024 - May 2025",
    type: "Seasonal",
    summary:
      "Ran the technical program and delivered sessions on Physics-Computing integration and Kolmogorov-Arnold Network research. Three interdisciplinary developer projects followed.",
    metrics: ["12 technical seminars and webinars", "250+ students engaged"]
  },
  {
    id: "ses",
    title: "Member, Team PR",
    org: "Software Engineering Society, FAST Islamabad",
    period: "Oct 2024 - May 2025",
    type: "Seasonal",
    summary:
      "Secured corporate sponsorships through tailored proposals, and coordinated speakers and logistics for technical talks."
  },
  {
    id: "fqss",
    title: "Outreach Team Member",
    org: "FAST Quran and Sunnah Society",
    period: "Oct 2024 - May 2025",
    type: "Seasonal",
    summary: "Outreach for society events and programs."
  },
  {
    id: "lgs-cds",
    title: "Founder & President, Coding & Development Society",
    org: "Lahore Grammar School, Paragon",
    period: "2022 - 2024",
    type: "Society",
    founding: true,
    summary: "Founded the school's coding society and ran it through to A-Level graduation."
  },
  {
    id: "sca-dlc",
    title: "Vice President, Digital Literacy Club",
    org: "Source Code Academia",
    period: "2019 - 2022",
    type: "Society",
    summary: "The earliest leadership role on the record."
  }
];

export const currentRole = roles.find((role) => role.current) ?? roles[0];

/**
 * The shape of the record, stated once so the site does not have to imply it.
 * Four founding roles across three stages of education is the actual pattern -
 * he tends to found the thing rather than join it.
 */
export const foundingRoleCount = roles.filter((role) => role.founding).length;
