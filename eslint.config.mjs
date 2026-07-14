import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Legacy static source — replaced during migration, not part of Next.js app:
    "static/**",
    // Git worktrees created by Claude Code spawn_task — not part of the app:
    ".claude/worktrees/**",
  ]),
]);

export default eslintConfig;
