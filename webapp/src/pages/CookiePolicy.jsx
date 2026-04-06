import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd } from '../config/seo'

export default function CookiePolicy() {
  return (
    <>
      <SEO
        title="Cookie Policy — DevTools Installer | What Cookies We Use"
        description="Cookie policy for the DevTools Installer website. Learn about the cookies we use, including Google AdSense advertising cookies, and how to manage your preferences."
        keywords="DevTools Installer cookies, cookie policy, advertising cookies, Google AdSense cookies, cookie consent, GDPR cookies"
        path="/cookie-policy"
        jsonLd={buildBreadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Cookie Policy', url: '/cookie-policy' },
        ])}
      />

      <section className="pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-400">Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert prose-sm max-w-none">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-8 text-gray-400 text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">What Are Cookies</h2>
              <p>
                Cookies are small text files stored on your device by your web browser when
                you visit a website. They are used to remember your preferences, analyze
                site traffic, and serve relevant advertising. Cookies may be set by the site
                you are visiting (&quot;first-party cookies&quot;) or by third-party services
                operating on that site (&quot;third-party cookies&quot;).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Cookies We Use</h2>
              <p className="mb-4">
                The DevTools Installer website uses the following categories of cookies:
              </p>

              <h3 className="text-sm font-semibold text-white mb-2">Essential Cookies</h3>
              <p className="mb-4">
                These cookies are necessary for the website to function and cannot be
                disabled. They include cookies that remember your cookie consent preference
                so you are not asked repeatedly each visit. These cookies do not collect
                personal information.
              </p>

              <h3 className="text-sm font-semibold text-white mb-2">Advertising Cookies (Google AdSense)</h3>
              <p className="mb-4">
                This website displays advertisements served by Google AdSense. Google and
                its advertising partners use cookies to serve ads based on your prior visits
                to this site and other websites. These cookies enable Google to display
                personalized advertising content. The information collected through these
                cookies may include:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Pages you visit on this site and other sites in the Google ad network</li>
                <li>Your general geographic location (based on IP address)</li>
                <li>Interactions with advertisements</li>
                <li>Browser type and device information</li>
              </ul>
              <p>
                Google&apos;s use of advertising cookies is governed by the{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light hover:underline"
                >
                  Google Privacy Policy
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Managing Cookies</h2>
              <p className="mb-4">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong className="text-white">Browser settings:</strong> Most browsers
                  allow you to refuse or delete cookies through their settings. Refer to
                  your browser&apos;s help documentation for instructions.
                </li>
                <li>
                  <strong className="text-white">Google Ad Settings:</strong> You can opt out
                  of personalized advertising by visiting{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-light hover:underline"
                  >
                    Google Ads Settings
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-white">NAI opt-out:</strong> Visit the{' '}
                  <a
                    href="https://optout.networkadvertising.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-light hover:underline"
                  >
                    Network Advertising Initiative opt-out page
                  </a>{' '}
                  to opt out of interest-based advertising from NAI member companies.
                </li>
                <li>
                  <strong className="text-white">DAA opt-out:</strong> Visit the{' '}
                  <a
                    href="https://optout.aboutads.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-light hover:underline"
                  >
                    Digital Advertising Alliance opt-out page
                  </a>{' '}
                  for additional choices.
                </li>
              </ul>
              <p className="mt-4">
                Please note that disabling cookies may affect the functionality of this
                website and your experience on other websites.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Desktop Application</h2>
              <p>
                The DevTools Installer desktop application does not use cookies, does not
                load web content, and does not set any tracking identifiers. It runs
                entirely offline on your local machine. This cookie policy applies only to
                the devtoolsinstaller.com website.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Changes to This Policy</h2>
              <p>
                We may update this cookie policy from time to time. Changes will be posted
                on this page with an updated revision date. We encourage you to review this
                policy periodically.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
              <p>
                If you have questions about our use of cookies, please contact us at{' '}
                <a
                  href="mailto:support@devtoolsinstaller.com"
                  className="text-primary-light hover:underline"
                >
                  support@devtoolsinstaller.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
