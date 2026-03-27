import { FiDownload, FiList, FiMonitor } from 'react-icons/fi'

const steps = [
  {
    num: '1',
    icon: FiDownload,
    title: 'Download & Run',
    description: 'Download the lightweight .exe from this page and double-click to launch — no installation wizard.',
  },
  {
    num: '2',
    icon: FiList,
    title: 'Pick Tools or a Bundle',
    description: 'Select individual tools or choose a one-click bundle like "Java Developer" or "Full-Stack".',
  },
  {
    num: '3',
    icon: FiMonitor,
    title: 'Code in Minutes',
    description: 'Everything is installed with correct PATH and environment variables. Open a terminal and start coding.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-28" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Quick Start</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
            How It Works
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group relative bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Step number badge */}
              <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary/25">
                {step.num}
              </div>
              <div className="w-14 h-14 mb-6 mt-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                <step.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Cleanup callout */}
        <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-r from-red-500/5 to-orange-500/5 border border-red-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Need to Remove a Tool Later?
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Open DevTools Installer, find the installed tool, and click{' '}
            <strong className="text-red-400">Cleanup</strong>. The app removes
            the tool&apos;s binaries, cleans up PATH entries and environment
            variables, and deletes leftover files — leaving your system exactly
            as it was before.
          </p>
        </div>
      </div>
    </section>
  )
}
