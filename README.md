# Tech

A Next.js storefront theme for electronics and tech, powered by Weaverse.

**Tech is a working name and may change before release.**

The theme is currently in development.

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
| Studio connection and section editing | Weaverse supplies the Studio connection, renderer and editing runtime. Forward restores request context on the client and registers its sections. | Tech includes `WeaverseNextStudioConnect`, server request context and client context restoration. Text editing was verified locally. Studio connectivity to the Vercel preview was confirmed. | Implement the approved section schemas and registry entries. Verify heading edits on the deployed preview, then test each new section's editing behavior. |
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
  The deployed preview now connects to Studio; confirm the same heading-edit
  test there before recording deployed editing as verified.
- Resource-backed section revalidation, customer accounts and multi-market
  behavior have not been verified in Tech.
- Forward's implementation was reviewed as a reference. Its commerce,
  account and localization flows have not been functionally tested as part
  of this Tech review.
