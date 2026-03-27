import { FiDownload, FiCheck } from 'react-icons/fi'
import release from '../config/release'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Set Up Your Development{' '}
              <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
                Environment
              </span>{' '}
              in One Click
            </h1>
            <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Get all essential developer tools installed in minutes. No more
              manual downloads, PATH configuration, or compatibility headaches.
            </p>

            {/* Download button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <a
                href={release.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-200"
              >
                <FiDownload className="w-5 h-5 group-hover:animate-bounce" />
                <div className="text-left">
                  <div className="text-base">Download Installer (.exe)</div>
                  <div className="text-xs font-normal opacity-80">
                    Version {release.version} | Windows 10/11
                  </div>
                </div>
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <FiCheck className="w-4 h-4 text-green-400" /> Easy Setup
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheck className="w-4 h-4 text-green-400" /> Safe &amp; Secure
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheck className="w-4 h-4 text-green-400" /> 100% Free
              </span>
            </div>
          </div>

          {/* Right — App preview */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              {/* Window chrome */}
              <div className="bg-dark-card border border-dark-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-dark-lighter border-b border-dark-border">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-gray-500 font-medium">
                    DevTools Installer
                  </span>
                </div>
                {/* App body */}
                <div className="p-6 space-y-5">
                  <h3 className="text-lg font-semibold text-white">
                    Installing Dev Tools...
                  </h3>
                  {/* Progress bar */}
                  <div className="w-full bg-dark-border rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-[75%] animate-pulse" />
                  </div>
                  {/* Status items */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <FiCheck className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-gray-300">Java Installed</span>
                      <FiCheck className="w-4 h-4 text-green-400 ml-auto shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiCheck className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-gray-300">Node.js Installed</span>
                      <FiCheck className="w-4 h-4 text-green-400 ml-auto shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
                      <span className="text-gray-400">Installing Maven...</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full border border-dark-border shrink-0" />
                      <span className="text-gray-500">Python</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full border border-dark-border shrink-0" />
                      <span className="text-gray-500">Git</span>
                    </div>
                  </div>
                  {/* Button */}
                  <button className="w-full py-2.5 bg-white/5 border border-dark-border rounded-lg text-sm text-gray-400 cursor-default">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
