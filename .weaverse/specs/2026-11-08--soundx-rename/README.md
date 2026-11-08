# SoundX Theme Rename

- Status: Local code verified — deployment verification pending
- Owner: @HoangHuy1305HP
- Created: 2026-11-08
- Last Updated: 2026-11-08
- Source issue: https://github.com/Weaverse/SoundX/issues/11
- Naming decision: https://github.com/Weaverse/builder/issues/2791
- Prerequisite: foundation PR #10 merged into main at 0146930

## Original Prompt

Rename this theme from the working name "Tech" to SoundX. The name applies
to the GitHub repo, theme name, Shopify store, and storefront demo.
Update code, docs, defaults, tests, external project names, and old links.
Keep the Original Prompt in the foundation spec unchanged and preserve the
generic phrase "electronics and tech".

## Summary

Apply SoundX branding to the existing Next.js and Weaverse foundation.
Use soundx as the package identifier and SoundX as the display name.

## Decisions

- The existing GitHub repository has been renamed to Weaverse/SoundX.
  Use its canonical URL in documentation and Git remotes.
- Preserve the foundation Original Prompt verbatim and retain historical
  work-log observations, including the URLs used during their verification.
- Update the schema defaults for newly authored TextBlocks. Existing merchant
  content belongs to the demo content update and requires Studio verification.
- Verify the renamed Vercel URL before replacing the live README preview link.
- Confirm the Shopify store and Weaverse demo names through their management
  interfaces and verify the storefront connection after the external changes.

## Verification

Local checks and external rename results are recorded in work-logs.md.
Track completion in plan.md.
