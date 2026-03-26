import { FiMousePointer, FiSettings, FiCheckCircle } from 'react-icons/fi'

const features = [
  {
    icon: FiMousePointer,
    title: 'One-Click Setup',
    description: 'Install Java, Maven, Node.js, and more with a single click.',
  },
  {
    icon: FiSettings,
    title: 'Automatic Config',
    description: 'Sets PATH and environment variables for you.',
  },
  {
    icon: FiCheckCircle,
    title: 'Hassle-Free',
    description: 'Avoid setup errors and conflicts.',
  },
]

export default function WhyChoose() {
  return (
    <section className="py-20 lg:py-28" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-14">
          Why Choose DevTools Installer?
        </h2>

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
