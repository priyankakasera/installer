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
    title: 'Open Source',
    desc: 'The installer source code is publicly available. You can audit every line of code that runs on your machine.',
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
        title="Data Practices — DevTools Installer | No Collection, No Telemetry, Fully Offline"
        description="Learn how DevTools Installer handles your data: no collection, no telemetry, fully offline. Every tool is downloaded from official sources with zero tracking."
        keywords="DevTools Installer data practices, no data collection, no telemetry, offline installer, secure developer tools, open source installer"
        path="/data-facting"
        jsonLd={buildBreadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Data Practices', url: '/data-facting' },
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
    </>
  )
}
