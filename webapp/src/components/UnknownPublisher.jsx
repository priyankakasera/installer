import { FiShield, FiAlertTriangle, FiInfo } from 'react-icons/fi'

export default function UnknownPublisher() {
  return (
    <section className="py-20 lg:py-28" id="unknown-publisher">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-dark-card border border-yellow-500/20 rounded-2xl p-8 lg:p-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
              <FiAlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Why Does Windows Show "Unknown Publisher"?
              </h2>
              <p className="text-gray-400">
                You may see a Windows SmartScreen warning when you first run the
                installer. Here's why — and why it's safe to proceed.
              </p>
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-4 mb-8">
            <div className="flex gap-3">
              <FiInfo className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-gray-300 leading-relaxed">
                Windows displays the "Unknown Publisher" warning for any
                application that hasn't been signed with a{' '}
                <strong className="text-white">
                  code-signing certificate
                </strong>
                . These certificates cost{' '}
                <strong className="text-white">$200–$400 per year</strong> from
                certificate authorities — a significant cost for a free,
                open-source project.
              </p>
            </div>
            <div className="flex gap-3">
              <FiShield className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <p className="text-gray-300 leading-relaxed">
                The "Unknown Publisher" label does{' '}
                <strong className="text-white">not</strong> mean the software is
                unsafe. It simply means the .exe hasn't been associated with a
                paid publisher identity. DevTools Installer downloads every tool
                directly from its official source and contains no adware,
                telemetry, or malicious code.
              </p>
            </div>
          </div>

          {/* How to proceed */}
          <div className="bg-dark-lighter rounded-xl p-5 border border-dark-border">
            <h3 className="text-white font-semibold mb-3">
              How to Run the Installer
            </h3>
            <ol className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary-light text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  When the SmartScreen popup appears, click{' '}
                  <strong className="text-white">"More info"</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary-light text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Click{' '}
                  <strong className="text-white">"Run anyway"</strong> to
                  proceed with the installation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary-light text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  The app will open — you can now browse and install tools.
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
