import { FiDownload, FiList, FiMonitor } from 'react-icons/fi'

const steps = [
  {
    num: '1',
    icon: FiDownload,
    title: 'Download & Run the Installer',
    description: 'Grab the lightweight .exe and launch it — no setup wizard required.',
  },
  {
    num: '2',
    icon: FiList,
    title: 'Select Your Tools & Install',
    description: 'Pick the tools you need, choose versions, and hit Install.',
  },
  {
    num: '3',
    icon: FiMonitor,
    title: 'Start Coding in Minutes',
    description: 'Everything is configured with correct PATH and environment variables.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-28" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-14">
          How It Works
        </h2>

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
      </div>
    </section>
  )
}
