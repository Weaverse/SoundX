# SoundX

A Next.js storefront theme for electronics and tech, powered by Weaverse.

The theme is currently in development.

## Preview

[Open the deployed storefront](https://sound-x.vercel.app)

Publish page content in Weaverse to make it visible outside Studio.

## Local setup

### Verified versions

| Tool or package | Version |
| --- | --- |
| Node.js | 24.14.1 |
| Bun | 1.3.14 |
| Next.js | 16.4.4 |
| React / React DOM | 19.3.0 |
| Weaverse SDK (`@weaverse/hydrogen`) | 6.2.0 |
| Shopify Hydrogen | 2026.10.2 |
| TypeScript | 5.9.3 |
| Biome | 2.6.3 |
| Tailwind CSS / @tailwindcss/turbopack | 4.3.4 |

Bun is pinned in `package.json`. Commit `bun.lock` when dependencies change.
CI uses the Node.js and Bun versions listed above.

### Install and configure

```bash
git clone https://github.com/Weaverse/SoundX.git soundx
cd soundx
bun install --frozen-lockfile
cp .env.example .env.local
```

Fill in `.env.local` with values for the designated demo store and Weaverse
project. Obtain credentials through the team's approved channel.

| Variable | Purpose |
| --- | --- |
| WEAVERSE_PROJECT_ID | Default Weaverse project; the client prefers the project id from the server payload. |
| PUBLIC_STORE_DOMAIN | Demo store's myshopify.com domain. |
| PUBLIC_STOREFRONT_API_TOKEN | Public Storefront token supplied to Weaverse Studio for resource selection. |
| PRIVATE_STOREFRONT_API_TOKEN | Private Storefront token used by the server-only Hydrogen client. |

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
| bun run format | Apply Biome formatting. |
| bun run format:check | Check formatting without modifying files. |
| bun run lint | Check Biome lint rules. |
| bun run test | Run the automated test suite. |
| bun run typecheck | Generate Next.js route types, check TypeScript, and validate Shopify GraphQL queries. |
| bun run check:graphql | Validate Shopify queries against the schemas bundled with Hydrogen. |
| bun run build | Create the production build. |
| bun run start | Serve an existing production build locally. |

CI installs dependencies using `bun install --frozen-lockfile`, then runs
format check, lint, typecheck, tests, and build.
See `.github/workflows/ci.yml` for triggers and configuration.

To verify Shopify access, open `/api/shopify-check` on the local development
server. A successful response contains a catalog sample or `product: null`
for an empty catalog. The route returns 404 in production.

### Shopify navigation

Manage menu titles, links, ordering and nested items in Shopify Admin under
**Content → Menus**. The shared layout uses these default handles:

| Surface | Default handle | Structure |
| --- | --- | --- |
| Header | `main-menu` | Main links with optional nested items for the mobile/tablet drawer. |
| Footer navigation | `footer-navigation` | Top-level groups with child links. |
| Footer legal links | `footer-legal` | A flat list of policy and legal links. |

Use the actual collection, page, policy or external destination for each link.
The Home link in the mobile/tablet drawer is supplied by the theme.

Menu handles can be changed in the Header and Footer groups of Weaverse Studio's
**Theme settings**. Menus are read on the server; changing a handle in Studio
refreshes its menu through the same-origin navigation endpoint. A missing menu
renders no links, and an upstream menu failure does not prevent the remaining
layout from rendering. Shopify menu-content edits can be checked by reloading
the preview.

Locale controls and payment icons are separate from Shopify navigation menus.
The payment icons currently follow the design's static list; they are not yet
synchronized with the store's enabled payment methods.

### Theme settings in Weaverse Studio

Open the designated project in Studio, select the appropriate preview URL, then
open **Theme settings**:

| Group | Configuration |
| --- | --- |
| Layout | Maximum width for containers using the shared page-width token. Header/Footer retain their own layout unless explicitly connected. |
| Colors | Shared background, text, border, action, label and layout color tokens. |
| Typography | Heading, Body and UI font families, using the bundled Inter and Open Sans fonts. |
| Buttons | Shared button corner radius, defaulting to 16px; explicit component overrides retain their own shape. |
| Announcement Bar | Announcement content, links, visibility and playback labels. |
| Header | Menu handle, optional logo, contact content and mobile/tablet menu labels. |
| Footer | Navigation/legal handles, branding, newsletter copy and visibility options. |

Appearance changes update the root theme settings store and the shared CSS
variables. Components using those tokens update in the preview; component-specific
styles can intentionally retain their approved design values. Typography settings
change font families, not font sizes or weights. Theme wordmarks retain Inter.

Publish the intended configuration in Studio and verify the deployed storefront
afterward. Live-preview edits alone do not prove that published settings persist.
The newsletter currently validates email input; actual subscription submission
still requires a connected handler.

See [.weaverse/specs/2026-11-09--design-system-shared-layout/](.weaverse/specs/2026-11-09--design-system-shared-layout/)
for implementation status, verification results and remaining issue #2 work.

### Configure a deployed preview

In the linked Vercel project, use the Next.js preset, Node.js 24.x,
`bun install --frozen-lockfile` for installation and `bun run build` for
the build command. Add the variables from `.env.example` to the Preview
environment, scoped to the intended branch if needed.

After deployment, open its URL directly and select it in Weaverse Studio.
Verify section selection, hover outlines, and heading edits in Studio.
The deployed preview runs independently of the local dev server.
