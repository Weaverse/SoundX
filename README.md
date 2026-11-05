# Tech

A Next.js storefront theme for electronics and tech, powered by Weaverse.

**Tech is a working name and may change before release.**

The theme is currently in development.

## Preview

[Open the foundation preview](https://tech-git-feat-storefront-foundation-nao-3834.vercel.app)

This branch alias follows deployments of `feat/storefront-foundation`.
Publish page content in Weaverse to make it visible outside Studio.

## Local setup

### Verified versions

| Tool or package | Version |
| --- | --- |
| Node.js | 24.14.1 |
| Bun | 1.3.14 |
| Next.js | 16.4.4 |
| React / React DOM | 19.3.0 |
| Weaverse Next SDK | 1.0.1 |
| TypeScript | 5.9.3 |
| ESLint | 9.39.5 |
| eslint-config-next | 16.4.4 |
| Tailwind CSS / @tailwindcss/turbopack | 4.3.4 |

Bun is pinned in `package.json`. Commit `bun.lock` when dependencies change.
CI uses the Node.js and Bun versions listed above.

### Install and configure

```bash
git clone https://github.com/Weaverse/tech.git
cd tech
bun install --frozen-lockfile
cp .env.example .env.local
```

Fill in `.env.local` with values for the designated demo store and Weaverse
project. Obtain credentials through the team's approved channel.

| Variable | Purpose |
| --- | --- |
| WEAVERSE_PROJECT_ID | Project used by the Home page loader. |
| PUBLIC_STORE_DOMAIN | Demo store's myshopify.com domain. |
| PRIVATE_STOREFRONT_API_TOKEN | Server-only Storefront token, verified through a terminal catalog query. Shopify application integration is still pending. |

Keep real values in `.env.local`, which Git ignores. Commit variable names
and empty values in `.env.example`. Restart the dev server after changing
environment variables.

### Run and check

```bash
bun run dev
```

Open the Local URL printed by Next.js, normally `http://localhost:3000`.
Select that URL in the designated Weaverse project's preview settings.
Keep the dev server running while using the local Studio preview.

| Command | Purpose |
| --- | --- |
| bun run lint | Check ESLint rules. |
| bun run typecheck | Generate Next.js route types and check TypeScript without emitting JavaScript. |
| bun run build | Create the production build. |
| bun run start | Serve an existing production build locally. |

CI installs dependencies using `bun install --frozen-lockfile`, then runs
lint, typecheck, and build. See `.github/workflows/ci.yml` for triggers
and configuration.

### Configure a deployed preview

In the linked Vercel project, use the Next.js preset, Node.js 24.x,
`bun install --frozen-lockfile` for installation and `bun run build` for
the build command. Add the variables from `.env.example` to the Preview
environment, scoped to the intended branch if needed.

After deployment, open its URL directly and select it in Weaverse Studio.
Verify section selection, hover outlines, and heading edits in Studio.
The deployed preview runs independently of the local dev server.
