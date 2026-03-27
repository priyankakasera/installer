import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

const testimonials = [
  {
    quote: 'Saved me so much setup time. Fantastic tool.',
    author: 'Alex M.',
    role: 'Full-Stack Developer',
  },
  {
    quote: 'Everything was installed in minutes, no hassle.',
    author: 'Priya S.',
    role: 'Software Engineer',
  },
  {
    quote: 'Finally, a tool that just works on Windows. One click and done!',
    author: 'Jordan T.',
    role: 'DevOps Engineer',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-dark-lighter/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
            What Developers Are Saying
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-2 mb-4">
                <FaQuoteLeft className="w-5 h-5 text-primary/40 shrink-0 mt-1" />
                <p className="text-gray-300 italic leading-relaxed">
                  {t.quote}
                </p>
                <FaQuoteRight className="w-5 h-5 text-primary/40 shrink-0 mt-1" />
              </div>
              <div className="mt-6 pt-4 border-t border-dark-border">
                <p className="font-semibold text-white">— {t.author}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
