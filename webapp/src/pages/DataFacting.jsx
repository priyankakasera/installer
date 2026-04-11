import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd } from '../config/seo'
import { FiShield, FiDatabase, FiLock, FiEye, FiServer, FiTrash2 } from 'react-icons/fi'

const cards = [
  {
    icon: FiShield,
    title: 'No Data Collection',
    desc: 'The installer runs entirely on your local machine. We do not collect, transmit, or store any personal information.',
  },
  {
    icon: FiDatabase,
    title: 'Offline First',
    desc: 'All processing happens locally. The only network activity is downloading tool binaries from their official sources.',
  },
  {
    icon: FiLock,
    title: 'Secure Downloads',
    desc: 'Every tool is downloaded directly from its official publisher — Oracle, Node.js Foundation, Python.org, etc.',
  },
  {
    icon: FiEye,
    title: 'Verifiable Downloads',
    desc: 'The exact download URL for every tool is documented in our installation guides. You can verify each source before running the installer.',
  },
  {
    icon: FiServer,
    title: 'No Telemetry',
    desc: 'We include zero analytics, tracking pixels, or telemetry. Your development machine stays private.',
  },
  {
    icon: FiTrash2,
    title: 'Clean Uninstall',
    desc: 'Every tool installs using its official method. Standard Windows uninstall procedures apply.',
  },
]

export default function DataFacting() {
  return (
    <>
      <SEO
        title="Data Practices — No Telemetry, Fully Offline | DevTools Installer"
        description="How DevTools Installer handles your data: zero collection, zero telemetry, fully offline. Every tool downloads from official sources with no tracking."
        keywords="DevTools Installer data practices, no data collection, no telemetry, offline installer, secure developer tools, open source installer"
        path="/data-practices"
        jsonLd={buildBreadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Data Practices', url: '/data-practices' },
        ])}
      />

      <section className="pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Data Practices</h1>
          <p className="text-lg text-gray-400">
            Transparency about how DevTools Installer handles your data and privacy.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((c) => (
              <div key={c.title} className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                <c.icon className="w-8 h-8 text-primary-light mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{c.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark-lighter/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">Summary</h2>
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
            <p>
              DevTools Installer is a desktop application that runs entirely on your Windows
              machine. It automates the download and configuration of popular developer tools.
            </p>
            <p>
              <strong className="text-white">What we access:</strong> Your system's PATH and
              environment variables (to configure tools), the Windows registry (to detect
              existing installations), and your internet connection (to download tool binaries).
            </p>
            <p>
              <strong className="text-white">What we never do:</strong> Collect personal data,
              send usage analytics, install third-party advertisements, or modify any files
              outside of the official tool installation directories.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed technical explanation */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">What the Desktop App Does on Your Machine</h2>
            <div className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-5 text-gray-400 text-sm leading-relaxed">
              <p>
                When you install a tool through DevTools Installer, the application performs a
                specific, predictable sequence of operations. Understanding exactly what happens
                helps you trust the process and troubleshoot if anything goes wrong.
              </p>
              <div>
                <h3 className="text-white font-semibold mb-2">1. Tool Detection</h3>
                <p>
                  Before installing, the app scans your system to detect tools that are already
                  present. It checks the Windows registry (HKLM and HKCU uninstall keys), known
                  installation directories (e.g., C:\Program Files\Java), and the system PATH
                  variable. This avoids overwriting existing installations unless you explicitly
                  choose to reinstall.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">2. Download from Official Sources</h3>
                <p>
                  Each tool binary is fetched directly from its publisher&apos;s official distribution
                  channel — Oracle for Java, nodejs.org for Node.js, python.org for Python,
                  GitHub Releases for Git, and so on. DevTools Installer never mirrors, repackages,
                  or modifies these downloads. The download URLs are hardcoded in the application
                  and updated with each release.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">3. Silent Installation</h3>
                <p>
                  Tools are installed using the publisher&apos;s own installer with silent/quiet flags.
                  For MSI packages, this means <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">msiexec /i package.msi /quiet</code>.
                  For EXE installers, the corresponding silent switch is used. DevTools Installer
                  does not modify the installer binaries or inject additional payloads.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">4. Environment Configuration</h3>
                <p>
                  After installation, the app updates your system environment variables through the
                  Windows API. This includes adding directories to the system PATH (e.g., adding
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">C:\Program Files\Java\jdk-21\bin</code> to PATH)
                  and creating tool-specific variables like JAVA_HOME, MAVEN_HOME, and GRADLE_HOME.
                  These changes are written to the registry under
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment</code>
                  and broadcast to running processes via a WM_SETTINGCHANGE message.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">5. Verification</h3>
                <p>
                  After configuring the environment, the app runs each tool&apos;s verification command
                  (e.g., <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">java -version</code>,{' '}
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">node -v</code>) to confirm
                  the installation was successful and the tool is accessible from the command line.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">What the Desktop App Never Does</h2>
            <div className="bg-dark-card border border-dark-border rounded-2xl p-8 text-gray-400 text-sm leading-relaxed">
              <ul className="space-y-3 list-disc list-inside">
                <li>Never sends HTTP requests to any server other than official tool download URLs.</li>
                <li>Never collects or transmits system information, hardware identifiers, or IP addresses.</li>
                <li>Never reads, copies, or accesses your personal files, documents, or browser data.</li>
                <li>Never installs background services, scheduled tasks, or startup entries.</li>
                <li>Never modifies the Windows Firewall, security policies, or system boot configuration.</li>
                <li>Never bundles adware, toolbars, browser extensions, or promotional software.</li>
                <li>Never phones home for license checks — there is no licensing, and the app works fully offline after downloading tools.</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Website Data Practices</h2>
            <div className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>
                This website (devtoolsinstaller.com) is a static site hosted on Firebase. It does
                not use server-side processing or databases for visitor data. The website uses
                Google AdSense for advertising, which sets cookies for ad personalization. You can
                manage cookie preferences through our cookie consent banner, or opt out of
                personalized ads via{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="nofollow noopener noreferrer" className="text-primary-light hover:underline">
                  Google Ads Settings
                </a>.
              </p>
              <p>
                The only interactive feature on this website is the contact form on the Support
                page, which stores your email, subject, and message in a Firebase Firestore
                database so we can respond to your inquiry. This data is not shared with third
                parties and is used solely for replying to your support request.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
