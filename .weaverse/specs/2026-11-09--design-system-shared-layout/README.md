# SoundX design system and shared layout

- Status: In progress — shared controls reviewed; visual validation and design decisions pending
- Owner: @HoangHuy1305HP
- Technical reviewer: @hta218
- Created: 2026-11-09
- Last Updated: 2026-11-14
- Source issue: https://github.com/Weaverse/SoundX/issues/2
- Design review: https://github.com/Weaverse/SoundX/issues/9

## Original Prompt

Implement the shared visual foundation from the approved design.

1. Build typography, colors, spacing, buttons, form controls, badges and reusable product-card styles.
2. Implement the announcement bar, header, navigation/mega menu and footer using Shopify-managed navigation.
3. Cover desktop, tablet and mobile behavior, keyboard navigation and visible focus states.
4. Expose shared appearance settings and appropriate global content through Weaverse Studio.
5. Preserve layout and animation continuity during navigation and locale changes.
6. Hand the preview to @imsinhp for review before the shared patterns spread across the storefront.

## Current scope

This entry records the review and cleanup of existing shared UI controls.
Typography and color guides remain the source for visual values. Forward's
`src/lib/cn.ts` was checked for class-composition conventions; its helper matches
SoundX's implementation. No Shopify or Weaverse integration is changed here.

## Confirmed implementation

- Existing controls use the shared `cn()` helper.
- Button hover transitions use 150ms, matching the handoff notes.
- Message textarea keeps its 16px radius on hover, matching the current Input
  component set; the previous 4px hover override was removed.
- Order-note retains its distinct 12px radius, 12px padding and 1px border.

## UI decisions pending designer confirmation

- Concrete Figma instances take priority over the general style guide. Record
  disagreements rather than silently normalizing instance-specific appearance.
- Product Add to Bag instance `3980:27541` uses Text/Inverse (#FAFAFA), while the
  guide specifies Primary/text (#FFFFFF). Primary currently follows the instance.
  Its parent is 48px high, while the nested button uses 16px vertical padding
  and normal text line height; confirm final height before forcing a fixed size.
- Underlined input keyboard focus: proposed bottom line increases from 1px to
  2px. The user prefers this to a surrounding outline. This is a proposal, not
  a confirmed Figma focus variant. Confirm sufficient visual prominence.
- Input action button keyboard focus: proposed 2px outline with 2px offset.
  Separate hover and pressed feedback for the icon have not been specified.
- Error, filled and disabled appearances need concrete approved examples;
  do not invent error colors from the state inventory alone.
- Input and textarea transition timing remains 400ms pending specific guidance;
  the 150ms handoff instruction reviewed here applies to buttons.
- Badge master colors differ from instances on product cards; confirm palettes.
- A product-card review count uses Nunito, outside the two approved typefaces;
  confirm whether it should use Inter or Open Sans.

## Remaining scope

Filter NumberInput has been added locally by the user from the proposed
component; leading-zero blur normalization is implemented, with browser review
pending. Badge and ProductCard remain unimplemented. QuantityInput
now includes square (171×47px, 4px radius) and compact (72×34px, stacked arrow
buttons) variants based on `1253:21883` and `1758:20011`. These are quantity
controls, not From/To price filters. Their visual/browser review is pending.
The default QuantityInput
has a 140px-wide layout, shared minus/plus icons and internal state for numeric
input and step-based increments/decrements bounded by min/max. Direct typing
preserves the draft without clamping; blur normalizes leading zeros and restores
an empty field to 1. The preview has no upper limit. Its inner input
outline was removed at the user's request;
a keyboard focus treatment still needs to be agreed with the designer. Shared
layout, settings, responsive integration, navigation continuity and designer
handoff remain open. Existing checks do not prove browser focus or visual parity.


## 2026-11-13 shared layout hardening

Header and Footer navigation now share a public menu refresh endpoint and a
client composition hook for Studio menu-handle changes. Initial menus load in
parallel with independent failure isolation. Remote custom logos bypass the Next
image optimizer, and the Footer wordmark scales within its container. Payment
markup and production-source formatting were corrected. This is not issue #2
acceptance: desktop mega menu, appearance controls, locale continuity, live
newsletter submission, actual accepted-payment mapping and reviewer handoff
remain separate work. See the work log for verification limits.
