# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

[plainlang.org](https://www.plainlang.org/) is hosted on [Cloudflare](https://www.cloudflare.com/). To deploy changes to production site just push changes to GitHub repo.

## Content layout and versioning

- `docs/` is the **∗∗∗plain documentation**. It is versioned with
  [Docusaurus docs versioning](https://docusaurus.io/docs/versioning) and served under `/docs/`.
- `unversioned/` holds content that follows the site rather than the language: the toolkit page
  (`/toolkit`) and the whitepapers (`/whitepapers/...`). It is a second docs plugin instance and is
  never snapshotted. Its sidebars live in `sidebars-unversioned.ts`.

The version number is the version of the ***plain language, not of plain-forge or pyro.

There are two versions. **0.4** is the `current` version in `docs/` and is served at `/docs/`.
**0.3** is frozen in `versioned_docs/version-0.3/` and is served at `/docs/0.3/`. The navbar shows
the label from the `versions.current` entry in `docusaurus.config.ts`.

### Cutting a new version

When work on the next language version (say 0.5) starts and the 0.4 docs must stay reachable:

```bash
yarn docusaurus docs:version 0.4
```

This copies `docs/` into `versioned_docs/version-0.4/`, the sidebar into `versioned_sidebars/`, and
records the version in `versions.json`. From then on `docs/` holds the next version. In
`docusaurus.config.ts`, change the `versions.current` label to `0.5`.

To serve the next version separately while it is still in progress, set `lastVersion: '0.4'` and
`versions.current` to `{label: '0.5', path: 'next'}`. `/docs/` then keeps serving 0.4 and the
in-progress docs are at `/docs/next/` with an "unreleased" banner.

Keep the number of retained versions small; each one adds build time and has to be maintained
separately. Links inside `docs/` should be relative (`./definitions/concept-notation`) rather than
absolute (`/docs/guardrails/...`) so they stay correct inside a snapshot. `editCurrentVersion`
is on, so the "Edit this page" link always points at `docs/`.

## Analytics

The site uses [PostHog](https://eu.posthog.com/) (EU Cloud) for analytics. The snippet is injected from `docusaurus.config.ts` only when the `POSTHOG_KEY` environment variable is set at build time, so `yarn start` and builds without the variable ship no analytics.

PostHog starts opted out and stores nothing until the visitor accepts the cookie banner (`src/components/CookieConsent`). The choice is kept in `localStorage` and can be changed with the button on the cookie policy page, `src/pages/cookie-policy.mdx` (served at `/cookie-policy`), which reopens the banner in its preferences view.

`POSTHOG_KEY` is configured as a build environment variable in the Cloudflare Pages project. To test a production build locally:

```bash
POSTHOG_KEY=phc_your_project_token yarn build && yarn serve
```

# License

***plain is distributed under the terms of the Apache License (Version 2.0). See [LICENSE](LICENSE) for details.