import { FiDownload, FiCheck, FiSearch, FiRefreshCw } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { FaJava } from 'react-icons/fa'
import { SiApachemaven, SiGradle } from 'react-icons/si'
import { FaGitAlt } from 'react-icons/fa'
import release from '../config/release'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary-light">
              <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse" />
              Install, upgrade, downgrade &amp; uninstall for Windows
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Install Java, Node.js, Python &amp; More{' '}
              <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
                — In One Click
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Skip the manual downloads and PATH headaches. DevTools Installer
              sets up your entire development environment in minutes — then
              lets you upgrade, downgrade, or cleanly uninstall any tool
              whenever you need to.
            </p>

            {/* Download button */}
            {release.downloadUrl && (
              <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-4">
                <a
                  href={release.downloadUrl}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-200"
                >
                  <FiDownload className="w-5 h-5 group-hover:animate-bounce" />
                  <div className="text-left">
                    <div className="text-base">Download Free Installer (.exe)</div>
                    <div className="text-xs font-normal opacity-80">
                      v{release.version} &middot; Windows 10/11 64-bit
                    </div>
                  </div>
                </a>
              </div>
            )}

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <FiCheck className="w-4 h-4 text-primary-light" /> One-Click Setup
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheck className="w-4 h-4 text-primary-light" /> Upgrade &amp; Downgrade Versions
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheck className="w-4 h-4 text-primary-light" /> Uninstall &amp; Bulk Cleanup
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheck className="w-4 h-4 text-primary-light" /> Official Sources
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheck className="w-4 h-4 text-primary-light" /> 100% Free
              </span>
            </div>

            {/* Unknown Publisher notice */}
            <p className="mt-4 text-xs text-gray-600 max-w-xl mx-auto lg:mx-0">
              Windows SmartScreen may flag the download. Click &ldquo;More info&rdquo; → &ldquo;Run anyway&rdquo; to proceed.{' '}
              <Link to="/support" className="text-gray-500 hover:text-gray-400 underline underline-offset-2">
                Why does this happen?
              </Link>
            </p>
          </div>

          {/* Right — App UI mockup matching actual desktop app */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-lg relative">
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 to-accent/15 rounded-3xl blur-2xl scale-110 opacity-50 animate-pulse" style={{ animationDuration: '4s' }} />

              {/* App window */}
              <div className="bg-dark-card border border-dark-border rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden animate-[fadeInUp_0.8s_ease-out]">
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-dark-lighter border-b border-dark-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-primary-light">⚙</span>
                    <span className="text-xs text-gray-400 font-medium">DevTools Installer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiSearch className="w-3 h-3 text-gray-600" />
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-700 hover:bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-700 hover:bg-green-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-700 hover:bg-red-500/60" />
                    </div>
                  </div>
                </div>

                <div className="flex">
                  {/* Sidebar */}
                  <div className="w-40 shrink-0 border-r border-dark-border bg-dark-lighter/50 py-3 px-2.5 hidden sm:block">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">Quick Setup</p>
                    <div className="space-y-0.5 mb-3">
                      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                        <span className="text-[11px] text-primary-light font-medium truncate">Java Developer</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-white/3 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                        <span className="text-[11px] text-gray-400 truncate">Full-Stack Dev</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-white/3 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span className="text-[11px] text-gray-400 truncate">Frontend Dev</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-white/3 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="text-[11px] text-gray-400 truncate">Cloud & DevOps</span>
                      </div>
                    </div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">Categories</p>
                    <div className="space-y-0.5">
                      {['Installed', 'Core Runtimes', 'Package Mgrs', 'Version Control', 'Cloud & DevOps', 'IDEs & Editors'].map((cat, i) => (
                        <div key={cat} className="flex items-center justify-between px-2 py-1 rounded-lg hover:bg-white/3 transition-colors">
                          <span className="text-[11px] text-gray-400 truncate">{cat}</span>
                          <span className="text-[9px] text-gray-400 bg-dark-border rounded-full px-1.5">{[8, 3, 4, 1, 4, 3][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-semibold text-white">Java Developer Setup</p>
                        <p className="text-[10px] text-gray-400">Complete Java development environment</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-[10px] text-gray-400"><FiRefreshCw className="w-3 h-3" /> Refresh</span>
                        <span className="text-[10px] text-accent">Select All</span>
                      </div>
                    </div>

                    {/* Tool cards grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Java */}
                      <div className="bg-dark-lighter border border-dark-border rounded-xl p-3 hover:border-primary/30 transition-colors animate-[fadeInUp_0.5s_ease-out_0.2s_both]">
                        <div className="flex items-center gap-2 mb-2">
                          <FaJava className="w-4 h-4 text-orange-400" />
                          <div>
                            <p className="text-xs font-medium text-white">Java (JDK)</p>
                            <p className="text-[9px] text-gray-400">Required for Java development</p>
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-dark-card border border-dark-border rounded text-[10px] text-gray-400">
                          21.0.10 <span className="text-gray-600">▾</span>
                        </div>
                      </div>

                      {/* Maven */}
                      <div className="bg-dark-lighter border border-dark-border rounded-xl p-3 hover:border-primary/30 transition-colors animate-[fadeInUp_0.5s_ease-out_0.35s_both]">
                        <div className="flex items-center gap-2 mb-1">
                          <SiApachemaven className="w-4 h-4 text-red-400" />
                          <div>
                            <p className="text-xs font-medium text-white">Apache Maven</p>
                            <p className="text-[9px] text-gray-400">Build automation tool</p>
                          </div>
                        </div>
                        <p className="text-[9px] text-amber-400 mb-1.5">⚠ Requires Java (JDK)</p>
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-dark-card border border-dark-border rounded text-[10px] text-gray-400">
                          3.9.14 <span className="text-gray-600">▾</span>
                        </div>
                      </div>

                      {/* Gradle */}
                      <div className="bg-dark-lighter border border-dark-border rounded-xl p-3 hover:border-primary/30 transition-colors animate-[fadeInUp_0.5s_ease-out_0.5s_both]">
                        <div className="flex items-center gap-2 mb-1">
                          <SiGradle className="w-4 h-4 text-teal-400" />
                          <div>
                            <p className="text-xs font-medium text-white">Gradle</p>
                            <p className="text-[9px] text-gray-400">Multi-language build tool</p>
                          </div>
                        </div>
                        <p className="text-[9px] text-amber-400 mb-1.5">⚠ Requires Java (JDK)</p>
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-dark-card border border-dark-border rounded text-[10px] text-gray-400">
                          9.4.1 <span className="text-gray-600">▾</span>
                        </div>
                      </div>

                      {/* Git */}
                      <div className="bg-dark-lighter border border-dark-border rounded-xl p-3 hover:border-primary/30 transition-colors animate-[fadeInUp_0.5s_ease-out_0.65s_both]">
                        <div className="flex items-center gap-2 mb-1">
                          <FaGitAlt className="w-4 h-4 text-orange-500" />
                          <div>
                            <p className="text-xs font-medium text-white">Git</p>
                            <p className="text-[9px] text-gray-400">Version control system</p>
                          </div>
                        </div>
                        <p className="text-[9px] text-primary-light mb-1.5">✓ Installed: git 2.53.0</p>
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-dark-card border border-dark-border rounded text-[10px] text-gray-400">
                            2.53.0 <span className="text-gray-600">▾</span>
                          </div>
                          <span className="text-[9px] px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded cursor-default">Uninstall</span>
                        </div>
                      </div>
                    </div>

                    {/* Install button */}
                    <div className="flex justify-end mt-4">
                      <div className="px-4 py-1.5 bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold rounded-lg shadow-lg shadow-primary/20 cursor-default">
                        Install Selected
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
