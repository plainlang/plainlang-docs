import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {
  useVersions,
  useLatestVersion,
} from '@docusaurus/plugin-content-docs/client';

// Lists every version of the language documentation, in the spirit of
// https://jestjs.io/versions. Linked from the version dropdown in the navbar.
export default function Versions(): ReactNode {
  const versions = useVersions('default');
  const latestVersion = useLatestVersion('default');
  const nextVersion = versions.find(
    (v) => v.name === 'current' && v !== latestVersion,
  );
  const pastVersions = versions.filter(
    (v) => v !== latestVersion && v !== nextVersion,
  );

  return (
    <Layout
      title="Versions"
      description="All versions of the ∗∗∗plain language documentation">
      <main className="container margin-vert--lg">
        <Heading as="h1">∗∗∗plain documentation versions</Heading>
        <p>
          The version number is the version of the ∗∗∗plain language. The{' '}
          <Link to="/toolkit">toolkit</Link> and the{' '}
          <Link to="/whitepapers">whitepapers</Link> are not versioned.
        </p>

        <section className="margin-bottom--lg">
          <Heading as="h3" id="latest">
            Current version (Stable)
          </Heading>
          <p>Here you can find the documentation for the current released version.</p>
          <table>
            <tbody>
              <tr>
                <th>{latestVersion.label}</th>
                <td>
                  <Link to={latestVersion.path}>Documentation</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {nextVersion && (
          <section className="margin-bottom--lg">
            <Heading as="h3" id="next">
              Next version (Unreleased)
            </Heading>
            <p>Here you can find the documentation for work-in-progress unreleased version.</p>
            <table>
              <tbody>
                <tr>
                  <th>{nextVersion.label}</th>
                  <td>
                    <Link to={nextVersion.path}>Documentation</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {pastVersions.length > 0 && (
          <section className="margin-bottom--lg">
            <Heading as="h3" id="archive">
              Past versions (Not maintained anymore)
            </Heading>
            <p>Here you can find documentation for previous versions of ∗∗∗plain.</p>
            <table>
              <tbody>
                {pastVersions.map((version) => (
                  <tr key={version.name}>
                    <th>{version.label}</th>
                    <td>
                      <Link to={version.path}>Documentation</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </Layout>
  );
}
