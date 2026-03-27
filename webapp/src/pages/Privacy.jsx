import { Helmet } from 'react-helmet-async'

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — DevTools Installer</title>
        <meta name="description" content="Privacy policy for DevTools Installer website and desktop application." />
      </Helmet>

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
                <li>We do not use cookies, analytics services, or tracking scripts.</li>
                <li>Google Fonts are loaded from Google's CDN; Google's own privacy policy applies to that request.</li>
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
              <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
              <p>
                If you have questions about this policy, please drop an email to{' '}
                <a href="mailto:support@devtools-installer.web.app" className="text-primary-light hover:underline">support@devtools-installer.web.app</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
