import type { ArchiveEntry, Project } from "./types";

/**
 * The work, ordered by weight rather than by date.
 *
 * Rebuilt 2026-09-05 against the GitHub API and the personal knowledge brain.
 * Three things changed materially:
 *
 *  - **RuleWeaver was missing entirely.** It is the most substantial public
 *    repository on the account - 421KB of Python, 16 design documents, 29 ADRs,
 *    389 tests, Apache-2.0 - and it was nowhere on the site.
 *  - **Epoches was missing.** A company that was founded, shipped a
 *    twenty-route production site, and served clients is not a footnote.
 *  - **Priora's framing was wrong.** This file described it as denial-risk
 *    *prediction*. The current product pack explicitly rejects that framing:
 *    a lint rule forbids any denial-probability field from sorting a queue or
 *    feeding a gate. The resume describes the earlier prototype; the entry
 *    below describes what it became, and says so.
 *
 * Every `proofMetrics` entry carries an `evidence` field or does not ship.
 */
export const projects: Project[] = [
  {
    id: "ruleweaver",
    slug: "ruleweaver-rules-as-code-compiler",
    title: "RuleWeaver",
    shortPitch:
      "A compiler that turns published regulation into executable, source-linked rules — where the language model proposes and deterministic software decides.",
    signalType: "backend_systems",
    year: "2026",
    status: "built",
    visibility: "public",
    tier: "flagship",
    license: "Apache-2.0",
    stack: [
      "Python",
      "Typed IR",
      "Expression AST",
      "Mutation testing",
      "OpenFisca",
      "eCFR XML",
      "JSON Schema",
      "pytest"
    ],
    problem:
      "Human rules are published as prose. Production systems need precise logic, dates, thresholds, exceptions, and version history. That translation is expensive, duplicated across institutions, hard to audit, and easy to get wrong.",
    user:
      "Public-benefit and tax administrations, and the analysts who currently hand-encode eligibility rules into code nobody can trace back to statute.",
    whatIBuilt:
      "A standards-first compiler built around a canonical typed IR. Authoritative source is ingested and hash-verified, an LLM proposes clause segmentations and rule extractions, six deterministic checks stand between those proposals and the IR, a human approves through a reviewer application with a hash-chained audit log, and only approved rules execute. An OpenFisca code generator emits a runnable country package.",
    architecture: {
      backend: [
        "typed rule IR with a closed expression AST",
        "deterministic four-state evaluator with execution traces",
        "verification engine, 41 stable RWxxxx diagnostics including a type checker",
        "boundary-case and date-transition generators",
        "semantic diff and amendment impact analyzis"
      ],
      database: ["eCFR XML ingestion into addressable clauses, sha256-verified per snapshot"],
      aiMl: [
        "clause segmentation and rule extraction behind six checks",
        "provider-neutral model interface (Claude + GPT)",
        "prompt-injection guard",
        "adversarial review gate with seeded errors and rubber-stamp detection"
      ],
      deployment: ["CLI", "GitHub Actions test workflow"]
    },
    hardPart:
      "Building a review gate that actually works. Independent expert encoders agree at roughly zero percent without a shared vocabulary, and automation bias degrades even expert review — so the gate had to be tested adversarially with planted errors rather than assumed effective.",
    tradeoff:
      "Kept the model permanently out of the runtime decision path, accepting slower coverage in exchange for a system whose outputs are deterministic and defensible. v0.1 was rescoped to a narrow domain — tax and public-benefit eligibility — rather than claiming generality it had not earned.",
    proofMetrics: [
      { label: "Planted faults caught", value: "22 / 22", evidence: "Mutation harness in the test suite" },
      { label: "Tests", value: "389", evidence: "pytest, run in CI on every push" },
      { label: "Diagnostics", value: "41 stable codes", evidence: "Verification engine, RWxxxx series" },
      { label: "Clauses ingested", value: "468", evidence: "7 CFR 271.2, 273.9, 273.10 via eCFR XML" },
      {
        label: "Citations resolving verbatim",
        value: "16 / 16",
        evidence: "Golden corpus of 15 SNAP rules; every citation checked against its named clause"
      },
      { label: "Design records", value: "29 ADRs", evidence: "docs/11_DECISIONS.md" }
    ],
    /* No capture yet. The pipeline is documented in the repository README,
       which the Project status link below points at. */
    links: {
      github: "https://github.com/mozenjii/RuleWeaver",
      docs: "https://github.com/mozenjii/RuleWeaver/blob/main/docs/01_PROJECT_STATUS.md",
      resumeRelevant: true
    },
    nextVersion: [
      "Run the generated package under OpenFisca and compare against the deterministic evaluator",
      "PDF and Akoma Ntoso ingestion",
      "Parameter extraction, so thresholds stop coming from the hand-encoded fixture",
      "A public benchmark"
    ],
    limits: [
      "The OpenFisca export is a structural claim. The generated package is checked structurally and parses, but nobody has run it under OpenFisca and compared results against the deterministic evaluator.",
      "Thresholds still come from the hand-encoded package; parameter extraction is not built.",
      "Ingestion handles eCFR XML only — no PDF, no Akoma Ntoso.",
      "There is no public benchmark, so cross-system comparison is not yet possible."
    ],
    whatBroke:
      "The original ten-point v0.1 definition was not deliverable and M0 could not close as written — its exit criteria depended on backlog items scheduled after it. Both were caught in a review against external research and resolved by rescoping, recorded in ADR-017 through ADR-022 rather than quietly dropped."
  },
  {
    id: "priora",
    slug: "priora-prior-authorization-control-plane",
    title: "Priora",
    shortPitch:
      "A provider-side prior-authorization control plane for US healthcare, built on criterion-level evidence rather than denial prediction.",
    signalType: "ai_data",
    year: "2026",
    status: "prototype",
    visibility: "partly-public",
    tier: "flagship",
    stack: ["Next.js", "TypeScript", "Postgres", "Supabase", "Python", "OpenAI", "TF-IDF"],
    problem:
      "Prior authorization is slow, document-heavy, and opaque. Reviewers need to know which criteria are met, on what evidence, under which version of which policy — not a probability that a payer will say no.",
    user: "Provider-side operators, clinic teams, and reviewers assembling authorization packets.",
    whatIBuilt:
      "A prototype with a Next.js frontend, an API backend, server-side document extraction, model-assisted analyzis, and optional Postgres persistence. The design work that followed it is larger than the prototype: a criterion DSL, a five-value status algebra with explicit applicability, a canonical state machine, an event model with hash-chained audit, and a determinism boundary that keeps models out of every verdict.",
    architecture: {
      frontend: ["Next.js review workflow UI", "document intake screens"],
      backend: ["API backend", "server-side extraction", "criterion evaluation", "canonical state machine"],
      database: ["Postgres via Supabase", "per-tenant event chains with prev-hash linking"],
      aiMl: [
        "models produce candidates only — bindings, decompositions, classifications, drafts",
        "models never produce a status, verdict, deadline, or state transition",
        "grounding validator between every model call and any external effect"
      ],
      deployment: ["Cloud Run notes", "local frontend/backend split"]
    },
    hardPart:
      "Deciding that the original output was the wrong output. The prototype predicted denial risk; the architecture that replaced it forbids a denial probability from sorting a work queue or feeding any gate, because a probability tells a reviewer nothing they can act on or defend.",
    tradeoff:
      "Chose evidence and provenance over the demo-friendly prediction score. It is a harder system to build and a less impressive thirty-second demo, and it is the one a compliance reviewer can actually accept.",
    proofMetrics: [
      { label: "Public prototype", value: "TypeScript", evidence: "github.com/mozenjii/Priora-Prototype" },
      { label: "Product specification", value: "33 files", evidence: "Private product pack" },
      { label: "Technical specification", value: "44 files", evidence: "Private technical pack" },
      { label: "Machine-readable artifacts", value: "344", evidence: "Extracted from the technical pack" }
    ],
    links: {
      github: "https://github.com/mozenjii/Priora-Prototype",
      resumeRelevant: true
    },
    nextVersion: [
      "Implement the criterion DSL against the public prototype",
      "Conformance corpus across the six worked payer cases",
      "Publish an architecture diagram that does not disclose the private pack"
    ],
    limits: [
      "The public repository is the earlier prediction-era prototype. It does not implement the evidence-first architecture described here.",
      "The specification packs are private, so most of this work cannot be independently verified from the public repo alone.",
      "No production deployment, no real payer integration, and no clinical validation. Nothing here should be read as a claim of accuracy on real cases.",
      "Fifteen open questions in the product pack remain open, deliberately — they are recorded as spikes rather than answered by invention."
    ],
    whatBroke:
      "The resume and the product pack describe two different products under one name. That is a real inconsistency, and it is recorded rather than smoothed over: the resume describes the prototype, and this page describes what the design became."
  },
  {
    id: "epoches",
    slug: "epoches-ai-services",
    title: "Epoches",
    shortPitch:
      "An AI services company — founded, built, and shipped, including a twenty-route production site and delivery for SMEs across three sectors.",
    signalType: "product_design",
    year: "2026",
    status: "shipped",
    visibility: "private",
    tier: "flagship",
    stack: ["Next.js", "TypeScript", "Python", "Vector retrieval", "Workflow automation", "SEO"],
    problem:
      "Small and mid-sized businesses want AI in their operations and have no way to evaluate, scope, or run it. The gap is not model access; it is knowing which workflow to automate and being able to trust the result.",
    user: "SME owners and operations leads in healthcare, retail, and professional services.",
    whatIBuilt:
      "The company and its systems: context-engineered AI workflows with guardrails and vector retrieval, an audit-first engagement model that scopes before it implements, and the production marketing site at epoches.co — twenty-plus routes covering services, solutions, a blog, and a masterclass funnel.",
    architecture: {
      frontend: ["Next.js marketing site, 20+ routes", "blog and masterclass funnel"],
      backend: ["workflow automation", "AI employee orchestration"],
      aiMl: ["context engineering", "guardrails", "vector retrieval"],
      deployment: ["live at epoches.co"]
    },
    hardPart:
      "Making AI delivery legible to a buyer who cannot evaluate it. The answer was to sell the audit first — scope the work, show what is automatable, and only then implement.",
    tradeoff:
      "Ran the company as an operator rather than a pure engineer for the period, which cost engineering depth and bought direct evidence of what businesses will actually pay for.",
    proofMetrics: [
      { label: "Live site", value: "epoches.co", evidence: "Verified live in a browser, 2026-09-05" },
      { label: "Routes shipped", value: "20+", evidence: "Services, solutions, blog, masterclass, legal" },
      { label: "Sectors served", value: "3", evidence: "Healthcare, retail, professional services" },
      { label: "Tenure", value: "Nov 2025 – May 2026", evidence: "As AI Systems Architect" }
    ],
    /* Deliberately none: the live site is linked directly, which is better
       evidence than a screenshot of it. */
    links: {
      liveDemo: "https://epoches.co",
      resumeRelevant: true
    },
    nextVersion: ["Publish an anonymised delivery case study", "Document the audit-first engagement model"],
    limits: [
      "The source repository is private, so the implementation cannot be independently reviewed.",
      "No client names, revenue figures, or outcome percentages are published here — none could be verified by a reader, and unverifiable client claims are not worth making.",
      "This entry describes a company and a shipped site, not a single engineering artifact."
    ]
  },
  {
    id: "sids",
    slug: "startup-intelligence-due-diligence-system",
    title: "Startup Intelligence & Due-Diligence System",
    shortPitch:
      "A database-driven startup evaluation platform — founders, funding history, source-backed verification, and filtering built for diligence questions.",
    signalType: "backend_systems",
    year: "2026",
    status: "built",
    visibility: "public",
    tier: "supporting",
    stack: ["TypeScript", "Node.js", "Express", "SQL Server", "T-SQL", "REST APIs"],
    problem:
      "Startup data is fragmented across founders, funding rounds, milestones, and verification sources, which makes structured evaluation nearly impossible.",
    user: "Startup evaluators, analysts, and investment-style reviewers.",
    whatIBuilt:
      "A backend and relational database for managing startups, founders, funding history, source-backed verification records, filtering logic, and evaluation scores.",
    architecture: {
      frontend: ["UI implementation present in the repository"],
      backend: ["Express service", "REST-style data management"],
      database: [
        "startup records",
        "founder mappings",
        "funding history",
        "verification sources",
        "filtering and scoring logic"
      ]
    },
    hardPart:
      "Designing the relational model so that diligence queries could answer evaluation questions, rather than merely storing rows about companies.",
    tradeoff:
      "Put the logic close to the database and the backend filtering layer, trading a flashier UI for a stronger structural claim.",
    proofMetrics: [
      { label: "Repo commits", value: "36+", evidence: "Public repository history" },
      { label: "Languages", value: "TypeScript, JavaScript, T-SQL", evidence: "GitHub language breakdown" },
      { label: "Data model", value: "founders + funding + verification", evidence: "Schema in the repository" }
    ],
    links: {
      github: "https://github.com/mozenjii/Startup-Intelligence-Due-Diligence-System",
      resumeRelevant: true
    },
    nextVersion: ["Add an ERD screenshot", "Record an API walkthrough"],
    limits: [
      "No live deployment; the system runs locally.",
      "Verification records are structural — the system stores the source, it does not itself check the source."
    ]
  },
  {
    id: "streamscope",
    slug: "streamscope-real-time-data-pipeline",
    title: "StreamScope",
    shortPitch:
      "A configuration-driven concurrent Python pipeline that ingests unfamiliar CSV datasets, verifies and re-sequences packets, and renders live telemetry.",
    signalType: "backend_systems",
    year: "2026",
    status: "built",
    visibility: "public",
    tier: "supporting",
    stack: ["Python", "Multiprocessing", "Matplotlib", "Config-driven schemas", "Observer pattern"],
    problem:
      "Streaming systems have to handle unfamiliar datasets, queue pressure, ordering, verification, and live visibility — without being rewritten for each new input.",
    user: "Engineers reviewing pipeline architecture and concurrency behavior.",
    whatIBuilt:
      "A reusable CSV ingestion pipeline with bounded multiprocessing queues, signature verification, packet re-sequencing, running-average computation, observer-based telemetry, and a live dashboard. New datasets are described in config.json rather than coded against.",
    architecture: {
      backend: ["producer", "worker pool", "aggregator", "telemetry subject", "dashboard observer"],
      database: ["CSV source through configurable schema mapping"],
      diagrams: ["PlantUML class and sequence diagrams in the repository"]
    },
    hardPart:
      "Coordinating concurrency, backpressure visibility, sequence ordering, and generic schema mapping without collapsing the three layers into one script.",
    tradeoff:
      "Focused on CSV inputs to keep the generic pipeline clean, trading broader adapters for clearer architecture.",
    proofMetrics: [
      { label: "Architecture", value: "3-stage queue pipeline", evidence: "PlantUML diagrams in the repository" },
      { label: "Execution", value: "multiprocessing worker pool", evidence: "Bounded queues, configurable parallelism" },
      { label: "Telemetry", value: "observer-based live dashboard", evidence: "Output layer, decoupled from core" }
    ],
    links: {
      github: "https://github.com/mozenjii/StreamScope",
      resumeRelevant: true
    },
    nextVersion: ["Capture the live dashboard", "Add throughput measurements", "Support a second input adapter"],
    limits: [
      "CSV only. Any other source needs a new input plugin.",
      "No published throughput or latency numbers — the telemetry exists, the benchmark does not."
    ]
  },
  {
    id: "gdp",
    slug: "gdp-analytics-pipeline",
    title: "GDP Analytics Pipeline",
    shortPitch:
      "A modular analytics pipeline built to test how far dependency inversion pays for itself before the wiring costs more than it saves.",
    signalType: "academic_depth",
    year: "2026",
    status: "built",
    visibility: "public",
    tier: "supporting",
    stack: ["Python", "Pandas", "Matplotlib", "typing.Protocol", "Dependency Injection"],
    problem:
      "An analyzis script becomes hard to extend the moment input and output choices are coupled to transformation logic.",
    user: "Engineers reviewing architecture fundamentals.",
    whatIBuilt:
      "A layered pipeline with core contracts, pluggable CSV and Excel readers, console and graphics writers, and configuration-driven driver selection.",
    architecture: {
      backend: ["core engine", "input plugins", "output plugins", "wiring layer"],
      database: ["CSV and Excel ingestion"]
    },
    hardPart: "Keeping dependencies pointed at core abstractions while leaving the pipeline simple to run.",
    tradeoff: "Accepted indirection in exchange for boundaries that make a new source a small change.",
    proofMetrics: [
      { label: "Sources", value: "CSV + Excel", evidence: "Input plugin implementations" },
      { label: "Outputs", value: "Console + charts", evidence: "Output plugin implementations" },
      { label: "Architecture", value: "DIP-compliant core", evidence: "typing.Protocol contracts" }
    ],
    links: { github: "https://github.com/mozenjii/GDP-Analyzis-System" },
    nextVersion: ["Add a sample output gallery", "Add test coverage notes"],
    limits: ["A coursework-scale system. The architecture is the point, not the dataset."]
  },
  {
    id: "ukaab",
    slug: "ukaab-platform",
    title: "Ukaab",
    shortPitch: "Full-stack platform work — authentication flows, front-end screens, and user schema design.",
    signalType: "backend_systems",
    year: "2025",
    status: "built",
    visibility: "private",
    tier: "supporting",
    stack: ["Authentication", "OAuth", "OTP verification", "Schema design"],
    problem: "The platform needed working sign-up, verification, and identity handling before anything else could ship.",
    user: "Platform end users.",
    whatIBuilt:
      "Front-end pages including login, Get Started, and prompt-based interaction screens; authentication workflows covering Google and Facebook auth, OTP, and email verification; and the database schema for user management, authentication records, and verification status.",
    architecture: {
      frontend: ["login", "Get Started", "prompt-based interaction screens"],
      auth: ["Google Auth", "Facebook auth", "OTP verification", "email verification"],
      database: ["user management", "authentication records", "verification status"]
    },
    hardPart: "Getting verification state right across four different entry paths without leaving accounts half-created.",
    tradeoff: "Scoped to authentication and identity rather than spreading thin across the whole product.",
    proofMetrics: [{ label: "Auth methods", value: "4", evidence: "Google, Facebook, OTP, email" }],
    links: {},
    nextVersion: [],
    limits: [
      "Private repository — no public artifact.",
      "Contribution was scoped to front-end, authentication, and schema; this is not a claim on the whole platform."
    ]
  }
];

