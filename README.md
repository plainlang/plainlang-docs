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

## Analytics

The site uses [PostHog](https://eu.posthog.com/) (EU Cloud) for analytics. The snippet is injected from `docusaurus.config.ts` only when the `POSTHOG_KEY` environment variable is set at build time, so `yarn start` and builds without the variable ship no analytics.

PostHog starts opted out and stores nothing until the visitor accepts the cookie banner (`src/components/CookieConsent`). The choice is kept in `localStorage` and can be changed with the button on the cookie policy page, `src/pages/cookie-policy.mdx` (served at `/cookie-policy`), which reopens the banner in its preferences view.

`POSTHOG_KEY` is configured as a build environment variable in the Cloudflare Pages project. To test a production build locally:

```bash
POSTHOG_KEY=phc_your_project_token yarn build && yarn serve
```

# License

***plain is distributed under the terms of the Apache License (Version 2.0). See [LICENSE](LICENSE) for details.