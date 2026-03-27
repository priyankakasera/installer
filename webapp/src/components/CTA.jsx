import { FiDownload } from 'react-icons/fi'
import release from '../config/release'

export default function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Download the DevTools Installer and set up your entire development
          environment in just a few clicks.
        </p>
        <a
          href={release.downloadUrl}
          download={release.fileName}
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-200"
        >
          <FiDownload className="w-5 h-5" />
          Download for Windows
        </a>
        <p className="mt-4 text-sm text-gray-500">
          Version {release.version} &middot; Windows 10/11 &middot; 100% Free
        </p>
      </div>
    </section>
  )
}
