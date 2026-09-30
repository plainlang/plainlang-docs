import type {ReactNode} from 'react';
import {Sliders} from 'react-feather';
import {OPEN_EVENT} from './CookieConsent';
import styles from './CookieConsent.module.css';

/** Reopens the cookie consent banner in its preferences view. */
export default function CookieSettingsButton({
  children = 'cookie settings',
}: {
  children?: ReactNode;
}): ReactNode {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles.secondary} ${styles.withIcon}`}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      <Sliders aria-hidden="true" />
      {children}
    </button>
  );
}
