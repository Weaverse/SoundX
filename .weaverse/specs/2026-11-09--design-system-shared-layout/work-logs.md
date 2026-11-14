# Work logs

## 2026-11-09 — Existing shared-control review

- Reviewed repository guidance, installed Next.js CSS/client-boundary guidance,
  and Forward's `cn()` implementation.
- Read Figma typography-radius and color guides during the preceding audit.
  Rechecked order-note (`4034:59559`), message (`1728:4069`), filter checkbox
  (`4017:30488`) and Input component set (`1145:11916`).
- Converted Input, InputUnderline, Textarea, Checkbox and Icon class composition
  to `cn()`. Preserved the user's Button changes and action-demo component.
- Renamed module style maps to ALL_CAPS and changed ordinary local declarations
  to `let` in touched controls, following repository guidance.
- Removed `enabled:hover:rounded-xs` from the message textarea: the current
  Input set retains its 16px radius in both Default and Hovered states.
- Preserved proposed focus treatments; listed design gaps in the spec README.
- Scoped Biome formatting completed; lint passed for 44 files.
- Typecheck, route type generation and GraphQL validation passed.
- Existing test suite passed: 33 tests, 0 failures. These are foundation tests,
  not browser or visual tests for the controls.
- Browser focus/hover, responsive visual checks and designer approval remain
  pending. No claim of full issue #2 completion is made.

- Production build passed. Next.js still reports the pre-existing warning about
  the parent-directory package-lock.json being outside the repository.
- Full format check initially identified CRLF/formatting in the existing
  input-action demo. Formatted only that demo; full format check then passed.
- Reviewed the final shared-component diff. No commit, push or deployment run.

## 2026-11-10 — Device-transfer checkpoint

- Prepared the current feat/design-system-layout work for transfer to another
  device. Retained the development-only UI preview and input-action demo
  because implementation is ongoing; remove temporary demos at task completion.
- Added shared 16px minus/plus icon paths from Figma node 1212:6463.
- QuantityInput currently implements layout and manual native numeric input;
  minus/plus behavior, hover and approved keyboard focus remain unfinished.
- User requested removal of the inner number input outline. Outer 1px border
  remains; record the missing keyboard focus treatment for designer review.
- Formatted the UI preview only. Lint and format checks passed.
- Existing foundation tests passed: 33 tests, 0 failures.
- Typecheck/GraphQL and production build passed before the transfer commit.

## 2026-11-10 — Local font loading repair

- Reproduced HTTP 500 on the running development server's `/ui-preview`.
  Development logs show failed requests to fonts.gstatic.com followed by the
  internal Turbopack Google font module resolution error for both typefaces.
- Replaced `next/font/google` with `next/font/local`, preserving the Inter and
  Open Sans CSS variables, normal variable weights and display swap.
- Bundled the complete normal variable TTF files from the official Google Fonts
  repository with their OFL licenses and source documentation. These files are
  larger than Latin-only subsets; font payload optimization remains follow-up.
- The same dev route returned HTTP 200 after the change. Visual font rendering
  and Studio behavior have not been rechecked in the browser.
- Format, format check, lint, typecheck/GraphQL and all 33 tests passed.
- Production build failed while processing globals.css because Turbopack could
  not bind an internal port (Operation not permitted). A retry with escalated
  permissions returned the same error; production verification remains pending.
- No dependency changes, commit, push or deployment.

## 2026-11-10 — QuantityInput basic interactions

- Added a client boundary and internal state initialized from numeric
  defaultValue, clamped to min/max. Both buttons apply numeric step and clamp
  the result; disabled/readOnly and reached bounds disable the relevant button.
- Direct input updates the same state and clamps finite numbers. An empty
  field remains empty while editing; blur normalization and invalid-value UX
  are deferred. From an empty field the buttons use min as their starting value.
- Restricted value/bounds/step props to this initial uncontrolled numeric API;
  parent-controlled value and unified value-change notifications remain follow-up.
  The native onChange callback is retained for direct input only.
- Preserved presentation, including the existing lack of input focus treatment;
  keyboard focus design remains pending. No cart API integration was added.
