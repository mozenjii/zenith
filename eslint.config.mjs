import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([
    /*
      Any build output directory, not just `.next`.

      next.config.ts deliberately supports NEXT_DIST_DIR so a verification build
      can run without disturbing a live dev server:

        NEXT_DIST_DIR=.next-verify npm run build

      The ignore list only covered `.next/**`, so the moment anyone used that
      documented workflow, eslint started linting the emitted bundle — 4,592
      problems from generated code, drowning the handful that were real.
    */
    ".next*/**",
    "out/**",
    "dist/**",
    "next-env.d.ts"
  ])
]);
