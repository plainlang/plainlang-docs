import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {Sliders} from 'react-feather';
import styles from './CookieConsent.module.css';

/**
 * Cookie consent banner gating PostHog analytics.
 *
 * PostHog starts opted out (see docusaurus.config.ts) and captures nothing
 * until this component calls `opt_in_capturing()`. The choice is stored under
 * STORAGE_KEY, which is strictly necessary and needs no consent.
 *
 * Dispatching `new Event(OPEN_EVENT)` on `window` reopens the banner in the
 * preferences view so a visitor can change their mind.
 */

const STORAGE_KEY = 'plainlang.cookieConsent';
export const OPEN_EVENT = 'plainlang:cookie-settings';
const EXIT_MS = 160;

const PREFS = [
  {name: 'necessary', locked: true, desc: 'Required for the site to work. Remembers your cookie choice.'},
  {name: 'analytics', locked: false, desc: 'Helps us understand how the docs are used. PostHog, hosted in the EU.'},
];

type Consent = 'accepted' | 'declined';
type State = 'closed' | 'open' | 'closing';
type View = 'choices' | 'preferences';

declare global {
  interface Window {
    posthog?: {
      opt_in_capturing: (options?: {captureEventName?: string | false | null}) => void;
      opt_out_capturing: () => void;
    };
  }
}

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
}

function applyConsent(value: Consent): void {
  // Undefined when POSTHOG_KEY was not set at build time. Until array.js loads
  // it is the snippet stub, which queues calls, so this is safe at any time.
  const posthog = window.posthog;
  if (value === 'accepted') posthog?.opt_in_capturing({captureEventName: false});
  else posthog?.opt_out_capturing();
}

export default function CookieConsent(): ReactNode {
  // 'closed' renders nothing, so server and first client render match.
  const [state, setState] = useState<State>('closed');
  const [view, setView] = useState<View>('choices');
  const [analytics, setAnalytics] = useState(false);

  const openPreferences = () => {
    setAnalytics(readConsent() === 'accepted');
    setView('preferences');
  };

  useEffect(() => {
    const stored = readConsent();
    if (stored) applyConsent(stored);
    else setState('open');
    const onOpen = () => {
      openPreferences();
      setState('open');
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (state !== 'closing') return undefined;
    const timer = setTimeout(() => setState('closed'), EXIT_MS);
    return () => clearTimeout(timer);
  }, [state]);

  const decide = (value: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage unavailable; the banner simply shows again on the next visit.
    }
    applyConsent(value);
    setState('closing');
  };

  if (state === 'closed') return null;

  return (
    <div
      className={`${styles.banner} ph-no-capture`}
      data-state={state}
      role="region"
      aria-label="Cookie consent">
      <p className={styles.text}>
        ***plain uses cookies to improve your experience. Read our{' '}
        <Link to="/cookie-policy">cookie policy</Link> for more details.
      </p>

      {view === 'preferences' && (
        <ul className={styles.preferences} aria-label="Cookie preferences">
          {PREFS.map(({name, locked, desc}) => (
            <li key={name}>
              <label className={styles.pref}>
                <span className={styles.prefText}>
                  <span className={styles.prefName}>{name}</span>
                  <span className={styles.prefDesc}>{desc}</span>
                </span>
                <input
                  type="checkbox"
                  role="switch"
                  className={styles.switch}
                  checked={locked || analytics}
                  disabled={locked}
                  autoFocus={!locked}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  aria-label={locked ? `${name} cookies, always on` : `${name} cookies`}
                />
              </label>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.actions}>
        {view === 'choices' ? (
          <>
            <button
              type="button"
              className={`${styles.button} ${styles.ghost} ${styles.iconButton}`}
              onClick={openPreferences}
              aria-label="Cookie preferences"
              title="Cookie preferences">
              <Sliders aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.secondary}`}
              onClick={() => decide('declined')}>
              decline
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.primary}`}
              onClick={() => decide('accepted')}>
              accept
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={`${styles.button} ${styles.ghost}`}
              onClick={() => setView('choices')}>
              back
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.primary}`}
              onClick={() => decide(analytics ? 'accepted' : 'declined')}>
              save preferences
            </button>
          </>
        )}
      </div>
    </div>
  );
}
