import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd } from '../config/seo'

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy — DevTools Installer | No Data Collection, No Telemetry"
        description="Privacy policy for DevTools Installer. No personal data collected, no analytics, no telemetry. The desktop application runs entirely offline on your local Windows machine."
        keywords="DevTools Installer privacy, developer tools privacy policy, no telemetry installer, offline developer tools, data privacy developer tools"
        path="/privacy"
        jsonLd={buildBreadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy' },
        ])}
      />

      <section className="pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-400">Last updated: March 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert prose-sm max-w-none">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-8 text-gray-400 text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Overview</h2>
              <p>
                DevTools Installer is a desktop application for Windows that automates the
                installation and configuration of developer tools. Your privacy is important
                to us. This policy explains what data the application and this website
                handle.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Desktop Application</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Runs entirely on your local machine — no cloud backend.</li>
                <li>No personal data is collected, stored, or transmitted.</li>
                <li>Internet access is used solely to download tool binaries from official sources.</li>
                <li>No analytics, tracking, or telemetry is included.</li>
                <li>
                  System modifications are limited to installing tools in their default
                  directories and updating PATH / environment variables.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Website</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>This website is a static site hosted on Firebase.</li>
                <li>
                  This website uses cookies for advertising purposes via Google AdSense
                  (see the &quot;Advertising &amp; Cookies&quot; section below for full details).
                </li>
                <li>Google Fonts are loaded from Google's CDN; Google's own privacy policy applies to that request.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Advertising &amp; Cookies</h2>
              <p className="mb-3">
                This website uses Google AdSense to display advertisements. Google AdSense
                and its partners may use cookies and web beacons to serve ads based on your
                prior visits to this site or other websites. Specifically:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Google uses cookies (including the DoubleClick cookie) to serve ads based
                  on your visits to this website and other sites on the Internet.
                </li>
                <li>
                  You may opt out of personalised advertising by visiting{' '}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">
                    Google Ads Settings
                  </a>.
                </li>
                <li>
                  Third-party vendors and ad networks may also use cookies to serve ads on
                  this site. You can opt out of some third-party vendor cookies at{' '}
                  <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">
                    Network Advertising Initiative opt-out page
                  </a>.
                </li>
                <li>
                  We do not collect or share personal information beyond what is automatically
                  processed by Google AdSense.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Third Parties</h2>
              <p>
                Tool binaries are downloaded from their respective publishers (Oracle,
                Node.js Foundation, Python Software Foundation, Git for Windows, etc.). Each
                publisher's own privacy policy applies to those downloads.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Your Rights (GDPR &amp; CCPA)</h2>
              <p className="mb-3">
                If you are located in the European Economic Area (EEA) or California, you have
                certain data protection rights. Because the DevTools Installer desktop application
                does not collect any personal data, these rights primarily apply to the cookies
                set by Google AdSense on this website:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong className="text-white">Right to opt out:</strong> You may opt out of
                  personalised advertising at any time via{' '}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">
                    Google Ads Settings
                  </a>{' '}
                  or the{' '}
                  <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">
                    NAI opt-out page
                  </a>.
                </li>
                <li>
                  <strong className="text-white">Cookie management:</strong> You can configure your
                  browser to refuse cookies or alert you when cookies are being sent. Note that
                  disabling cookies may affect the display of advertisements on this site.
                </li>
                <li>
                  <strong className="text-white">Data access &amp; deletion:</strong> Since we do not
                  collect personal data ourselves, there is no personal data stored on our servers
                  to access or delete. For data held by Google through AdSense, please refer to{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">
                    Google's Privacy Policy
                  </a>.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Children&apos;s Privacy</h2>
              <p>
                This website and the DevTools Installer application are not directed at children
                under the age of 13. We do not knowingly collect personal information from children.
                If you believe a child has provided us with personal data, please contact us so we
                can take appropriate action.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this
                page with an updated &quot;Last updated&quot; date. We encourage you to review this
                policy periodically.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
              <p>
                If you have questions about this policy, please drop an email to{' '}
                <a href="mailto:support@devtoolsinstaller.com" className="text-primary-light hover:underline">support@devtoolsinstaller.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
