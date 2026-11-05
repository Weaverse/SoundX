# Foundation Review Remediation Plan

Status: In progress
Owner: @HoangHuy1305HP
Source: https://github.com/Weaverse/tech/pull/10

## Working Approach

- Work on `feat/storefront-foundation` in its separate worktree.
- Preserve the uncommitted design-system work in the original directory.
- Explain each change before implementation, then inspect and verify it.
- Keep changes focused on the foundation review.
- Update work logs with actual changes and verification results.
- Commit and push only when the user authorizes that step.

## 1. Repository Guidance and Spec

- [x] Add Tech architecture and tooling guidance to root `AGENTS.md`.
- [x] Preserve the Next.js-generated guidance block.
- [x] Add internal SDD guidance in `.weaverse/AGENTS.md`.
- [x] Add the spec README, implementation plan, and work logs.
- [x] Move capability boundaries, decisions, and status out of root README.

Verification:
- Read all documents for consistency with issue #1 and the corrected review.
- Confirm planned features are not described as already implemented.
- Keep this plan under 500 lines.
- Inspect the documentation diff for accidental runtime changes.

## 2. TextBlock and Studio Attributes

- [x] Add `WeaverseElementProps` and `elementAttributes()`.
- [x] Forward safe identity and accessibility attributes to the section root.
- [x] Handle `className` separately.
- [x] Keep authored settings and `loaderData` off the DOM.
- [x] Change the heading input label to `Heading`.
- [x] Add the schema default and align the preset with it.
- [x] Remove the conflicting component default.
- [x] Add focused rendered-output regression coverage.

Verification:
- Confirm Studio identity attributes reach the outermost element.
- Confirm settings and loader data do not become HTML attributes.
- Check className and accessibility attributes.
- Verify Studio selection, outline, and heading edits in the browser.

## 3. Client and Server Registries

- [ ] Keep `"use client"` and `entry()` in the client render registry.
- [ ] Add a schema-only list.
- [ ] Add `server-components.ts` with `import "server-only"`.
- [ ] Use a `NO_RENDER` default stub in the server registry.
- [ ] Attach server loaders only where a section requires them.
- [ ] Remove render-module imports from the server client setup.
- [ ] Add registry consistency coverage.

Verification:
- Confirm client and server registrations contain matching section types.
- Confirm the server registry does not import the render registry.
- Confirm server loaders do not enter the browser import graph.
- Run typecheck and production build after the registry change.

## 4. Environment and Project Identity

- [ ] Add an explicit Weaverse environment helper.
- [ ] Cover every environment key read by the installed SDK.
- [ ] Supply explicit empty values for absent or suppressed SDK keys.
- [ ] Keep private Shopify credentials out of the SDK environment object.
- [ ] Add `PUBLIC_STOREFRONT_API_TOKEN` to `.env.example` and setup docs.
- [ ] Keep the environment project gate.
- [ ] Prefer the payload project id on the client, with a configured fallback.

Verification:
- Test missing and configured project ids.
- Test a payload project id that differs from the configured fallback.
- Test that private credentials never enter SDK/public payloads.
- Verify the SDK key list against the installed package.
- Use synthetic values in tests; never log real credentials.

## 5. Request Context and Page Loading

- [ ] Extract pure `buildRequestContext()` into `request-info.ts`.
- [ ] Preserve repeated query values, pathname, page type, handle, and locale.
- [ ] Avoid a trailing `?` when the query is empty.
- [ ] Keep the HTTP protocol fallback from the corrected review.
- [ ] Replace the Home-specific loader with `loadWeaversePage()`.
- [ ] Mark the server integration module with `import "server-only"`.
- [ ] Catch page-loading failures and return `null`.
- [ ] Translate `null` into `notFound()` in the route.
- [ ] Add an error boundary for otherwise unhandled application errors.
- [ ] Remove hardcoded shopper-facing fallback copy from the Home route.

Verification:
- Test request identity, query arrays, URL construction, and locale.
- Test missing configuration, missing page, and rejected page loads.
- Confirm the route chooses the page type rather than hardcoding it twice.
- Check behavior in standalone and Studio previews.
- Ensure error output contains no credentials.

## 6. Cache Policy

- [ ] Inspect the installed Next.js and Weaverse cache behavior.
- [ ] Select published-data revalidation lifetimes and tags.
- [ ] Preserve the SDK's design/revision no-store behavior.
- [ ] Document the purpose of `cacheComponents`, or remove it if unnecessary.
- [ ] Record the chosen policy and its limitations in the spec.

Verification:
- Confirm published requests receive the intended cache options.
- Confirm design/revision requests remain fresh.
- Verify observed behavior rather than assuming every preview flag is identical.

## 7. Hydrogen and Shopify Read

