# Plan

## Implementation

1. Use a clean worktree from `origin/main`, separate from issue #2.
2. Pin `@weaverse/hydrogen` 6.1.2, remove direct `@weaverse/next`, update `bun.lock`.
3. Run the v6 CLI migration; review source imports and test mocks.
4. Update AGENTS guidance and Biome import restrictions.
5. Resolve the adapter through its owning SDK dependency in the environment test, retaining both server bundle checks.
6. Record verification and review the final diff before commit.

## Verification

- Developer reports passing: `bun run format:check`, `bun run lint`, `bun run typecheck`, `bun run test`, `bun run build`.
- Developer reports the focused environment test: 5 pass, 0 fail.
- Developer reports local rendering and successful Studio section additions/edits and publishing.
- Theme settings and translations: not verified; integrations are not implemented in this baseline.
- Deployment containing this migration: pending after push/deploy.
- Assistant final diff and whitespace review: passed.

## Deferred Work

- Verify the migration deployment and Studio preview when available.
- Test theme settings and translations when implemented; do not add those features to this migration.
- Preserve historical specs containing old package references.

## Files Touched

- `package.json`, `bun.lock`: SDK dependency replacement.
- `src/app/layout.tsx`, existing modules in `src/lib/weaverse/`, `src/sections/text-block/schema.ts`: adapter import paths only.
- `tests/fixtures/weaverse-server.mjs`, `tests/weaverse-project-id.test.ts`: migrated mocks/imports.
- `tests/weaverse-env.test.ts`: dependency-scoped adapter resolution.
- `AGENTS.md`, `biome.json`: guidance and import restrictions.
- `.weaverse/specs/2026-11-11--weaverse-hydrogen-next/`: scope and evidence.
