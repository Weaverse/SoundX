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
