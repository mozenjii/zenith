export type SignalCategory =
  | "backend_systems"
  | "ai_data"
  | "product_design"
  | "academic_depth"
  | "metrics";

export type ProjectStatus = "concept" | "prototype" | "built" | "shipped" | "archived";

/**
 * Whether a reader can actually open the source. Most of the substantial work
 * is private, so this is stated rather than implied - a portfolio judged only
 * on public repositories understates the set considerably, and pretending
 * otherwise is the alternative failure.
 */
export type Visibility = "public" | "private" | "partly-public";

/**
 * `flagship` projects get a full case study. `supporting` are real but smaller.
 * `archive` is coursework and exercises, listed for completeness at low
 * prominence rather than dressed up as product work.
 */
export type ProjectTier = "flagship" | "supporting" | "archive";

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
  /** Where a reader can verify this. A metric with no evidence is not a metric. */
  evidence?: string;
}

export interface MediaAsset {
  type: "image" | "video" | "gif" | "diagram";
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
  status?: "available" | "pending";
}

export interface ProjectLinks {
  github?: string;
  liveDemo?: string;
  videoDemo?: string;
  docs?: string;
  resumeRelevant?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortPitch: string;
  signalType: SignalCategory;
  year: string;
  status: ProjectStatus;
  visibility: Visibility;
  tier: ProjectTier;
  /** License, where the repository declares one. */
  license?: string;
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
  /**
   * What is NOT built or NOT proven. Required on every flagship project.
   * A project page without this is incomplete, not finished.
   */
  limits: string[];
  whatBroke?: string;
}

export interface CategoryStyle {
  label: string;
  shortLabel: string;
  color: string;
  description: string;
}

/** Coursework and exercises. Listed, not dressed up. */
export interface ArchiveEntry {
  name: string;
  language: string;
  note: string;
  url: string;
  year: string;
}