- Format, lint, typecheck/GraphQL, all 33 existing foundation tests and diff
  whitespace checks passed. No new browser interaction tests were run; these
  foundation tests do not verify the quantity interactions. Production build
  and browser checks remain pending (see the preceding build limitation).

## 2026-11-10 — Quantity typing behavior correction

- User clarified that typing must remain unrestricted and leading zeros should
  disappear only when editing finishes. The preview's max=10 and immediate
  onChange clamping were too restrictive for that requirement.
- Store the editing draft as a string and normalize it on blur. Empty/invalid
  input restores 1 on blur; numeric drafts are not clamped. Default is now 1.
- Removed max=10 from the preview. Optional native bounds and button bounds
  remain available; the preview has no upper limit. Preserved native callbacks.
- Format, lint, typecheck/GraphQL and all 33 existing tests passed. Interactive
  browser verification remains pending; no production build rerun.

## 2026-11-10 — Button color alignment

- Following the user's color-guide review, changed Primary text from the
  inverse text token (#FAFAFA) to the Primary text token (#FFFFFF).
- Applied Secondary border tokens to both sizes by moving the existing 2px
  inset ring into the variant recipe. Removed the small-size-only condition.
  Color matches the guide; border thickness and size-specific visual parity
  still need comparison against the concrete Button components.
- Format, format check, lint and diff whitespace checks passed. No browser
  visual checks or production build were run for these class-only changes.

## 2026-11-10 — Concrete product button takes priority

- User established precedence: concrete Figma component first, style guide
  second; report disagreements for designer follow-up.
- Read design context and screenshot for quantity-cart-row `3980:27535`.
  Its Add to Bag button `3980:27541` uses #262627 background, #FAFAFA text,
  Inter Medium 14px normal line height, 20px horizontal and 16px vertical
  padding, 8px gap and 16px radius. Existing default Button matches these.
- Reverted the Primary text class to text-text-inverse based on this evidence.
  Retained Primary/text token as documented; recorded the mismatch in README.
- Parent height is 48px but nested button uses content height and padding;
  fixed-height enforcement is deferred pending clarification. This is a
  button audit, not implementation of the product route or cart mutation.
- Secondary instance parity and live browser visual verification remain open.

## 2026-11-10 — Shopping Cart checkout button

- Read design context, screenshot and geometry for `1216:6945`: 336×49px,
  #262627 background, #FAFAFA text, Inter Medium 14px normal line height,
  20px horizontal and 16px vertical padding, 16px radius and 8px gap.
- Existing Primary default recipe matches these visual values. Added fullWidth
  to select w-full versus w-fit without conflicting utilities, and a 336px
  responsive preview example labeled Proceed to Checkout. Height remains
  content-driven (17px text + 32px padding in the Figma instance).
- The guide's Primary/text #FFFFFF still differs from the instance's
  Text/Inverse #FAFAFA. Implementation follows the concrete instance.
- Preview is presentation only: no checkout action or Shopify cart wiring.
  Hover/pressed/focus states are not established by this single instance;
  browser geometry and font rendering verification remain pending.

## 2026-11-10 — Optional Secondary border

- Added withBorder (default true) for Secondary buttons. The complete inset
  ring recipe, including hover/active colors, is conditional rather than
  overridden with conflicting classes. Primary and Outlined are unaffected.
- Added adjacent bordered/borderless Secondary examples to the development
  preview. The prop is consumed by Button and is not forwarded to the DOM;
  keyboard focus outline remains available in both appearances.
- Format, lint and typecheck/GraphQL passed. Browser visual checks remain pending.

## 2026-11-10 — Button review preview matrix

- Expanded the development preview with Primary, Secondary and Outlined in
  default/small sizes and disabled examples, plus borderless Secondary in both
  sizes/states. Retained the Checkout full-width example and existing controls.
- Added labels and keyboard-focus review instructions. These examples expose
  current behavior, not approval of unverified Figma variants.
- Format, lint and typecheck/GraphQL passed. User will perform visual review.

## 2026-11-10 — Text input review example

- Started the user's sequential form-control review with Text Input, using
  Figma Default `1445:28918` and Hovered `1445:28913` already read directly.
- Added a labeled 261px-wide example at the top of the dev preview for visual
  review against the 45px-high Figma control. Existing input styles remain.
- Code matches the font, colors, 16px radius, 16px/14px padding and 2px inset
  stroke declarations. Focus darkening and 400ms timing remain implementation
  choices pending design confirmation; browser geometry is not yet verified.

## 2026-11-10 — Text approved and arrow input review

- User marked the Text input review done after checking the preview.
- Added a separate 261×48px reference example for Text w arrow, based on
  Default `1145:11915` and Hovered `1176:16997` design context already read.
- Existing styles match the declared font, colors, padding, 16px radius,
  2px inset stroke, 8px gap and 20px icon size. Browser alignment remains
  for user review. Focus styling and 400ms timing remain unconfirmed by Figma.
- The preview arrow is decorative, not a submission control. Existing endAction
  supports a real labeled action when the parent form is implemented.

## 2026-11-10 — Search input review

- Added the third sequential review example, Search, at 261px width using
  Default `1145:11975` and Hovered `1176:17002` design context already read.
- Existing Input recipe matches the declared 48px height, Inter Medium 14px,
  subtle text, default/hover border colors, padding, radius, 8px gap and 20px
  icon size. No shared component styling was changed.
- This is a native search input with a decorative icon, not catalog search.
  Browser review remains pending; the user's continuation did not explicitly
  confirm all arrow-input checks or approve unspecified focus/timing choices.

## 2026-11-10 — Consolidated form-control preview

- Grouped the reviewed Text/Arrow/Search examples with labeled Underline,
  Message, Order note, Filter checkbox and Cart quantity examples. Removed
  duplicate unlabeled controls while preserving the button matrix/action demo.
- Added the previously missing Message preview and meaningful textarea
  placeholders. Reference widths use max-w-full for narrow screens.
- Filled, disabled and readOnly examples are in a separate disclosure marked
  as behavior samples, not approved Figma states. No NumberInput or Badge is
  presented as implemented. Shared control styling was not changed.
- Format, lint and typecheck/GraphQL passed. Browser measurements and remaining
  design decisions are still pending; the gallery does not establish approval.

## 2026-11-10 — Square and compact quantity variants

- Read design context and screenshots for `1253:21948` and `1758:20011`, then
  geometry for the concrete square child `1253:21883` and compact control.
- Added QuantityInput square (171×47px, 4px radius) and compact (72×34px,
  16px radius, 1px subtle border, 8px/6px padding, 4px gap) variants. Kept
  existing default geometry and shared typing/blur/increment behavior.
- Compact uses 12px Figma SVGs in 10px-high arrow buttons with a 2px gap.
  Downloaded both SVGs to public/icons and rendered with next/image. No
  temporary asset URL is used at runtime. Added named examples 09/10 to preview.
- Both variants are quantity controls; the From/To filter remains separate work.
- Format, lint, typecheck/GraphQL and 33 existing foundation tests passed before
  the image component cleanup; final lint/typecheck rerun recorded separately.
  No new browser interaction/geometry checks or production build were run.
- Final format, lint and typecheck/GraphQL rerun passed after next/image cleanup;
  downloaded SVG files are non-empty and diff whitespace checks passed.

## 2026-11-10 — NumberInput leading-zero normalization

- User pasted the proposed NumberInput component and reported leading zeros
  remained after leaving the field. Added onBlur normalization of non-empty,
  finite numeric values; empty fields stay empty and typing is unchanged.
- Update both the native input and draft on normalization, notify the existing
  onValueChange callback and preserve the caller's onBlur handler. No min/max
  clamping is added; readOnly values are not rewritten.
- Scoped formatting, full lint and typecheck/GraphQL passed. Interactive browser
  validation remains pending; no new tests or production build were run.

## 2026-11-11 — ProductCard hover image

- Compared Figma default `1170:11873` and hovered `1170:12055` states.
- Added optional hoverImage using the existing image contract. Overlay the
  alternate image on image-region hover and link keyboard focus, preserving
  the square frame, 16px radius and badge layering. Use an immediate swap;
  transition timing has not been approved. Keep the primary image underneath.
- Scoped Biome check and full typecheck/GraphQL passed. Browser validation
  remains pending; the preview has one product image and no hoverImage prop.
- Repository diff check reports existing trailing whitespace in ui-preview.

## 2026-11-11 — Reconciled pasted ProductCard draft

- Compared the user's pasted editor buffer against the saved workspace file.
  Git has no unmerged entries; this is an editor/disk content divergence.
- Preserved the draft's 300ms opacity transition with reduced-motion support,
  combined with the optional hoverImage and full-frame overlay fix.
- Empty action buttons in the draft remain pending implementation; they need
  a separate position outside the product anchor and defined actions.
- Scoped Biome check and typecheck/GraphQL passed after reconciliation.
  Browser validation and editor buffer synchronization remain pending.

## 2026-11-11 — Restore reviewed hover image behavior

- User clarified the pasted buffer was a demo and requested the reviewed Figma
  implementation. Removed the demo's 300ms transition. Keep the optional image
  overlay, square frame, shared radius and keyboard focus behavior.
- Scoped Biome check passed. Browser validation remains pending.

## 2026-11-11 — Hover image preview asset

- Inspected Downloads/Product Image.png and copied the headphones image to
  public/products/product-hover.png. Wired the existing preview card to it.
- Restored the reviewed overlay implementation after the saved component
  reverted to the pasted demo during editor synchronization.
- Scoped component Biome and full typecheck/GraphQL passed. Browser hover
  validation remains pending.

## 2026-11-11 — ProductCard hover actions

- Read Figma 1490:22313 and prototype reactions on both card variants.
  Motion context has no keyframes. The hovered card has a 400ms ease-out
  dissolve for click navigation only. Hover timing is unspecified; selected
  300ms ease-out provisionally for image opacity and action entrance.
- Added Button icon size with 10px padding and a ProductCard actions slot.
  Preview supplies the three existing Figma icons in 36px buttons, stacked
  with 4px gaps at bottom right. Button behaviors remain preview placeholders.
- Separated image/content product anchors from the action buttons. Added
  keyboard focus reveal, persistent touch actions and reduced-motion support.
- Scoped component formatting/lint and full typecheck/GraphQL passed.
  Browser interaction/geometry verification remains pending.

## 2026-11-11 — Slower hover transition

- User requested slower image and action transitions. The saved image already
  used 500ms; matched the action entrance to 500ms, retaining ease-out.
- Scoped component Biome check passed. Browser timing review remains pending.

## 2026-11-11 — Underline focus transition

- User requested animation when focusing the underlined input. Added a 200ms
  ease-out box-shadow transition for the existing 1px/2px underline states,
  with reduced-motion support. Timing is selected for user review.
- Scoped Biome check passed. Browser focus review remains pending.

## 2026-11-11 — Responsive UI preview review

- User reported successful desktop 1440px review of badges, text/arrow/search
  inputs, Message/Order note textareas, checkboxes, all three quantity variants,
  Buttons, From/To controls and ProductCard. Underline focus and 200ms timing
  remain a proposed design decision requiring designer confirmation.
- Agent used the existing Chrome localhost:3000/ui-preview tab and Device
  Toolbar to inspect 1024px, 768px, 390px, 375px and 320px widths. These are
  browser emulations; no physical tablet/phone or Safari check was performed.
- Scrolled through component groups. Observed controls remain inside the
  viewport, textareas wrap existing multi-line text, button sample groups wrap
  onto additional lines, and From/To remain side by side at 320px. No visible
  overlapping component content was found in the observed regions. This was
  visual inspection, not an automated scrollWidth/geometry measurement.
- At 320px, clicked Cart quantity increment (3 to 4) and decrement (back to 3).
  Entered 003 into From, then Tab: value normalized to 3. Restored From to its
  original 34. To retained its original 39. Focus on the From arrow was visible.
- Clicked the product image anchor and used Tab through all three action
  buttons. The hover image appeared on focus and actions remained present.
  Device emulation shows the touch action controls persistently.
- Findings for follow-up before calling task 1 fully verified:
  - Next/Image console warnings for both product-example.png and
    product-hover.png: fill images in the preview lack sizes.
  - Action focus outlines meet the clipped image boundary at right/bottom;
    review an inset outline or containment spacing so all sides are visible.
  - The custom ABC sale preview has pale text on a pale pink background and
    is difficult to read. This is a caller-selected custom-color example.
  - The standalone icon Button below the card has no accessible name in the
    accessibility tree; the three ProductCard actions do have labels.
- ProductCard was inspected at the width produced by the current gallery.
  Isolated 145px/177.5px/312px card containers were not added or measured.
  Complete section-level grids/sliders and pixel-by-pixel Figma fidelity are
  still pending. Browser console extension warnings were also present.
- Restored Device Toolbar width to the original 1440px and Elements panel.
  No component code was changed in this review. No lint/test/build rerun.

## 2026-11-11 — Pre-commit accessibility and checks

- Added an accessible name to the standalone shopping-bag button in ui-preview.
  Corrected three malformed `focus-visible: outline-white!` class strings to
  `focus-visible:outline-white!` in the user's action outline changes.
- Formatted the gallery and organized its imports with Biome.
- Branch is feat/design-system-layout. Format check, lint, typecheck/GraphQL
  and all 33 existing tests passed. Scoped Biome check passed after cleanup.
- Production build failed in Turbopack CSS processing because spawning a
  process/binding an internal port is prohibited (os error 1). A retry with
  escalation encountered the same environment restriction. Build verification
  in the user's terminal remains required before the commit checkpoint.
- User requested collaborative commit flow. No commit or push performed.

## 2026-11-12 — Announcement bar responsive behavior

- Preserved the designer-confirmed flat #262627 background on all breakpoints. Desktop retains the static announcement list and optional Help Center from 1440px.
- Added component-local announcement-bar.css with a 35-second linear repeating track below 1440px. The duplicate list is inert, aria-hidden and contains no duplicate links.
- Added persistent pause/resume state, hover/focus pause and a keyboard-focus fallback that restores the original list for reachable links. Reduced-motion users receive a static list with manual horizontal scrolling.
- Added pause/resume accessible labels to the Announcement bar theme settings and passed them through the connected component.
- During browser verification the CSS Module class mapping did not appear in the rendered class list with the existing CSS loader. Used a component-local stylesheet with prefixed selectors instead; no global token changes.
- Scoped formatting/lint and typecheck/GraphQL passed. Existing test suite: 33 pass, 0 fail.
- Browser at localhost:3001: checked responsive widths 390px, 834px and 1440px; mobile pause/resume changed state and accessible label correctly. Desktop Help Center is visible at 1440px. Restored responsive viewport to 1440px.
- Full visual motion-loop, reduced-motion emulation, keyboard link scrolling, locale/navigation continuity, Studio editing of the new labels and appearance settings remain to be verified. Appearance settings have not yet been implemented. No commit or push.
- Production build attempted twice, including elevated execution, but Turbopack CSS processing could not create a process/bind its internal port (Operation not permitted). This is an environment restriction; production build verification remains pending in the developer terminal.

## 2026-11-12 — Announcement bar follow-up review

- Scoped Biome check initially found two import-order issues; applied safe import organization and reran successfully. Typecheck/GraphQL passed.
- Rechecked local responsive behavior at 390px and 1440px. DevTools reduced-motion emulation hides the motion control and retains the original accessible announcement list; restoring No emulation restores the pause control on mobile. Help Center is present at 1440px. Restored width to 1440px and removed the motion emulation.
- Core announcement rendering/settings and responsive motion implementation are ready for the next layout component. Full visual loop/keyboard link behavior, appearance controls, locale/navigation continuity and production build remain tracked as pending; do not treat this checkpoint as completion of all issue #2 acceptance criteria.

## 2026-11-13 — Header mobile/tablet menu integration

- Wired Header-owned menu state to the hamburger and shared MobileMenu dialog. Added aria-controls/expanded/haspopup and close-on-desktop (90rem)/pathname-change behavior.
- Preserved the user's desktop layout, navigation query and existing local font/preview changes. Tablet and mobile share a 360px panel bounded by viewport width and dynamic viewport height; lists scroll within the panel.
- Matched supplied Figma spacing and typography: 16px panel gutters/row padding, 26px/33px title, 14px medium menu text, 12px submenu indentation and 2px nested row gaps. Drawer backdrop remains the previously proposed 50% black overlay; no Figma motion timing was supplied, so no new drawer slide timing was invented.
- Downloaded exact Figma close (20px), chevron (14px), phone and envelope (24px) SVGs into public/icons/header. Verified XML root sizes and non-empty files. Replaced temporary character icons and wired the phone/email design slots.
- Connected live Header settings for optional contact details, phone prefix and menu labels. Added schema inputs for menu labels and phone prefix. Empty phone/email values leave the contact area hidden; the country selector switch now gates a supplied locale control (a real market selector is still pending).
- Native dialog handles modal focus; Escape, backdrop pointer and close button update Header state. Lock body scrolling while open and restore previous overflow/focus on cleanup. Explicitly focus hamburger before opening to capture it on macOS mouse activation.
- Browser: local menu opened, displayed Shopify links, and focused the close button; close button dismissed it. Full keyboard/resize/scroll-lock/accordion verification after the final focus correction and exact 390/834px visual review remain pending because the browser was concurrently in use. Store navigation currently includes routes such as /collections that return 404; implementing those routes is outside this change.
- Scoped Biome check and typecheck/GraphQL passed. Existing tests: 33 pass, 0 fail. No new modal-specific automated tests were added. Production build not rerun; the prior Turbopack sandbox port restriction remains unresolved.
- Desktop mega menu, search/locale/cart panels, locale-aware routing and refreshing Shopify navigation after a Studio menu-handle change are still deferred. No commit or push.

## 2026-11-13 — Mobile menu motion and Figma contact examples

- Added mobile-menu.css: 300ms left-to-right entry/reverse exit with opacity and backdrop fade. This timing/easing is a user-requested implementation choice, not a motion specification extracted from Figma.
- The dialog remains modal and body scrolling stays locked through exit, then closes and restores focus. Rapid open-state changes cancel pending frames/timers; unmount cleanup releases the dialog/body lock. Reduced motion skips the duration, and switching to desktop closes immediately.
- Contact UI already reads Studio settings with exact phone/envelope SVGs. After the user explicitly requested Figma examples, changed schema defaults to 000-000-0000 and yourwebsite@mail.com; retained NEED HELP? and Call us, and marked examples in setting help text. Saved merchant values still take precedence; clearing values still hides their links.
- Verified local home SSR HTML includes the dialog contact heading plus tel:0000000000 and mailto:yourwebsite@mail.com links. Browser opened the updated menu at the existing iPhone 16 emulation; full motion timing/exit/focus/rapid-toggle verification is still pending.
- Scoped Biome check and typecheck/GraphQL passed. Existing suite passed (33 tests) after the animation change; final contact-default change was followed by typecheck and scoped Biome check. No commit, push or external content publication.

## 2026-11-13 — Remove duplicate mobile search action

- Removed the shared inline-flex display utility from header icon-link styles; each link now declares display explicitly. The right-side search uses only hidden/lg:inline-flex, preventing the shared inline-flex utility from overriding hidden on mobile/tablet.
- Mobile/tablet retain search next to hamburger and only account/cart on the right. Preserved symmetric header gutters (20px mobile, 24px tablet) and matching icon gaps instead of adding asymmetric offsets. Desktop search remains on the right.
- Scoped Biome check and typecheck/GraphQL passed. Visual verification of the final spacing remains pending; browser was not on a matching local preview during this check. No commit/push.


## 2026-11-13 — Resolve shared-layout technical review findings

Authorization: user requested fixing outstanding technical findings before the
remaining issue #2 feature tasks. Preserved UI preview and unrelated assets.

- Fixed payment accessibility lint using a named section rather than a generic
  `div role="group"`. Formatted affected production sources and sorted imports.
- Initial menu reads use Promise.all and an independent safe loader per menu.
  Failures return an empty menu and emit a generic warning, never raw SDK errors.
- Added GET `/api/navigation?handle=...`: validates handle, forwards the request
  to the server-side client, returns public normalized menu items, disables
  response caching and returns sanitized 503 responses on upstream failures.
- Connected Header/Footer read live menu handles through theme settings and use
  a shared client data hook. Initial render reuses server data, changed handles
  fetch same-origin data with abort/stale-response protection, reverting a handle
  reuses its SSR menu. Presentation components still receive resolved props.
- Custom merchant logo images use Next Image's unoptimized option, consistent
  with Forward's approach to images outside its owned Shopify optimizer scope.
  No broad remote-host allowlist was introduced. Remote-image browser QA pending.
- Footer wordmark font size now caps at design sizes while scaling with its own
  inline-size container to avoid narrow-layout overflow; visual QA pending.
- Added five isolated regression cases: normalization and nested unsafe-URL
  filtering, missing menu, invalid handle without a query, transport failure,
  and GraphQL failure. Failure cases check sanitized API bodies and warnings.

Verification: scoped Biome check passed; `bun run typecheck` passed (including
GraphQL validation); `bun run test` passed 38 tests across eight files. Build
was attempted normally and with escalated execution; both encountered the
Turbopack CSS worker process/bind-port EPERM restriction. No build success is
claimed. No browser/Studio verification was performed in this pass. No commit,
push, deployment or external configuration change was performed.

Remaining feature work: desktop mega menu, shared appearance controls,
request/locale integration and continuity, actual newsletter submission,
store-supported payment mapping, full accessibility/responsive QA and design
review handoff. Static payment icons remain as previously requested.


## 2026-11-14 — Complete existing global color-token wiring

User authorized wiring the remaining global color tokens after successfully
checking Text main in Studio. Added color pickers and ThemeStyles mappings for
primary/secondary/outlined actions, order-note colors, label colors and shared
layout colors. All 32 configurable color tokens use --soundx-* runtime variables;
foreground remains an alias of Text main. Typography, spacing and radius remain
outside this color stage. ThemeStyles retains independent page-width validation
and hexadecimal color validation.

Dedicated Header/Footer/Announcement colors are now consumed by their production
components. Defaults match existing rendered UI rather than previously unused
layout constants (Header #0B0B0D, Footer #34285E). Primary text is independently
configurable with its existing rendered #FAFAFA default. Specific newsletter
panel and bottom-bar treatments remain component-specific. No preview edits.

Validation: scoped Biome check passed; typecheck/GraphQL passed; all 32 color
mappings checked against ThemeStyles. Tests: 37 pass, 1 fail. The existing
TextBlock identity test expects an h2 outer element, whereas the user-applied
settings demonstration currently renders a section. That separate temporary
TextBlock/test mismatch was preserved, not concealed by changing the test.
Browser/Studio testing of the newly added controls and build remain pending.


## 2026-11-14 — Apply typography roles to production components

User confirmed live Heading font changes in TextBlock and authorized a project
font-role audit. Newsletter title, mobile drawer title and error title now use
font-heading. Footer navigation, newsletter labels and feedback explicitly use
UI font (font-sans); newsletter prose explicitly inherits Body font. Existing
shared form controls, buttons, badges, desktop/mobile links, prices and bottom
bar already use the UI family; contact details retain the Body family. Header
and Footer wordmarks explicitly use the locally loaded Inter variable and no
longer follow merchant UI-font changes. Size, weight, line-height and responsive
classes were preserved. ProductCard's Open Sans title remains a concrete-design
exception; it was not mechanically converted based on its h3 tag.

Scoped Biome check passed; typecheck/GraphQL passed; four targeted error-page and
registry tests passed; git diff --check passed. UI preview was not edited.
Browser checks for independent Heading/Body/UI changes, wordmark invariance and
wrapping after switching fonts remain pending. The previously noted temporary
TextBlock fixture mismatch remains separate from this change.


## 2026-11-14 — Wire shared Button radius

User authorized completing Button radius wiring for manual Studio testing.
Filled the existing empty settings/button.ts module with the agreed range:
0–40px, step 1px, default 16px. Registered import already existed; formatted
schema composition. ThemeStyles validates finite numeric input and clamps it
before emitting --soundx-button-radius. globals.css exposes --radius-button
with a 1rem fallback; shared Button uses rounded-button. The general md radius
is unchanged, so inputs and product media are unaffected. Existing explicit
important radius overrides (e.g. header hamburger rounded-none!) remain in place.
The range is an implementation proposal for designer/reviewer review, not a
range specified by Figma. Scoped Biome check, typecheck/GraphQL and diff whitespace
checks passed. Browser/Studio tests and production build were not run for this
change; user will verify 0/16/40px and reset behavior. No preview changes.


## 2026-11-14 — Shared appearance checks and live Studio smoke test

User requested completing checks for shared appearance before reporting the
conclusion. Fixed trailing-newline formatting in button/layout/typography schema
files. Updated TextBlock's existing identity/presentation regression to verify
its current section root, Studio attributes, authored class and nested semantic
font-heading h2, rather than retaining the obsolete h2-root shape assertion.
Added five isolated ThemeStyles regression scenarios: declared defaults (all
32 color declarations plus layout/radius/fonts), absent settings, rejected CSS
injection/invalid values, independent values with missing page width, and
numeric bounds including valid zero radius.

Executed results:
- bun run format:check: passed.
- bun run lint: passed, including all repository files.
- bun run typecheck (Next typegen, TypeScript, GraphQL): passed.
- bun run test: 43 passed, 0 failed across nine files.
- git diff --check: passed.
- bun run build, with escalated execution: failed during Turbopack CSS worker
  evaluation (mobile-menu.css.css), process creation/bind port EPERM. This does
  not prove the production build passes; developer-terminal confirmation remains.

Native Chrome smoke test: local SoundX :3001 loaded and reloaded with Header,
TextBlock content, Footer, legal links and payment icons visible. Opened the
existing Studio local preview and confirmed Layout/Colors/Typography/Buttons
settings groups. Temporarily changed shared radius from its saved 14px to 0px
(square Subscribe visible) and 40px (pill Subscribe visible), then restored 14px.
Changed Heading Inter to Open Sans (heading visual update observed) and restored
Inter. Exercised Body Open Sans to Inter and back, UI Inter to Open Sans and
back; Studio accepted independent changes and Header wordmark retained its Inter
appearance. Final controls verified Heading Inter, Body Open Sans, UI Inter,
radius 14px. No Publish, Save draft, commit, push or deployment was invoked.
Studio may autosave its ordinary draft state; the tested values were restored.

Limits: no new publish/persistence acceptance test, exhaustive color-state
matrix, exact multi-width geometry pass or browser-console hydration audit was
performed. Earlier user checks covered live page width, text color and heading
font. Defaults and failure paths are covered by the new automated cases. The
UI-preview implementation was not edited in this verification. Existing
Shopify placeholder legal/menu destinations remain outside this task.


## 2026-11-14 — Footer Shop row spacing fix and final checks

User reported production build passed in their terminal and requested the other
checks plus a fix for Shop's Smart home link wrapping on local desktop.
Native Chrome reproduced the wrapped Shop row on localhost:3001. Desktop row
padding was reduced from 40px to 16px per side, row gaps from 40px to 16px, and
the group-label column from 100px to 88px. Footer logo desktop padding now aligns
with navigation. Child links use a no-wrap horizontal list with contained
horizontal scrolling for content that exceeds available space, plus padding for
focus outlines. Mobile accordion layout remains unchanged. Font size and weight
were not reduced. The spacing adjustment differs from the original Figma values
and should be included in design review notes.

Reloaded local storefront in Chrome: Computers, Audio, Cameras and Smart home
were all visibly on the same row; the other groups remained aligned. No Studio
settings were changed. Format:check, lint, typecheck/GraphQL and all 43 tests
passed; git diff --check passed. No preview edits, commit, push or publish.
Build success above is user-reported before this CSS-only fix; the agent did
not rerun production build for the final spacing change.
