/**
 * Check the artifact, not the intent.
 *
 * The first static export of this site shipped `og:image` pointing at
 * `http://localhost:3000/opengraph-image` and a sitemap full of
 * `https://example.com` URLs, because both had a development fallback that
 * nothing ever overrode. Neither is visible in the source, in a typecheck, or
 * in a lint pass — they only exist in the built output, which is why the check
 * belongs here.
 *
 * Runs as npm's `postbuild`, so `npm run build` cannot succeed while a
 * placeholder host is present in what would be uploaded.
 */

import { copyFile, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const OUT = "out";

/** Hosts that mean "nobody filled this in". */
const FORBIDDEN = ["localhost:3000", "127.0.0.1", "example.com", "your-domain"];

/** Only text the crawler or a social card reads; skip the JS bundles. */
const EXTENSIONS = new Set([".html", ".xml", ".txt", ".json", ".webmanifest"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // _next holds hashed build output, not authored URLs.
      if (entry.name === "_next") continue;
      yield* walk(full);
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      yield full;
    }
  }
}

/**
 * Flatten Next's RSC prefetch segments so a plain static host can serve them.
 *
 * Next 16's client segment cache asks for a prefetch payload at a dot-joined
 * path — `/work/__next.work.__PAGE__.txt` — but `output: "export"` writes it as
 * a nested directory, `out/work/__next.work/__PAGE__.txt`. On Vercel a routing
 * rule reconciles the two. On a filesystem-backed host nothing does, so every
 * `<Link>` prefetch 404s.
 *
 * It degrades quietly rather than breaking: navigation still works, it just
 * falls back to a full fetch and logs two console errors per page. Which is
 * exactly why it is worth fixing — nothing about it is visible until you open
 * the console on the deployed site.
 *
 * So: for every directory named `__next.*`, write a sibling copy of each file
 * beneath it with the path segments dot-joined. Recursive, because the dynamic
 * route nests a second level (`__next.work/$d$slug/...`). The originals are
 * left in place; they are a few KB and removing them buys nothing.
 */
async function flattenSegments(dir) {
  let written = 0;

  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;

    if (entry.name.startsWith("__next.")) {
      written += await copyFlattened(full, path.dirname(full), entry.name);
    } else if (entry.name !== "_next") {
      written += await flattenSegments(full);
    }
  }

  return written;
}

/** Copy everything under `dir` to `target/<prefix>.<joined path>`. */
async function copyFlattened(dir, target, prefix) {
  let written = 0;

  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      written += await copyFlattened(full, target, `${prefix}.${entry.name}`);
    } else {
      await copyFile(full, path.join(target, `${prefix}.${entry.name}`));
      written += 1;
    }
  }

  return written;
}

const flattened = await flattenSegments(OUT);
console.log(`postbuild: flattened ${flattened} RSC prefetch segments`);

const failures = [];
let scanned = 0;

for await (const file of walk(OUT)) {
  scanned += 1;
  const text = await readFile(file, "utf8");
  for (const needle of FORBIDDEN) {
    if (text.includes(needle)) {
      failures.push(`${file}: contains "${needle}"`);
    }
  }
}

if (failures.length > 0) {
  console.error(`\npostbuild: placeholder host in exported output\n`);
  for (const failure of failures.slice(0, 20)) console.error(`  ${failure}`);
  if (failures.length > 20) console.error(`  ... and ${failures.length - 20} more`);
  console.error(`\nSet the canonical URL in config/site.ts, then rebuild.\n`);
  process.exit(1);
}

console.log(`postbuild: ${scanned} files scanned, no placeholder hosts`);
