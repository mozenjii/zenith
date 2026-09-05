import type { CategoryStyle, SignalCategory } from "./types";

/**
 * What kind of work a project is. Colors map to the accent tokens in
 * app/globals.css and carry meaning rather than mood:
 *
 *   accent (teal)  systems and interfaces you can run
 *   warm  (amber)  research, mathematics, and foundations
 *   alert (red)    AI and data, where the claims need the most care
 *
 * `founder_memo` was removed with the /memo page, and `bayNode` went with the
 * Bay Area map metaphor. Both were decoration that needed explaining.
 */
export const categoryStyles: Record<SignalCategory, CategoryStyle> = {
  backend_systems: {
    label: "Systems",
    shortLabel: "Systems",
    color: "var(--accent)",
    description: "Compilers, APIs, data models, pipelines, and operational workflows."
  },
  ai_data: {
    label: "AI & Data",
    shortLabel: "AI",
    color: "var(--alert)",
    description: "Model-assisted workflows, extraction, and retrieval — with the determinism boundary stated."
  },
  product_design: {
    label: "Product",
    shortLabel: "Product",
    color: "var(--text)",
    description: "Shipped products, interfaces, and the commercial work around them."
  },
  academic_depth: {
    label: "Foundations",
    shortLabel: "Foundations",
    color: "var(--warm)",
    description: "Mathematics, algorithms, architecture fundamentals, and coursework."
  },
  metrics: {
    label: "Evidence",
    shortLabel: "Evidence",
    color: "var(--warm)",
    description: "Repositories, tests, recorded outputs, and verifiable outcomes."
  }
};
