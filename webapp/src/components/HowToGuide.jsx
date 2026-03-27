import { FiDownload, FiCheck, FiMousePointer } from 'react-icons/fi'

const steps = [
  {
    num: '01',
    title: 'Download the Installer',
    description:
      'Click the download button on this page to get the DevTools Installer .exe file. It\'s a lightweight download (~5 MB).',
    detail: 'No admin privileges required for the download itself.',
  },
  {
    num: '02',
    title: 'Run the Installer',
    description:
      'Double-click the .exe to launch. Windows may show an "Unknown Publisher" warning — click "More info" then "Run anyway" (see why below).',
    detail: 'The app does not modify your system until you choose to install tools.',
  },
  {
    num: '03',
    title: 'Choose Individual Tools or a Bundle',
    description:
      'Browse the tool list and check the ones you need, or pick a pre-made bundle like "Java Developer" or "Full-Stack Developer" to select a group at once.',
    detail: 'You can customise bundle selections before installing.',
  },
  {
    num: '04',
    title: 'Click Install & Wait',
    description:
      'Hit the Install button. The app downloads each tool from its official source, installs it silently, and configures PATH and environment variables.',
    detail: 'A progress bar shows real-time status for each tool.',
  },
  {
    num: '05',
    title: 'Start Coding',
    description:
      'Open a new terminal or restart your IDE — all installed tools are ready to use. Run java -version, node -v, or python --version to verify.',
    detail: 'No manual PATH editing or system restarts needed.',
  },
]

export default function HowToGuide() {
  return (
    <section className="py-20 lg:py-28 bg-dark-lighter/50" id="how-to-guide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="section-label">Step-by-Step</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mt-4 mb-4">
          How to Install Developer Tools
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-14">
          A step-by-step guide to setting up Java, Node.js, Python, and other
          developer tools on Windows using DevTools Installer.
        </p>

        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="group relative flex gap-6 bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300"
            >
              {/* Step number */}
              <div className="flex flex-col items-center">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary/20 shrink-0">
                  {step.num}
                </span>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-primary/30 to-transparent mt-3" />
                )}
              </div>
              {/* Content */}
              <div className="flex-1 pb-2">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-2">
                  {step.description}
                </p>
                <p className="text-sm text-gray-500 italic">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cleanup callout */}
        <div className="max-w-3xl mx-auto mt-10 bg-gradient-to-r from-red-500/5 to-orange-500/5 border border-red-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Need to Remove a Tool Later?
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Open DevTools Installer, find the installed tool, and click{' '}
            <strong className="text-red-400">Cleanup</strong>. The app removes
            the tool's binaries, cleans up PATH entries and environment
            variables, and deletes leftover files — leaving your system exactly
            as it was before.
          </p>
        </div>
      </div>
    </section>
  )
}
