import {
  FiDownload,
  FiList,
  FiMonitor,
  FiFolder,
  FiTerminal,
  FiCheckCircle,
  FiSettings,
  FiTrash2,
} from 'react-icons/fi'

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
    title: 'Manage & Maintain',
    description: 'Everything is installed with correct PATH and environment variables. Later, upgrade to a newer version, downgrade if something breaks, or uninstall tools you no longer need.',
  },
]

const installProcess = [
  { icon: FiDownload, text: 'Downloads from official source' },
  { icon: FiFolder, text: 'Extracts & places binaries' },
  { icon: FiTerminal, text: 'Configures PATH & env variables' },
  { icon: FiCheckCircle, text: 'Verifies with version command' },
]

const cleanupProcess = [
  { icon: FiTrash2, text: 'Removes tool files & binaries' },
  { icon: FiTerminal, text: 'Cleans PATH entries' },
  { icon: FiSettings, text: 'Removes environment variables' },
  { icon: FiFolder, text: 'Sweeps leftover files' },
]

export default function HowItWorks() {
  return (
    <section className="content-auto py-20 lg:py-28" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Quick Start</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
            How It Works
          </h2>
        </div>

        {/* 3-step cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group relative bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
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

        {/* Under the Hood — install & cleanup process */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {/* Install process */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-5">
              <span className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <FiDownload className="w-3.5 h-3.5 text-primary-light" />
              </span>
              During Installation
            </h3>
            <div className="space-y-3">
              {installProcess.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary-light text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <item.icon className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cleanup process */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-5">
              <span className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FiTrash2 className="w-3.5 h-3.5 text-red-400" />
              </span>
              During Cleanup &amp; Uninstall
            </h3>
            <p className="text-xs text-gray-500 mb-4">Remove one tool or bulk uninstall everything at once.</p>
            <div className="space-y-3">
              {cleanupProcess.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-400 text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <item.icon className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}
