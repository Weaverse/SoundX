# Plan

## Implementation

1. Use a clean worktree from `origin/main`, separate from issue #2.
2. Pin `@weaverse/hydrogen` 6.2.0, remove direct and transitive `@weaverse/next`, update `bun.lock`.
3. Run the v6 CLI migration; review source imports and test mocks.
4. Update AGENTS guidance and Biome import restrictions.
5. Read `next-server.mjs` and `next-server.js` directly from `@weaverse/hydrogen` in the environment test.
6. Record verification and review the final diff before commit.

## Verification

- Initial 6.1.2 developer-run checks: `bun run format:check`, `bun run lint`, `bun run typecheck`, `bun run test`, `bun run build`.
- Developer reports the focused environment test: 5 pass, 0 fail.
- Developer reports local rendering and successful Studio section additions/edits and publishing.
- Theme settings and translations: not verified; integrations are not implemented in this baseline.
- Deployment containing this migration: pending after push/deploy.
- Assistant final diff and whitespace review: passed.

- Assistant-run 6.2.0 checks: format, lint, typecheck (including GraphQL), 33 tests and production build passed.
- Assistant verified 6.2.0 Studio rendering, section selection from outline/preview, live text editing and restoration.
- Publishing on 6.2.0: passed, confirmed by the developer after the assistant verification.
- Confirmed the three reviewer-requested SDK helpers are exported; no custom equivalent exists in SoundX to replace.

## Deferred Work

- Verify the deployment containing this migration and its Studio preview when available.
- Test theme settings and translations when implemented; do not add those features to this migration.
- Preserve historical specs containing old package references.

## Files Touched

- `package.json`, `bun.lock`: SDK dependency replacement.
- `src/app/layout.tsx`, existing modules in `src/lib/weaverse/`, `src/sections/text-block/schema.ts`: adapter import paths only.
- `tests/fixtures/weaverse-server.mjs`, `tests/weaverse-project-id.test.ts`: migrated mocks/imports.
- `tests/weaverse-env.test.ts`: dependency-scoped adapter resolution.
- `AGENTS.md`, `biome.json`: guidance and import restrictions.
- `.weaverse/specs/2026-11-11--weaverse-hydrogen-next/`: scope and evidence.
