import type { CategoryStyle, SignalCategory } from "./types";

/**
 * What kind of work a project is.
 *
 * Two colors, not three. Red is the default and carries everything that was
 * built and shipped; yellow is reserved for research, mathematics and
 * foundations. Cyan was retired: it split the accent budget three ways, so red
 * never accumulated enough presence on the page to read as the site's color,
 * which is the entire point of having one.
 *
 * Meaning survives the cut because the distinction that matters here is
 * engineering versus research, and that is exactly the line these two draw.
 */
export const categoryStyles: Record<SignalCategory, CategoryStyle> = {
  backend_systems: {
    label: "Systems",
    shortLabel: "Systems",
    color: "var(--red)",
    description: "Compilers, APIs, data models, pipelines, and operational workflows."
  },
  ai_data: {
    label: "AI & Data",
    shortLabel: "AI",
    color: "var(--red)",
    description: "Model-assisted workflows, extraction, and retrieval — with the determinism boundary stated."
  },
  product_design: {
    label: "Product",
    shortLabel: "Product",
    color: "var(--red)",
    description: "Shipped products, interfaces, and the commercial work around them."
  },
  academic_depth: {
    label: "Foundations",
    shortLabel: "Foundations",
    color: "var(--yellow)",
    description: "Mathematics, algorithms, architecture fundamentals, and coursework."
  },
  metrics: {
    label: "Evidence",
    shortLabel: "Evidence",
    color: "var(--yellow)",
    description: "Repositories, tests, recorded outputs, and verifiable outcomes."
  }
};
