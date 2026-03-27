import {
  FiMousePointer,
  FiTrash2,
  FiDollarSign,
  FiPackage,
  FiMonitor,
  FiShield,
} from 'react-icons/fi'

const features = [
  {
    icon: FiMousePointer,
    title: 'One-Click Setup Bundles',
    description:
      'Choose from ready-made bundles — Java Developer, Full-Stack, Frontend, or Cloud & DevOps — and install everything in one click.',
  },
  {
    icon: FiTrash2,
    title: 'One-Click Cleanup',
    description:
      'Completely remove tools along with their binaries, PATH entries, and environment variables. No leftover junk.',
  },
  {
    icon: FiDollarSign,
    title: '100% Free',
    description:
      'No subscriptions, no trials, no hidden costs. DevTools Installer is completely free and open for everyone.',
  },
  {
    icon: FiPackage,
    title: 'All Tools in One Place',
    description:
      'Java, Node.js, Python, Maven, Docker, Git, VS Code, and 10+ more tools — no more hunting across different websites.',
  },
  {
    icon: FiMonitor,
    title: 'Tested on Windows 11',
    description:
      'Built and tested specifically for Windows 10 and 11. Handles PATH configuration and environment variables automatically.',
  },
  {
    icon: FiShield,
    title: 'Safe & Secure',
    description:
      'Every tool is downloaded directly from its official source. No bundled adware, no telemetry, no surprises.',
  },
]

export default function WhyChoose() {
  return (
    <section className="py-20 lg:py-28" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Features</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
            Why Choose DevTools Installer?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 mb-6 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <f.icon className="w-7 h-7 text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {f.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
