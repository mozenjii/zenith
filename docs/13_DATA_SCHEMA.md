---
version: 1.0.0
file_role: data_schema
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Data Schema & Contracts

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<typescript_contracts>

```ts
export type PersonaMode = "founder" | "recruiter" | "engineer";

export type SignalCategory =
  | "backend_systems"
  | "ai_data"
  | "product_design"
  | "academic_depth"
  | "metrics"
  | "founder_memo";

export type SignalStage = "learning" | "building" | "shipping" | "future";

export interface SignalNode {
  id: string;
  label: string;
  slug?: string;
  district: string;
  metaphor: string;
  category: SignalCategory;
  stage: SignalStage;
  priority: number;
  coords: [number, number];
  proof: string;
  projectId?: string;
  connectedNodeIds: string[];
  modeRelevance: Record<PersonaMode, number>;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortPitch: string;
  bayNode: string;
  signalType: SignalCategory;
  year: string;
  status: "concept" | "prototype" | "built" | "shipped" | "archived";
  stack: string[];
  problem: string;
  user: string;
  whatIBuilt: string;
  architecture: ArchitectureBlock;
  hardPart: string;
  tradeoff: string;
  proofMetrics: ProofMetric[];
  media: MediaAsset[];
  links: ProjectLinks;
  nextVersion: string[];
}

export interface ArchitectureBlock {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  aiMl?: string[];
  auth?: string[];
  deployment?: string[];
  diagrams?: string[];
}

export interface ProofMetric {
  label: string;
  value: string | number;
  evidence?: string;
}

export interface MediaAsset {
  type: "image" | "video" | "gif" | "diagram";
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
}

export interface ProjectLinks {
  github?: string;
  liveDemo?: string;
  videoDemo?: string;
  resumeRelevant?: boolean;
}
```

</typescript_contracts>

<json_example_project>

```json
{
  "id": "sids",
  "slug": "sids-startup-intelligence",
  "title": "SIDS — Startup Intelligence & Due-Diligence System",
  "shortPitch": "A backend system for startup diligence, market analytics, and investment candidate discovery.",
  "bayNode": "SoMa",
  "signalType": "backend_systems",
  "year": "2026",
  "status": "built",
  "stack": ["Node.js", "Express", "MS SQL Server", "JWT", "Stored Procedures"],
  "problem": "Startup data is fragmented and hard to evaluate without structured diligence workflows.",
  "user": "Analysts, startup evaluators, and investment teams.",
  "whatIBuilt": "A backend with role-based auth, diligence endpoints, market views, and portfolio analytics.",
  "architecture": {
    "backend": ["Express API", "JWT auth", "role middleware"],
    "database": ["Startups", "Funding_Rounds", "Investments", "Funds", "Milestones", "Sources", "Founders"],
    "deployment": ["local/demo-ready"]
  },
  "hardPart": "Turning relational data into useful diligence and market intelligence workflows.",
  "tradeoff": "Used SQL views and stored procedures for clarity and database-side analytics.",
  "proofMetrics": [
    { "label": "SQL objects", "value": "views + stored procedures" },
    { "label": "Auth", "value": "JWT role-based" },
    { "label": "API", "value": "analytics + diligence endpoints" }
  ],
  "media": [
    { "type": "image", "src": "/assets/projects/sids/sids-hero.webp", "alt": "SIDS dashboard/API preview" },
    { "type": "video", "src": "/assets/videos/sids-demo-short.webm", "poster": "/assets/projects/sids/sids-poster.webp", "alt": "SIDS demo video" }
  ],
  "links": {
    "github": "{{github_url}}",
    "liveDemo": "{{live_demo_url}}"
  },
  "nextVersion": ["Add frontend dashboard", "Add richer scoring", "Deploy public demo"]
}
```

</json_example_project>

<signal_score_contract>

```ts
export function calculateSignalScore(project: Project): number {
  let score = 0;
  if (project.links.github) score += 10;
  if (project.links.liveDemo) score += 15;
  if (project.media.some(m => m.type === "video")) score += 10;
  if (project.media.some(m => m.type === "diagram")) score += 8;
  score += Math.min(project.proofMetrics.length * 8, 24);
  if (project.status === "shipped") score += 12;
  if (project.status === "built") score += 8;
  return Math.min(score, 100);
}
```

</signal_score_contract>
