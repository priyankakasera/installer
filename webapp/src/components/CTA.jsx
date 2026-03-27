import { FiDownload, FiCheck } from 'react-icons/fi'
import release from '../config/release'

export default function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="section-label">Get Started</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
          Stop Wasting Time on Manual Setup
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Download DevTools Installer and get Java, Node.js, Python, Git, Docker,
          and 10+ more tools configured in minutes — not hours.
        </p>
        <a
          href={release.downloadUrl}
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-200"
        >
          <FiDownload className="w-5 h-5" />
          Download Free for Windows
        </a>
        <p className="mt-4 text-sm text-gray-500">
          v{release.version} &middot; Windows 10/11 &middot; 100% Free &middot;
          No signup required
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <FiCheck className="w-4 h-4 text-green-400" /> Official sources
          </span>
          <span className="flex items-center gap-1.5">
            <FiCheck className="w-4 h-4 text-green-400" /> No adware
          </span>
          <span className="flex items-center gap-1.5">
            <FiCheck className="w-4 h-4 text-green-400" /> Clean uninstall
          </span>
        </div>
      </div>
    </section>
  )
}
