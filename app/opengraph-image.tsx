import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

/**
 * Social card, rebuilt for the editorial direction. The previous version was
 * the neo-brutalist one — hard offsets, rotated stickers, "PROOF OF WORK / 2026".
 *
 * The graphic on the right is P(n,3) with n = 10, drawn from the same vertex
 * and edge definition as the live instrument: outer cycle, spokes, and step-3
 * inner chords. Computed here rather than imported, because `next/og` runs in
 * an edge runtime that cannot reach a canvas.
 */
const N = 10;
const STEP = 3;

function ring(radius: number, cx: number, cy: number) {
  return Array.from({ length: N }, (_, i) => {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(a) * radius, y: cy + Math.sin(a) * radius };
  });
}

export default function Image() {
  const cx = 915;
  const cy = 315;
  const outer = ring(215, cx, cy);
  const inner = ring(116, cx, cy);

  const edges: Array<{ a: { x: number; y: number }; b: { x: number; y: number }; kind: number }> = [];
  for (let i = 0; i < N; i += 1) {
    edges.push({ a: outer[i], b: outer[(i + 1) % N], kind: 0 });
    edges.push({ a: outer[i], b: inner[i], kind: 1 });
    edges.push({ a: inner[i], b: inner[(i + STEP) % N], kind: 2 });
  }

  const stroke = ["#f4f1ec", "#5ad0c4", "#e8a33d"];
  const width = [1.6, 1, 2];
  const opacity = [0.5, 0.3, 0.95];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#08090a",
          color: "#f4f1ec",
          fontFamily: "Georgia, serif"
        }}
      >
        {/* Edges, as absolutely-positioned rotated rectangles — satori supports
            no SVG line primitives, so each edge is a 1px div rotated into place. */}
        {edges.map((edge, index) => {
          const dx = edge.b.x - edge.a.x;
          const dy = edge.b.y - edge.a.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: edge.a.x,
                top: edge.a.y,
                width: length,
                height: width[edge.kind],
                background: stroke[edge.kind],
                opacity: opacity[edge.kind],
                transform: `rotate(${angle}deg)`,
                transformOrigin: "0 0"
              }}
            />
          );
        })}

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: 700,
            padding: "96px 0 0 72px"
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: 19,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#5ad0c4"
            }}
          >
            {profile.current.role} · {profile.current.org}
          </div>

          <div style={{ display: "flex", marginTop: 34, fontSize: 96, lineHeight: 1 }}>Mohib Ahmad</div>

          <div style={{ display: "flex", marginTop: 30, maxWidth: 580, fontSize: 29, lineHeight: 1.35, color: "#b8b2a9" }}>
            {profile.headline}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 44,
              gap: 10,
              fontFamily: "monospace",
              fontSize: 16,
              color: "#8a857e"
            }}
          >
            {["Rules-as-code compiler", "Healthcare AI", "Preprint, math.CO"].map((item) => (
              <div
                key={item}
                style={{
                  padding: "8px 13px",
                  border: "1px solid #252a30",
                  borderRadius: 2
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 72,
            bottom: 46,
            display: "flex",
            fontFamily: "monospace",
            fontSize: 17,
            color: "#e8a33d"
          }}
        >
          M(P(n,3)) = Z(P(n,3)) = 8
        </div>
      </div>
    ),
    size
  );
}
