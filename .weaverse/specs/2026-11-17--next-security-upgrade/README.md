# Next.js security upgrade

Status: Verified locally; ready for review
Owner: Codex
Created: 2026-11-17
Last Updated: 2026-11-17

## Original Prompt

Source issue URL: None supplied (direct user request).

Upgrade SoundX from Next.js 16.4.4 to exactly 16.4.6 for a published security advisory. Check duplicates first, use a separate Git worktree, preserve unrelated configuration, set experimental.agentUpgrade to "security", verify, and report the result using the requested telemetry command.

References: https://registry.npmjs.org/-/npm/v1/security/advisories/bulk and https://registry.npmjs.org/next.

## Summary

Pin Next.js 16.4.6, refresh bun.lock with Bun 1.3.14, and explicitly select security upgrade reminders. No Future Defaults adoption or UI changes are requested.
