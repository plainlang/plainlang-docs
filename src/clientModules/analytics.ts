/**
 * Named PostHog events for the clicks we care about.
 *
 * Every event carries the same three properties, so one insight can break all
 * of them down the same way:
 *   label     what was clicked, as the visitor sees it ("toolkit", "GitHub repository")
 *   url       where it leads
 *   location  where on the page: navbar | sidebar | footer | content | a
 *             custom value from data-track-location (e.g. home_hero)
 * Some events add one specific property (language, file, method, number).
 * PostHog adds page, host and device ($pathname, $host, $device_type) itself.
 *
 * Everything goes through `window.posthog.capture`, so nothing is sent until
 * the visitor has analytics on (see CookieConsent), and nothing at all when
 * POSTHOG_KEY was not set at build time.
 *
 * To track another element, add `data-track="event_name"`; `data-track-label`
 * and `data-track-location` override the defaults and any other
 * `data-track-*` attribute becomes an extra property.
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

type Props = Record<string, string | number | boolean | undefined>;

/**
 * Nav items with their own event, keyed by label (lowercased). Matched in the
 * docs sidebar and the navbar, desktop and mobile; `location` tells them apart.
 * Renaming an item in the docs needs an update here.
 */
const NAV_EVENTS: Record<string, string> = {
  'getting started': 'getting_started_clicked',
  'guardrails': 'guardrails_clicked',
  'regenerative software': 'regenerative_software_clicked',
  'whitepapers': 'whitepapers_clicked',
  'white papers': 'whitepapers_clicked',
  'toolkit': 'toolkit_clicked',
};

const NAV_LINK = [
  'li.theme-doc-sidebar-item-link a.menu__link',
  'li.theme-doc-sidebar-item-category a.menu__link',
  'a.navbar__link',
  '.navbar-sidebar a.menu__link',
].join(', ');

// Matched by its (English) aria-label: the CSS module class is minified away
// in production builds.
const COPY_BUTTON = '.theme-code-block button[aria-label="Copy code to clipboard"]';

function track(event: string, props: Props): void {
  window.posthog?.capture(event, props);
}

function labelOf(el: Element): string | undefined {
  const text = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim();
  return text ? text.slice(0, 100) : undefined;
}

function locationOf(el: Element): string {
  if (el.closest('li[class*="theme-doc-sidebar-item-"]')) return 'sidebar';
  if (el.closest('nav.navbar')) return 'navbar';
  if (el.closest('footer')) return 'footer';
  return 'content';
}

/** label, url and location for any clicked element. */
function baseProps(el: Element): Props {
  const href = el.closest('a[href]')?.getAttribute('href');
  return {
    label: labelOf(el),
    url: href ? new URL(href, window.location.href).href : undefined,
    location: locationOf(el),
  };
}

/** data-track-foo-bar="x" -> {foo_bar: 'x'} */
function dataTrackProps(el: HTMLElement): Props {
  const props: Props = {};
  for (const [key, value] of Object.entries(el.dataset)) {
    if (key.startsWith('track') && key !== 'track') {
      props[key.slice(5).replace(/[A-Z]/g, (c, i) => (i ? '_' : '') + c.toLowerCase())] = value;
    }
  }
  return props;
}

function onClick(e: MouseEvent): void {
  const target = e.target;
  if (!(target instanceof Element)) return;

  // Explicit data-track markup wins.
  const tracked = target.closest<HTMLElement>('[data-track]');
  if (tracked?.dataset.track) {
    track(tracked.dataset.track, {...baseProps(tracked), ...dataTrackProps(tracked)});
    return;
  }

  // Named nav items. Other nav links fall through, so the GitHub icon still
  // counts as an outbound link.
  const navLink = target.closest(NAV_LINK);
  const navEvent = navLink && NAV_EVENTS[labelOf(navLink)?.toLowerCase() ?? ''];
  if (navLink && navEvent) {
    track(navEvent, baseProps(navLink));
    return;
  }

  const copyButton = target.closest(COPY_BUTTON);
  if (copyButton) {
    const block = copyButton.closest('.theme-code-block');
    const language = Array.from(block?.classList ?? [])
      .find((c) => c.startsWith('language-'))
      ?.slice('language-'.length);
    track('code_copied', {...baseProps(copyButton), label: 'copy code', language});
    return;
  }

  const searchButton = target.closest('.DocSearch-Button');
  if (searchButton) {
    track('search_opened', {...baseProps(searchButton), label: 'search', method: 'click'});
    return;
  }

  const link = target.closest<HTMLAnchorElement>('a[href]');
  if (!link) return;
  const url = new URL(link.href, window.location.href);
  if (link.hasAttribute('download')) {
    track('file_downloaded', {
      ...baseProps(link),
      file: link.getAttribute('download') || url.pathname.split('/').pop(),
    });
  } else if (/^https?:$/.test(url.protocol) && url.host !== window.location.host) {
    track('outbound_link_clicked', baseProps(link));
  }
}

function onKeyDown(e: KeyboardEvent): void {
  const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
  // DocSearch opens on Cmd/Ctrl+K, and on "/" outside text fields.
  if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && !typing)) {
    track('search_opened', {label: 'search', location: 'keyboard', method: 'keyboard'});
  }
}

if (ExecutionEnvironment.canUseDOM) {
  // Capture phase so we still see clicks whose handlers stop propagation
  // (e.g. the brand page's logo download buttons).
  document.addEventListener('click', onClick, {capture: true});
  document.addEventListener('keydown', onKeyDown);
}