- [ ] Follow the installed/generated Hydrogen guidance for Next.js.
- [ ] Add a compatible Hydrogen dependency and update `bun.lock`.
- [ ] Centralize Shopify environment validation.
- [ ] Create the server-owned `private_no_buyer_context` storefront client.
- [ ] Keep raw Shopify access behind the storefront data boundary.
- [ ] Add one real read through application code.
- [ ] Keep this read independent of Weaverse's SDK environment.

Verification:
- Test environment validation and sanitized error handling.
- Run applicable Hydrogen GraphQL validation.
- Verify a successful application read against the designated demo store.
- Confirm private tokens stay out of browser code and serialized output.
- Record the live verification result without credentials.

## 8. Tooling and Code Conventions

- [ ] Add Biome configuration and dependency.
- [ ] Replace ESLint scripts and remove unused ESLint dependencies/config.
- [ ] Add `format` and `format:check`.
- [ ] Add the focused test scripts needed by this foundation.
- [ ] Add `src/lib/cn.ts` for conditional class composition.
- [ ] Apply the requested let/ALL_CAPS-const convention to touched code.
- [ ] Align Node types with the chosen runtime.
- [ ] Remove unsupported `ignoreScripts`.
- [ ] Keep dependencies, lockfile, guidance, and scripts consistent.
- [ ] Add format and test checks to CI.
- [ ] Remove the feature-branch push trigger that duplicates PR checks.

Verification:
- Run frozen-lockfile installation, lint, format check, tests, typecheck,
  and production build.
- Inspect workflow triggers and check commands.
- Confirm documented commands exist and run successfully.

## 9. Cleanup and Final Verification

- [ ] Replace scaffold metadata.
- [ ] Resolve unused/overridden scaffold fonts without importing unrelated
      design-system changes.
- [ ] Remove unused scaffold SVGs after checking references.
- [ ] Remove duplicate ignore patterns and preserve `.env.example`.
- [ ] Remove branch-specific setup instructions from root README.
- [ ] Replace the deployment-specific README URL with a stable preview alias.
- [ ] Keep root README focused on setup and usage.
- [ ] Record deferred work and unresolved decisions in the spec.
- [ ] Inspect the complete diff and rerun checks affected by final changes.

Verification:
- Complete the implemented quality gates.
- Verify the Home page and Studio editing behavior.
- Verify the application Shopify read.
- Confirm no secrets, environment files, or generated build output are staged.
- Confirm the original design-system working directory remains intact.

## 10. PR Update

- [ ] Record final results and limitations in work logs.
- [ ] Commit and push to `feat/storefront-foundation` when authorized.
- [ ] Update the PR description around the final implementation.
- [ ] Check CI results for the pushed revision.
- [ ] Prepare a mapping of review comments to changes and verification.

## Files Touched

Paths below are planned. Confirm names during implementation and update this
list when scope changes.

| Area | Existing files | Planned additions |
| --- | --- | --- |
| Guidance | `AGENTS.md` | `.weaverse/AGENTS.md` |
| Spec | — | `.weaverse/specs/2026-11-05--theme-foundation/{README.md,plan.md,work-logs.md}` |
| Section | `src/sections/text-block/index.tsx`, `schema.ts` | `src/sections/weaverse-element.ts` |
| Registry | `src/lib/weaverse/components.ts`, `server.ts` | `section-schemas.ts`, `server-components.ts` in the same directory |
| Env and requests | `.env.example`, `src/lib/weaverse/request-context.ts` | `env.ts`, `request-info.ts` under `src/lib/weaverse/` |
| Rendering | `src/lib/weaverse/page.tsx`, `src/app/page.tsx`, `layout.tsx` | `src/app/error.tsx`, optional `not-found.tsx` |
| Shopify | `package.json`, `bun.lock` | Minimal modules under `src/lib/storefront/` and `src/lib/storefront/shopify/` |
| Tooling | `package.json`, `bun.lock`, `.github/workflows/ci.yml`, `next.config.ts` | `biome.json`, `src/lib/cn.ts`, focused tests and test configuration |
| Cleanup | `README.md`, `.gitignore`, `src/app/globals.css`, unused `public/*.svg` | — |

Remove `eslint.config.mjs` when the Biome migration is complete.

## Deferred Work

- Full catalog, search, filtering, cart, and account experiences.
- Multi-market routing and localization UI.
- Root theme settings/provider integration, followed by header/footer work.
- Resource-backed section revalidation when such sections are introduced.
- Vercel Protection Bypass evaluation; no protection setting changes in this plan.

## Pending Decisions

- Resolve design questions through issue #9 before affected UI work.
- Confirm initial commerce/account scope and supported markets.
- Confirm merchant-editable global settings.
- Select cache lifetimes and tags during step 6.
