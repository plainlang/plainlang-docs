/**
 * Cloudflare Pages middleware: tells the page whether the visitor needs the
 * cookie consent banner.
 *
 * Cloudflare resolves the visitor's country (request.cf.country). For HTML
 * responses we add `data-consent-region` to <html>:
 *   - "required"     visitor is in the EU/EEA, UK or Switzerland
 *   - "not-required" visitor's country is known and outside that list
 * Nothing is stored on the visitor's device. When the attribute is missing
 * (local `yarn start`/`yarn serve`, unknown country, Tor) the banner is shown,
 * so the safe default is always to ask.
 *
 * static/_routes.json keeps this function off static assets.
 */

const CONSENT_COUNTRIES = new Set([
  // EU
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
  'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES',
  'SE',
  // EEA
  'IS', 'LI', 'NO',
  // UK GDPR and Swiss FADP
  'GB', 'CH',
]);

// Cloudflare's codes for "unknown" (XX) and Tor (T1): treat as consent required.
const UNKNOWN = new Set(['XX', 'T1']);

function consentRegion(country) {
  if (!country || UNKNOWN.has(country)) return 'required';
  return CONSENT_COUNTRIES.has(country) ? 'required' : 'not-required';
}

export async function onRequest({request, next}) {
  const response = await next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  const region = consentRegion(request.cf && request.cf.country);
  const rewritten = new HTMLRewriter()
    .on('html', {
      element(el) {
        el.setAttribute('data-consent-region', region);
      },
    })
    .transform(response);

  // The HTML now differs per visitor region; keep shared caches from mixing it up.
  const headers = new Headers(rewritten.headers);
  headers.set('Cache-Control', 'private, no-cache');
  return new Response(rewritten.body, {status: rewritten.status, headers});
}
