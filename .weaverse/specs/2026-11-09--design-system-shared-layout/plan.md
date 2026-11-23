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
- [x] Implement the Shopify-managed desktop mega-menu and mobile drill-down.
- [ ] Complete remaining shared layout and route integration.
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

This checkpoint added Header settings, the server navigation query and initial
Header presentation. The mobile and tablet drawer used recursive accordions, a
native dialog and optional Studio-managed contact content. The Figma icon
assets were local. Responsive visual QA, modal interaction checks, route
availability, live menu-handle refresh, desktop mega-menu and search, market
and cart integrations were pending at this checkpoint. Later plan sections
and work-logs.md record subsequent implementation and verification.


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


### 2026-11-16 mobile navigation follow-up

- Implemented mobile category accordion from newly supplied node 4735:18368.
- Implemented shared Brand grid, right drawer radius and mobile typography.
- Browser-checked mobile 430px and tablet 834px, nested links and dismissal.
- Shopify All Collections remains visible despite omission from mockups;
  resolve mobile menu visibility explicitly with the merchant.
- Expanded Help Center styling uses the existing nested accordion pattern;
  no separate expanded Help Center Figma node has been supplied.
- Files touched: header/mobile-menu.tsx, mobile-menu.css, index.tsx and
  brand-menu.tsx. Production build and Studio publishing remain pending.


### Designer correction — mobile panels (2026-11-16)

- Supersedes root-inline dropdowns: root parents now enter a named child view
  with Back; only third-level branches expand as accordions inside it.
- Category, Brand and Help Center share one native dialog and contact region.
- Browser-verified root/child/back, reset on reopen and Escape at mobile/tablet.
- Added headerMenuBackLabel setting; mobile-menu.tsx, mobile-menu.css,
  connected.tsx and settings/header.ts updated.

## 2026-11-22 Header navigation review

### Implementation

- Render Shopify-managed Category, Brand and Help Center panels within the
  desktop navigation. Category and Brand panels sit inside their trigger list
  items so Tab moves through an open panel before the next top-level item.
- Support hover, click and keyboard disclosure. ArrowDown moves focus into
  the panel, and Escape closes it and restores focus to its trigger.
- Resolve the Category banner and Brand images in ConnectedHeader. Render an
  image-only category banner when a merchant provides an image without a link.
  Share the header accent token across the three panels.
- Use the responsive default wordmark and respect the merchant's logo override.
- Keep Shopify links on mobile parent items alongside their submenu controls.
  Use the configured Back label for the drill-down control and share the menu
  duration between CSS and the close timer.

### Files touched in PR #18

- Desktop navigation and panels: `src/components/header/desktop-nav.tsx`,
  `src/components/header/desktop-nav.css`, `src/components/header/category-menu.tsx`,
  `src/components/header/brand-menu.tsx`, and
  `src/components/header/help-center-menu.tsx`.
- Header composition and appearance: `src/components/header/index.tsx`,
  `src/components/header/connected.tsx`, `src/components/header/logo.tsx`,
  `src/lib/weaverse/settings/header.ts`, and `src/app/globals.css`.
- Mobile navigation: `src/components/header/mobile-menu.tsx` and
  `src/components/header/mobile-menu.css`.

### Verification

- Desktop review confirmed panel placement inside the navigation, keyboard
  Tab order and hover-then-click behavior for the desktop and Help menus.
- Mobile browser checks covered parent-link destinations, separate submenu
  controls and Back focus restoration. See the work log and
  [PR #18](https://github.com/Weaverse/SoundX/pull/18) for details.
- Full visual QA, Studio publishing and navigation across the remaining
  storefront routes are follow-ups for the shared-layout issue.
