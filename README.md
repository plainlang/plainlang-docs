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

- `docs/` is the **language documentation** (the language guide). It is versioned with
  [Docusaurus docs versioning](https://docusaurus.io/docs/versioning) and served under `/docs/`.
- `unversioned/` holds content that follows the site rather than the language: the toolkit page
  (`/toolkit`) and the whitepapers (`/whitepapers/...`). It is a second docs plugin instance and is
  never snapshotted. Its sidebars live in `sidebars-unversioned.ts`.

The version number is the version of the ***plain language, not of plain-forge or pyro.

Right now there is a single version, **0.3**, which is the `current` version in `docs/`; no snapshot
has been cut, so `versioned_docs/` does not exist yet. The navbar shows the label from the
`versions.current` entry in `docusaurus.config.ts`.

### Cutting a new version

When work on the next language version (say 0.4) starts and the 0.3 docs must stay reachable:

```bash
yarn docusaurus docs:version 0.3
```

This copies `docs/` into `versioned_docs/version-0.3/`, the sidebar into `versioned_sidebars/`, and
records the version in `versions.json`. From then on `docs/` is the in-progress version. In
`docusaurus.config.ts`:

1. Set `lastVersion: '0.3'` so `/docs/` keeps serving the released language. The in-progress docs
   are served at `/docs/next/` with an "unreleased" banner.
2. Change `versions.current` to `{label: '0.4', path: 'next'}` (or leave the label as `Next`).
3. When 0.4 is released, run `yarn docusaurus docs:version 0.4`, set `lastVersion: '0.4'`, and
   0.3 moves to `/docs/0.3/`.

Keep the number of retained versions small; each one adds build time and has to be maintained
separately. Links inside `docs/` should be relative (`./definitions/concept-notation`) rather than
absolute (`/docs/language-guide/...`) so they stay correct inside a snapshot. `editCurrentVersion`
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