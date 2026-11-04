# Tech

A Next.js storefront theme for electronics and tech, powered by Weaverse.

**Tech is a working name and may change before release.**

The theme is currently in development.

## Preview and verification

[Open the Vercel preview](https://tech-ogzakfs72-nao-3834.vercel.app)

The deployed Home page and Studio connection have been checked. Editing the
`TextBlock` heading in Studio updates the deployed preview, as confirmed
during manual verification.

The current preview is publicly accessible. Vercel Authentication is disabled
for this project so Studio can embed the preview. Draft changes are tested
in Studio; publish page content in Weaverse to make it visible on the
standalone storefront.

This URL identifies a specific deployment. Update this link when a newer
deployment becomes the review target.

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

While the foundation PR is under review, use its feature branch.

```bash
git clone https://github.com/Weaverse/tech.git
cd tech
git switch feat/storefront-foundation
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
lint, typecheck and build on pushes to `main` or
`feat/storefront-foundation`, and on pull requests targeting `main`.
CI does not currently exercise store-connected customer flows.

### Configure a deployed preview

In the linked Vercel project, use the Next.js preset, Node.js 24.x,
`bun install --frozen-lockfile` for installation and `bun run build` for
the build command. Add the variables from `.env.example` to the Preview
environment, scoped to the intended branch if needed.

After deployment, open its URL directly and select it in Weaverse Studio.
Verify that editing the `TextBlock` heading updates the preview.
The deployed preview runs independently of the local dev server.

## Theme capability boundaries

Tech uses Forward as an implementation reference. Platform APIs and SDK
features provide the foundation; each storefront capability must be
integrated and verified in Tech.

| Area | Platform support and Forward reference | Current state in Tech | Theme responsibility and next steps |
| --- | --- | --- | --- |
| Page composition | Weaverse provides schemas, page loading and rendering. Forward implements reusable sections and routes for multiple page types. | Home loads the `INDEX` page and renders it through the client registry. `TextBlock` exposes an editable `heading`. | Build sections from the approved Tech design. Add the required routes and page types, with matching request context. Section registration makes a component available; page composition determines where it appears. |
| Catalog and browsing | Shopify supplies catalog data. Forward implements a server-side storefront data layer, product and collection routes, search, filtering, sorting and pagination. | A terminal Storefront API query returned `Sonic Pulse Mini`. Tech application code does not yet query Shopify. | Integrate server-side catalog access and build the approved browsing and product UI. Keep filter, sort and pagination query handling in the route/data layer. Pass resolved data to sections. Keep private credentials on the server. |
| Cart and checkout | Shopify supplies Cart APIs and hosted checkout. Forward uses Hydrogen cart handlers, server-managed cart identity, shared add-to-cart logic and checkout URL validation. | No cart API route, cart state, cart UI or checkout handoff is implemented. | Reuse the proven API integration pattern and build Tech's cart interactions, persistence, error states and checkout handoff. Keep cart behavior theme-owned. Visual sections can use shared cart controls. |
| Customer accounts | Forward uses Hydrogen Customer Account handlers for the authentication protocol. Its theme code supplies configuration, session storage, redirects and account pages. | No account integration, authentication routes, sessions or account UI is implemented. | Confirm the required account features. Integrate the existing authentication helpers and implement the required session boundary, callbacks, logout handling and account UI. Keep account behavior theme-owned. |
| Markets and localization | Forward implements locale routing, market-scoped Shopify reads, localized links, money/date formatting and translation helpers. Its theme schema exposes markets and translatable theme copy to Studio. | Home uses a fixed US/English request context with locale `en-US`. The document uses `lang="en"`. No market selector or locale routing is implemented. | Confirm supported markets and languages. Align routing, request context, Shopify reads and formatting. Define translatable theme copy and expose the supported locales to Studio. |
| Studio connection and section editing | Weaverse supplies the Studio connection, renderer and editing runtime. Forward restores request context on the client and registers its sections. | Tech includes `WeaverseNextStudioConnect`, server request context and client context restoration. TextBlock heading edits were verified in both the local and deployed Studio previews. | Implement the approved section schemas and registry entries. Test each new section's editing behavior on local and deployed previews. |
| Resource-backed sections and theme settings | Forward has separate server/client registries, section loaders, a per-item revalidation endpoint and a custom theme settings schema. Header/footer are theme-owned components configured through settings. | Tech only has the text-based `TextBlock`. It has no resource-backed loader, `/api/weaverse/revalidate` endpoint, custom theme settings schema, header or footer implementation. | Add loaders and the SDK revalidation handler when sections need external data. Configure Shopify resource selection when required. Define Tech's global settings and build header/footer against the approved design. |

### Decisions to confirm with the team

- Required commerce features for the initial release, including search,
  filtering, sorting, quick add and cart behavior.
- Required customer-account pages and actions.
- Supported markets, languages and the default market.
- Global design settings that merchants should control in Studio.

### Verification scope

- Shopify credentials were verified through a terminal query.
  Shopify data integration in the Tech application remains to be implemented.
- The `TextBlock` heading was edited successfully in the local Studio preview.
  The same heading-edit flow was also verified in the deployed Studio preview.
- Resource-backed section revalidation, customer accounts and multi-market
  behavior have not been verified in Tech.
- Forward's implementation was reviewed as a reference. Its commerce,
  account and localization flows have not been functionally tested as part
  of this Tech review.
