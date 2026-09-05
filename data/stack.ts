import { projects } from "./projects";

/**
 * Every distinct technology recorded across the project entries. This is the
 * single source of truth for any "how many tools" claim on the site — the
 * number is derived, never typed by hand.
 */
export const uniqueStack = [...new Set(projects.flatMap((project) => project.stack))];

type StackLayer = {
  id: string;
  label: string;
  items: string[];
  accent: "accent" | "warm" | "alert" | "text";
};

/**
 * The recorded stack, grouped by the layer of the system each tool sits in.
 *
 * Item names must match `project.stack` entries exactly. The dev-only check at
 * the bottom fails loudly if a new project introduces a tool that never appears
 * in the breakdown, which is how this file stays honest as projects are added.
 */
export const stackLayers: StackLayer[] = [
  {
    id: "languages",
    label: "Languages & runtimes",
    accent: "accent",
    items: ["Python", "TypeScript", "Node.js"]
  },
  {
    id: "correctness",
    label: "Correctness & verification",
    accent: "warm",
    items: [
      "Typed IR",
      "Expression AST",
      "Mutation testing",
      "pytest",
      "JSON Schema",
      "typing.Protocol",
      "Schema design"
    ]
  },
  {
    id: "architecture",
    label: "Architecture & concurrency",
    accent: "warm",
    items: ["Multiprocessing", "Observer pattern", "Dependency Injection", "Config-driven schemas"]
  },
  {
    id: "data",
    label: "Data & storage",
    accent: "accent",
    items: ["Postgres", "SQL Server", "T-SQL", "Supabase", "Pandas", "Matplotlib", "eCFR XML"]
  },
  {
    id: "ai",
    label: "AI & retrieval",
    accent: "alert",
    items: ["OpenAI", "TF-IDF", "Vector retrieval", "Context engineering"]
  },
  {
    id: "interfaces",
    label: "Interfaces & APIs",
    accent: "text",
    items: ["Next.js", "Express", "REST APIs", "OpenFisca", "Workflow automation", "SEO"]
  },
  {
    id: "identity",
    label: "Auth & identity",
    accent: "text",
    items: ["Authentication", "OAuth", "OTP verification"]
  }
];

/** Largest layer size — used to scale the distribution bars. */
export const largestLayerSize = Math.max(...stackLayers.map((layer) => layer.items.length));

/**
 * Guard against the breakdown drifting out of sync with the project data.
 * Server-side in dev/build only; never ships to the client bundle.
 */
if (process.env.NODE_ENV !== "production") {
  const classified = stackLayers.flatMap((layer) => layer.items);
  const missing = uniqueStack.filter((item) => !classified.includes(item));
  const unknown = classified.filter((item) => !uniqueStack.includes(item));
  const duplicated = classified.filter((item, index) => classified.indexOf(item) !== index);

  if (missing.length || unknown.length || duplicated.length) {
    console.warn(
      "[data/stack] stackLayers is out of sync with project stacks:",
      JSON.stringify({ missing, unknown, duplicated })
    );
  }
}
