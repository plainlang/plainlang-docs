import {themes as prismThemes} from 'prism-react-renderer';
import type {Config, HtmlTagObject} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// PostHog analytics (EU Cloud, served through the managed reverse proxy).
// Only injected when POSTHOG_KEY is set, so local `yarn start` stays silent.
// The key is a public project token configured in the Cloudflare Pages
// build environment; see README.md.
const posthogKey = process.env.POSTHOG_KEY;
const posthogHost = 'https://kurircek.codeplain.ai';

if (!posthogKey && process.env.NODE_ENV === 'production') {
  console.warn('[posthog] POSTHOG_KEY is not set; PostHog will not be loaded.');
}

const posthogHeadTags: HtmlTagObject[] = posthogKey
  ? [
      {
        tagName: 'link',
        attributes: {rel: 'preconnect', href: posthogHost},
      },
      {
        tagName: 'script',
        attributes: {},
        innerHTML: `
!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}p||((p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",p.onerror=function(){p=null},(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r));var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="mu yu bu Su init Vu Gu zu Uu Ku il Wu Yu ju rh oh ah uh hh dh capture getExtension Zu pu gh calculateEventProperties ph register register_once register_for_session unregister unregister_for_session Hu mh getFeatureFlag getFeatureFlagPayload getFeatureFlagResult getAllFeatureFlags isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync wh identify setPersonProperties unsetPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset kh shutdown setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty yh ih createPersonProfile setInternalOrTestUser bh xu Cu opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing th debug nl Os getPageViewId captureTraceFeedback captureTraceMetric Du".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init(${JSON.stringify(posthogKey)}, {
  api_host: ${JSON.stringify(posthogHost)},
  ui_host: 'https://eu.posthog.com',
  defaults: '2026-05-30',
  person_profiles: 'identified_only',
  opt_out_capturing_by_default: true,
  opt_out_persistence_by_default: true,
});
`,
      },
    ]
  : [];

const config: Config = {
  title: '∗∗∗plain, the language of spec-driven development',
  tagline: '∗∗∗plain is a specification language that combines the efficiency of natural language with the control and precision of code.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://plainlang.org',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  headTags: posthogHeadTags,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/plainlang/plainlang-docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/plainlang_social_image.png',
    colorMode: {
      defaultMode: 'dark',
    },
    navbar: {
      title: '',
      logo: {
        alt: '***plain logo',
        src: 'img/plain logo_black.svg',
        srcDark: 'img/plain logo_white.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'right',
          label: 'docs',
        },
        {
          to: '/docs/toolkit',
          position: 'right',
          label: 'toolkit',
        },
        {
          to: '/docs/whitepapers',
          position: 'right',
          label: 'white papers',
        },
        {
          href: 'https://github.com/plainlang',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: '***plain logo',
        src: 'img/plain_icon_black.svg',
        srcDark: 'img/plain_icon_white.svg',
        width: 40,
      },
      links: [
        {
          items: [
            {
              label: 'hosted by *codeplain',
              href: 'https://www.codeplain.ai/',
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: "MKUEHW6BXL",
      apiKey: "23e098fd5108b2272fd4f21f019bd020",
      indexName: "plainlang.org documentation",
    }
  } satisfies Preset.ThemeConfig,
};

export default config;