/**
 * Coursework, specializations, and exercises. Real, public, and deliberately
 * held at low prominence — listing them as product work would devalue the
 * entries above.
 */
export const archive: ArchiveEntry[] = [
  {
    name: "Stanford Deep Learning Specialization",
    language: "Jupyter Notebook",
    note: "Assignments from Andrew Ng's Deep Learning Specialization.",
    url: "https://github.com/mozenjii/Stanford-Deep-Learning-Specialization",
    year: "2026"
  },
  {
    name: "MIT Deep Learning Bootcamp",
    language: "Python",
    note: "Bootcamp exercises.",
    url: "https://github.com/mozenjii/MIT-Deep-Learning-Bootcamp",
    year: "2026"
  },
  {
    name: "TicTacToe-AI",
    language: "Python",
    note: "Adversarial search on a solved game.",
    url: "https://github.com/mozenjii/TicTacToe-AI",
    year: "2026"
  },
  {
    name: "Flight Management System",
    language: "C++",
    note: "Systems coursework in C++.",
    url: "https://github.com/mozenjii/Flight-Management-System",
    year: "2026"
  },
  {
    name: "UNO Game",
    language: "C++",
    note: "Object modeling and game-state handling in C++.",
    url: "https://github.com/mozenjii/UNO-Game",
    year: "2026"
  }
];

/**
 * Private repositories, described without links because there is nothing to
 * link to. Named here because a portfolio judged only on public repositories
 * understates the set considerably.
 */
/**
 * Private work, named for a reader rather than for a `git clone`.
 *
 * These are display names, not repository names. "epoches_website" tells a
 * visitor nothing and reads like a directory listing; the Epoches website is a
 * thing they can go and look at, so it says that and links to it.
 *
 * The LinkedIn outreach agents and the algorithms-practice repo were listed
 * here and have been removed at Mohib's request — they are tooling, not
 * portfolio work, and they diluted the three entries that carry weight.
 */
export const privateWork: Array<{ name: string; detail: string; href?: string }> = [
  {
    name: "Epoches website",
    detail: "The production site behind epoches.co — twenty-plus routes, built and shipped end to end.",
    href: "https://epoches.co"
  },
  {
    name: "Priora specification packs",
    detail: "The product and technical packs behind Priora: 33 product files, 44 technical files."
  },
  {
    name: "CareerOps",
    detail: "Generates a tailored resume specification per application."
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const flagshipProjects = projects.filter((project) => project.tier === "flagship");
export const supportingProjects = projects.filter((project) => project.tier === "supporting");
