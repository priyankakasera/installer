import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd } from '../config/seo'

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms & Conditions — DevTools Installer"
        description="Terms and conditions for using DevTools Installer, the free one-click developer tool setup application for Windows."
        keywords="DevTools Installer terms, terms and conditions, developer tools terms of use, software usage terms"
        path="/terms"
        jsonLd={buildBreadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Terms & Conditions', url: '/terms' },
        ])}
      />

      <section className="pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-lg text-gray-400">Last updated: March 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert prose-sm max-w-none">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-8 text-gray-400 text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By downloading, installing, or using DevTools Installer (the &quot;Application&quot;)
                or accessing this website (devtoolsinstaller.com), you agree to be bound by these
                Terms &amp; Conditions. If you do not agree with any part of these terms, you should
                not use the Application or this website.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">2. Description of Service</h2>
              <p>
                DevTools Installer is a free desktop utility for Windows that automates the download,
                installation, configuration, and removal of third-party developer tools. The Application
                downloads tool binaries directly from their official publishers and configures system
                environment variables (such as PATH, JAVA_HOME, and MAVEN_HOME) on your behalf.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">3. License</h2>
              <p>
                DevTools Installer is provided free of charge for personal and commercial use. You may
                install and use the Application on any number of machines. You may not reverse-engineer,
                decompile, or redistribute modified versions of the Application without permission.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">4. Third-Party Software</h2>
              <p>
                The Application facilitates the installation of third-party developer tools (e.g., Java,
                Node.js, Python, Git, Maven, VS Code). Each of these tools is developed, maintained, and
                distributed by its respective publisher under its own license terms. DevTools Installer
                does not modify, repackage, or redistribute these tools — it downloads them directly from
                official sources.
              </p>
              <p className="mt-2">
                By using DevTools Installer to install a third-party tool, you agree to the license
                terms of that tool as set by its publisher. It is your responsibility to review and accept
                those terms. DevTools Installer is not affiliated with, endorsed by, or sponsored by any
                of the third-party tool publishers.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">5. Trademarks & Intellectual Property</h2>
              <p>
                All product names, logos, and brands mentioned on this website and within the Application
                are the property of their respective owners. Java is a trademark of Oracle Corporation.
                Node.js is a trademark of the OpenJS Foundation. Python is a trademark of the Python
                Software Foundation. Git is a trademark of Software Freedom Conservancy. All other
                trademarks are the property of their respective holders. Use of these names is for
                identification purposes only and does not imply endorsement.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">6. Disclaimer of Warranties</h2>
              <p>
                DevTools Installer is provided &quot;as is&quot; and &quot;as available&quot; without
                warranties of any kind, either express or implied. We do not warrant that the Application
                will be error-free, uninterrupted, or compatible with all system configurations. We do
                not guarantee the availability, accuracy, or integrity of downloads from third-party
                publisher servers, as those are outside our control.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, DevTools Installer and its
                maintainers shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages arising out of or related to your use of the Application or this
                website. This includes, but is not limited to, damages for loss of data, system
                downtime, or configuration errors.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">8. System Modifications</h2>
              <p>
                By using DevTools Installer, you authorize the Application to make the following
                modifications to your system:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Install software to default program directories (e.g., C:\Program Files).</li>
                <li>Create or modify system and user environment variables (PATH, JAVA_HOME, MAVEN_HOME, GRADLE_HOME, etc.).</li>
                <li>Register applications with Windows (for uninstall entries in Apps &amp; Features).</li>
                <li>Remove installed tools, their PATH entries, and related environment variables when you use the uninstall feature.</li>
              </ul>
              <p className="mt-2">
                These modifications require administrator privileges. The Application will prompt for
                elevation when needed.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">9. Website Content</h2>
              <p>
                The installation guides, documentation, and other content on this website are provided
                for informational purposes. While we strive to keep information accurate and up to date,
                we make no guarantees about the completeness or accuracy of the content. Tool versions,
                download URLs, and installation procedures may change when publishers release updates.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">10. Disclaimer</h2>
              <p>
                DevTools Installer is a utility that modifies system-level settings, including but not
                limited to environment variables and the system PATH. While the Application is designed
                and tested to make these changes safely and reversibly, you acknowledge that modifying
                system configuration carries inherent risk. We strongly recommend creating a system
                restore point before installing or uninstalling developer tools.
              </p>
              <p className="mt-2">
                The developer tools installed via this Application are third-party software. DevTools
                Installer does not guarantee the security, stability, or functionality of any
                third-party tool. You are solely responsible for ensuring that the tools you install
                are suitable for your intended use and that you comply with their respective license
                terms.
              </p>
              <p className="mt-2">
                The information provided on this website — including installation guides, troubleshooting
                tips, and tool descriptions — is for general informational purposes only and does not
                constitute professional advice. Always refer to the official documentation maintained
                by each tool's publisher for the most accurate and current information.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">11. Changes to These Terms</h2>
              <p>
                We reserve the right to update these Terms &amp; Conditions at any time. Changes will be
                posted on this page with an updated &quot;Last updated&quot; date. Continued use of the
                Application or website after changes constitutes acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">12. Contact</h2>
              <p>
                If you have questions about these terms, please contact us at{' '}
                <a
                  href="mailto:support@devtoolsinstaller.com"
                  className="text-primary-light hover:underline"
                >
                  support@devtoolsinstaller.com
                </a>{' '}
                or visit our{' '}
                <Link to="/support" className="text-primary-light hover:underline">
                  Support page
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
