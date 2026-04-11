import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd } from '../config/seo'

export default function Disclaimer() {
  return (
    <>
      <SEO
        title="Disclaimer — DevTools Installer"
        description="Disclaimer for DevTools Installer. Understand system-level changes, third-party software responsibilities, and limitations of liability."
        keywords="DevTools Installer disclaimer, system modifications disclaimer, developer tools disclaimer, PATH changes disclaimer, environment variables disclaimer"
        path="/disclaimer"
        jsonLd={buildBreadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Disclaimer', url: '/disclaimer' },
        ])}
      />

      <section className="pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Disclaimer</h1>
          <p className="text-lg text-gray-400">Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert prose-sm max-w-none">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-8 text-gray-400 text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">System-Level Modifications</h2>
              <p>
                DevTools Installer is a desktop utility that makes system-level changes to your
                Windows machine. By using the application, you acknowledge and accept that the
                following modifications will be made:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>
                  Installation of third-party software to standard directories such as{' '}
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">C:\Program Files</code>.
                </li>
                <li>
                  Creation and modification of system environment variables, including the{' '}
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">PATH</code>,{' '}
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">JAVA_HOME</code>,{' '}
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">MAVEN_HOME</code>, and{' '}
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">GRADLE_HOME</code> variables.
                </li>
                <li>
                  Writing to the Windows Registry under{' '}
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">
                    HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment
                  </code>{' '}
                  to persist environment variable changes.
                </li>
                <li>
                  Registration of installed software with Windows for display in Apps &amp; Features.
                </li>
              </ul>
              <p className="mt-3">
                These operations require administrator privileges. We strongly recommend creating a
                Windows System Restore point before using DevTools Installer for the first time, so
                you can revert all changes if needed.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Third-Party Software</h2>
              <p>
                DevTools Installer facilitates the download and installation of third-party developer
                tools including, but not limited to, Java (JDK), Node.js, Python, Git, Maven, Gradle,
                VS Code, and various cloud CLIs. Each of these tools is developed, distributed, and
                licensed by its respective publisher.
              </p>
              <p className="mt-3">
                DevTools Installer does not modify, repackage, or redistribute these tools. All
                binaries are downloaded directly from the official publisher&apos;s servers. We are not
                affiliated with, endorsed by, or sponsored by any of these publishers. By installing
                a third-party tool through DevTools Installer, you agree to that tool&apos;s own license
                terms as set by its publisher. It is your responsibility to review those terms before
                installation.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">No Warranty</h2>
              <p>
                DevTools Installer is provided &quot;as is&quot; and &quot;as available&quot; without
                warranties of any kind, whether express or implied. We do not warrant that the
                application will be error-free, uninterrupted, or compatible with all hardware and
                software configurations. While the application is designed and tested to perform
                system modifications safely and reversibly, you acknowledge that modifying system
                configuration carries inherent risk.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, DevTools Installer and its
                maintainers shall not be liable for any direct, indirect, incidental, special,
                consequential, or punitive damages arising from your use of the application,
                including but not limited to system misconfiguration, data loss, downtime, or
                inability to use installed software. You use the application at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Website Content</h2>
              <p>
                The installation guides, troubleshooting tips, and technical documentation on this
                website are provided for general informational purposes only and do not constitute
                professional advice. While we strive to keep all information accurate and current,
                tool versions, download URLs, and installation procedures may change when publishers
                release updates. Always refer to the official documentation maintained by each
                tool&apos;s publisher for the most authoritative and up-to-date information.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Windows SmartScreen Warning</h2>
              <p>
                Because DevTools Installer is not signed with an Extended Validation (EV) code
                signing certificate, Windows SmartScreen may display an &quot;Unknown Publisher&quot;
                warning when you first run the application. This is a standard Windows security
                feature for unsigned software and does not indicate that the application is malicious.
                To proceed, click &quot;More info&quot; and then &quot;Run anyway.&quot;
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">External Links</h2>
              <p>
                This website and the application may contain links to third-party websites (official
                tool publisher sites, documentation, GitHub repositories). We are not responsible for
                the content, privacy practices, or availability of these external sites. Inclusion of
                a link does not imply endorsement of the linked site or its content.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Changes to This Disclaimer</h2>
              <p>
                We may update this disclaimer from time to time. Changes will be posted on this page
                with an updated revision date. Continued use of the application or this website after
                changes constitutes acceptance of the revised disclaimer.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
              <p>
                If you have questions about this disclaimer, please contact us at{' '}
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
