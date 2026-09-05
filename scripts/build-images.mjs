/**
 * Pre-generate the responsive image variants.
 *
 * The site ships as `output: "export"`, and Next.js has no image optimizer in a
 * static export — there is no server left to run one on. The usual fallback,
 * `images: { unoptimized: true }`, ships the full-size original to every
 * visitor: a phone would download the 1200x1600 hero portrait to display it at
 * 420px wide.
 *
 * So the optimization moves to build time, which for a static site is strictly
 * better than doing it per-request anyway: every variant is computed once,
 * committed, and served as an immutable asset with no cold start and no cache
 * miss. The output is consumed by components/ui/Portrait.tsx.
 *
 * AVIF first, WebP second, JPEG last. AVIF is roughly a third of the JPEG at
 * matched quality; the other two exist because a portfolio gets opened on
 * whatever browser the reader happens to have, and a missing portrait is a
 * worse outcome than a larger one.
 *
 * Variants are committed to the repository on purpose. AVIF encoding is slow
 * enough that regenerating it in CI would dominate the build, and the inputs
 * change roughly never.
 */

import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PROFILE_DIR = "public/assets/profile";
const OUT_DIR = path.join(PROFILE_DIR, "derived");

/*
  The manifest lives in config/, not next to the images, because the app imports
  it and public/ is for things that get served. It records the intrinsic size of
  each image alongside its generated widths, which makes it the single source of
  truth for both this script and components/ui/Portrait.tsx — a component that
  hardcoded 1200x1600 could silently disagree with what was actually written.
*/
const MANIFEST = "config/images.json";

/**
 * Widths are derived from how each image is actually laid out, not from a
 * generic ladder. Generating sizes nothing requests is wasted bytes in the
 * repository and a longer build for no reader benefit.
 *
 *   portrait  desktop plate at 60vw, and the mobile block capped at 420px.
 *             840 = 420 at 2x. 1200 is the source width and the ceiling;
 *             upscaling past it would invent detail.
 *   square    /about renders it at 300px. 600 = 300 at 2x.
 */
const SOURCES = [
  { file: "portrait.jpg", widths: [420, 640, 840, 1200] },
  { file: "portrait-square.jpg", widths: [300, 600] }
];

/*
  Quality per format, not one number for all three. These are not interchangeable
  scales: AVIF at 50 is visually comparable to JPEG at about 75, and using JPEG's
  number for AVIF triples the file for no visible gain.
*/
const FORMATS = [
  { ext: "avif", encode: (img) => img.avif({ quality: 52, effort: 6 }) },
  { ext: "webp", encode: (img) => img.webp({ quality: 76 }) },
  { ext: "jpg", encode: (img) => img.jpeg({ quality: 80, mozjpeg: true }) }
];

/**
 * Skip work when the inputs have not moved.
 *
 * Keyed on a hash of the source bytes plus the recipe, so editing the width
 * list or a quality setting invalidates it just as replacing the photograph
 * does. An mtime check alone would miss both of those.
 */
async function isFresh(key) {
  try {
    const previous = JSON.parse(await readFile(MANIFEST, "utf8"));
    if (previous.key !== key) return false;
    // The manifest can outlive the files it describes — a stale `out/`, a
    // partial checkout, someone clearing the directory by hand.
    const present = new Set(await readdir(OUT_DIR));
    return previous.files.every((file) => present.has(file));
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const recipe = JSON.stringify({ SOURCES, formats: FORMATS.map((f) => f.ext) });
  const hash = createHash("sha256").update(recipe);
  for (const source of SOURCES) {
    hash.update(await readFile(path.join(PROFILE_DIR, source.file)));
  }
  const key = hash.digest("hex").slice(0, 16);

  if (await isFresh(key)) {
    console.log(`images: up to date (${key})`);
    return;
  }

  const files = [];
  const images = {};
  let bytes = 0;

  for (const source of SOURCES) {
    const input = path.join(PROFILE_DIR, source.file);
    const base = path.basename(source.file, path.extname(source.file));
    const meta = await sharp(input).metadata();

    /*
      Only widths the source can actually supply. `withoutEnlargement` below
      would otherwise emit a file smaller than its name claims, and then the
      srcset would lie to the browser about what it is downloading — a worse
      failure than simply not offering that width.
    */
    const widths = source.widths.filter((width) => {
      if (width <= meta.width) return true;
      console.warn(`images: skipping ${base}-${width}, source is only ${meta.width}px wide`);
      return false;
    });

    for (const width of widths) {
      for (const format of FORMATS) {
        const name = `${base}-${width}.${format.ext}`;
        const out = await format
          .encode(sharp(input).resize({ width, withoutEnlargement: true }))
          .toBuffer();
        await writeFile(path.join(OUT_DIR, name), out);
        files.push(name);
        bytes += out.length;
      }
    }

    /*
      Intrinsic size for the width/height attributes, measured from the largest
      variant that was actually written rather than from the source. The browser
      reserves space from this ratio, so it has to describe a file that exists.
    */
    const largest = widths[widths.length - 1];
    images[base] = {
      widths,
      width: largest,
      height: Math.round((largest / meta.width) * meta.height)
    };
  }

  await writeFile(MANIFEST, `${JSON.stringify({ key, images, files }, null, 2)}
`);

  console.log(
    `images: wrote ${files.length} variants, ${(bytes / 1024).toFixed(0)}KB total (${key})`
  );
}

await main();
