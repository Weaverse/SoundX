# Plan

1. Check app files, local and remote history, and open provider PRs for equivalent work.
2. Upgrade in an isolated Git worktree using Bun 1.3.14.
3. Preserve configuration and add experimental.agentUpgrade: "security".
4. Verify installed version, formatting, lint, types/GraphQL, tests, production build, and runtime smoke behavior.
5. Inspect the diff and commit verified changes locally. Publish only with user authorization.

## Files touched

- package.json
- bun.lock
- next.config.ts
- This spec directory

## Deferred work

PR publication requires user authorization. No unrelated UI or framework migration work is included.
