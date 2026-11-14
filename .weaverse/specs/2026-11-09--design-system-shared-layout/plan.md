# Implementation plan

## Shared controls review

- [x] Read repository guidance and compare class composition with Forward.
- [x] Review typography/color guides and concrete Figma controls.
- [x] Replace remaining array-based class composition with `cn()`.
- [x] Align variable declarations with repository conventions in touched controls.
- [x] Remove the unsupported 4px message-textarea hover radius.
- [x] Record missing or proposed UI states for designer review.
- [ ] Verify focus, hover and activation in the browser on desktop/tablet/mobile.
- [ ] Obtain designer confirmation for outstanding UI decisions.

## Subsequent issue work

- [ ] Complete form-control inventory, including NumberInput.
- [ ] Build badges and reusable product-card presentation.
- [ ] Implement shared layout and Shopify-managed navigation.
- [ ] Expose shared appearance and global content settings in Studio.
- [ ] Verify navigation/locale continuity and request design review.

## Files touched in this review

- `src/app/layout.tsx` and `src/app/fonts/` (bundled font loading repair).
- `src/components/ui/quantity-input.tsx` (basic local quantity interactions).
- `src/components/icon.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/input-underline.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/checkbox.tsx`
- `src/components/ui/input-action-demo.tsx` (formatting only)
- This spec folder (`README.md`, `plan.md`, `work-logs.md`).

## Verification

Run formatting, lint, typecheck and existing tests. Build after type generation
finishes. Record actual outcomes in work logs. Keep unrelated worktree changes
intact. No commit, push or deployment is included in this review.


## 2026-11-13 Header checkpoint

Header settings, server navigation query and the initial Header presentation have been added collaboratively. The mobile/tablet drawer is now connected with recursive accordion navigation, native dialog behavior and optional Studio-managed contact content. Exact Figma icon assets are local. This is an implementation checkpoint, not full issue acceptance: responsive visual QA, complete modal interaction checks, route availability, live menu-handle refresh, desktop mega menu and the search/market/cart integrations remain pending. See work-logs.md for checks actually run.


## 2026-11-13 hardening after Footer composition

- [x] Correct payment group semantics and format production sources.
- [x] Fetch initial header/footer/legal menus concurrently; isolate failures.
- [x] Add a same-origin navigation endpoint and cancelable client refresh for
  settings changes without importing Shopify server code into render components.
- [x] Support remote merchant logos without an unrestricted optimizer allowlist.
- [x] Scale the Footer wordmark within the available container width.
- [x] Add navigation normalization, invalid-handle and sanitized-error tests.
- [ ] Browser/Studio QA: change each menu handle, switch back, rapidly change
  handles, verify missing-menu behavior and upload custom logos.
- [ ] Recheck 360/390/430/834/1440px geometry and keyboard interaction.
- [ ] Confirm production build in the developer terminal; agent execution still
  encounters a Turbopack process/bind-port permission failure.

Additional files: `src/app/api/navigation/route.ts`,
`src/lib/storefront/use-navigation.ts`, Shopify `client.ts`/`navigation.ts`,
Header/Footer connected and logo components, Footer bottom bar, root layout,
`tests/shopify-navigation.test.ts` and its isolated fixture.


## 2026-11-14 shared appearance verification

- [x] Wire page width, 32 existing global colors, role-based font families and
  shared Button radius through ThemeStyles and runtime CSS variables.
- [x] Validate finite numeric bounds, permitted font values and hexadecimal colors.
- [x] Update the TextBlock identity regression for its section wrapper while
  retaining outer Studio attributes, presentation class and semantic heading checks.
- [x] Add five isolated appearance CSS regression cases.
- [x] Run format:check, lint, typecheck/GraphQL and tests (43 passed).
- [x] Check local storefront render and live Studio font/radius controls; restore
  original settings (Heading Inter, Body Open Sans, UI Inter, radius 14px).
- [ ] Production build: EPERM creating a CSS worker process/binding a port in
  the agent environment; recheck in the developer's terminal.
- [ ] Publish/persistence testing and full desktop/tablet/mobile/browser matrix
  for theme appearance; no Publish was performed during this verification.

Additional verification files: `tests/theme-styles.test.ts`,
`tests/fixtures/theme-styles.mjs`, and updated `tests/text-block.test.ts`.
The desktop mega-menu design remains unresolved/deferred, not accepted as done.
