# Move SoundX to @weaverse/hydrogen/next

- Status: implemented; deployment verification pending
- Owner: @HoangHuy1305HP
- Issue: https://github.com/Weaverse/SoundX/issues/16
- Branch: `codex/weaverse-sdk-v6`
- Created: 2026-11-11
- Last Updated: 2026-11-11

## Original Prompt

Source: https://github.com/Weaverse/SoundX/issues/16 (request supplied by the developer).

> Related to Weaverse/weaverse#543.
>
> SoundX depends on `@weaverse/next` 1.0.1 directly. Weaverse SDK 6 ships the Next.js adapter as entry points of one package, `@weaverse/hydrogen/next` and `@weaverse/hydrogen/next/server`, and `@weaverse/next` is planned to become a deprecated re-export (Weaverse/weaverse#581). Forward made the same move in Weaverse/forward#118; follow it.
>
> - Depend on `@weaverse/hydrogen` (6.1.2 or later; it pins its own `@weaverse/next` and `@weaverse/react`, so drop the direct `@weaverse/next` dependency).
> - Rewrite imports with `npx @weaverse/cli@latest migrate v6` (`@weaverse/next` → `@weaverse/hydrogen/next`, `@weaverse/next/server` → `@weaverse/hydrogen/next/server`).
> - Update docs, agent instructions, lint rules and tests that name `@weaverse/next`.
> - Typecheck, tests and `next build` pass; check the live site and the Weaverse Studio preview (select and edit sections, theme settings, translations, publish).

## Summary

Pin `@weaverse/hydrogen` to 6.1.2 and use its Next.js entries, following https://github.com/Weaverse/forward/pull/118. Preserve the server/client registry, request context and explicit environment boundary.

The developer reports automated checks, local rendering, Studio section additions/edits and publishing passed. Theme settings and translations are not implemented in this baseline and remain unverified. Verification of a deployment containing this migration is pending. Issue #2 stays in a separate worktree.
