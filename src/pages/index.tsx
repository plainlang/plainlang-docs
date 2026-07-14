import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodePlayground from '@site/src/components/CodePlayground/CodePlayground';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const pageTitle = siteConfig.title;
  const pageTagline = siteConfig.tagline;

  return (
    <Layout
      title={pageTitle}
      description={pageTagline}>
      <main className={styles.heroWrapper}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            {pageTitle}
          </h1>
          <p className={styles.heroSubtitle}>
            {pageTagline}
          </p>
          <div className={styles.ctaButtons}>
            <a href="/docs/language-guide/" className={styles.primaryButton}>
              GET STARTED
            </a>
            {/* <a href="#demo" className={styles.secondaryButton}>
              WATCH DEMO
            </a> */}
          </div>
        </div>
      </main>
      
      {/* <section className={styles.playgroundSection}>
        <CodePlayground />
      </section> */}
    </Layout>
  );
}
