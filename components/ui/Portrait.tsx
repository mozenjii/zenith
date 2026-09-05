import manifest from "@/config/images.json";

/**
 * The photograph, in three formats and every width it is actually rendered at.
 *
 * This replaces `next/image`, which has no optimizer under `output: "export"` —
 * there is no server left to run one on. The alternative Next offers,
 * `images: { unoptimized: true }`, hands the full 1200x1600 original to a phone
 * that will display it 420px wide. So the work moved to build time
 * (`scripts/build-images.mjs`), which for a permanently static site is the
 * better place for it: every variant is computed once and served as an
 * immutable asset, with no cold start and nothing to invalidate.
 *
 * Widths and intrinsic dimensions are read from `config/images.json`, written
 * by that script. Hardcoding them here is how the srcset ends up advertising a
 * width nobody generated.
 *
 * Source order is the negotiation order: AVIF (about a third of the JPEG at
 * matched quality), then WebP, then JPEG for whatever the reader actually has.
 * A portfolio gets opened on old browsers, and a missing portrait is a worse
 * outcome than a larger one.
 */
export function Portrait({
  base,
  sizes,
  alt,
  priority = false,
  className = ""
}: {
  base: keyof typeof manifest.images;
  /** How wide the image renders. Wrong here means the browser picks wrong. */
  sizes: string;
  /** Empty string only where an adjacent copy of this image carries the alt. */
  alt: string;
  /** Sets eager loading and high fetch priority. For the LCP image only. */
  priority?: boolean;
  className?: string;
}) {
  const { widths, width, height } = manifest.images[base];
  const srcSet = (ext: string) =>
    widths.map((w) => `/assets/profile/derived/${base}-${w}.${ext} ${w}w`).join(", ");

  return (
    /*
      `display: contents` so the <img> participates in the parent's layout
      exactly as the old next/image did. <picture> is an inline wrapper by
      default, which silently breaks `h-full` on the image inside it — the
      desktop hero plate sizes itself against the section, so that would have
      collapsed it to zero height.
    */
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`/assets/profile/derived/${base}-${widths[widths.length - 1]}.jpg`}
        srcSet={srcSet("jpg")}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        /* width/height are here for the aspect ratio, not the rendered size —
           CSS overrides both. Without them the page reflows when the image
           lands, which on the hero is the worst possible place for it. */
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={className}
      />
    </picture>
  );
}
