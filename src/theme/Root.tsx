import type {ReactNode} from 'react';
import CookieConsent from '@site/src/components/CookieConsent/CookieConsent';

// Wraps the whole app once. Docusaurus renders this on every page, so it is
// the place for site-wide UI such as the cookie consent banner.
export default function Root({children}: {children: ReactNode}): ReactNode {
  return (
    <>
      {children}
      <CookieConsent />
    </>
  );
}
