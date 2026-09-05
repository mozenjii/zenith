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

import { readFile, readdir } from "node:fs/promises";
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
