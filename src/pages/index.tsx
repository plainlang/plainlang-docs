import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />">
      <main className={styles.comingSoonWrapper}>
        <div className="container">
          <Heading as="h1" className={styles.comingSoonTitle}>
            Coming soon
          </Heading>
        </div>
      </main>
    </Layout>
  );
}
