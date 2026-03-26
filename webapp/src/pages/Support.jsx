import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiChevronDown, FiMail, FiGithub } from 'react-icons/fi'

const faqs = [
  {
    q: 'Is DevTools Installer free?',
    a: 'Yes, DevTools Installer is 100% free and open source. No hidden costs, subscriptions, or ads.',
  },
  {
    q: 'Which versions of Windows are supported?',
    a: 'DevTools Installer supports Windows 10 and Windows 11 (64-bit). Both Home and Pro editions are compatible.',
  },
  {
    q: 'Does the installer require administrator privileges?',
    a: 'Yes, installing most developer tools (Java, Git, etc.) requires administrator access. The installer will prompt for elevation when needed.',
  },
  {
    q: 'Can I choose which tools to install?',
    a: 'Absolutely. The installer presents a checklist of all available tools. Select only the ones you need and choose your preferred version for each.',
  },
  {
    q: 'Will it overwrite my existing installations?',
    a: 'The installer detects existing tools on your system. You can skip already-installed tools or reinstall with a different version.',
  },
  {
    q: 'Where are the tools downloaded from?',
    a: 'Every tool is downloaded directly from its official publisher: Oracle/Adoptium for Java, nodejs.org for Node.js, python.org for Python, etc.',
  },
  {
    q: 'How do I uninstall tools?',
    a: 'All tools are installed using their standard installers. You can remove them via Windows Settings → Apps & Features, just like any other program.',
  },
  {
    q: 'Can I use this on macOS or Linux?',
    a: 'Currently, DevTools Installer supports Windows only. macOS and Linux versions are planned for a future release.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-dark-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <span className="font-medium text-white pr-4">{q}</span>
        <FiChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-4 text-gray-400 text-sm leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Support() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [hash])

  return (
    <>
      <Helmet>
        <title>Support — DevTools Installer</title>
        <meta name="description" content="Frequently asked questions and contact information for DevTools Installer support." />
      </Helmet>

      <section className="pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Support</h1>
          <p className="text-lg text-gray-400">
            Find answers to common questions or get in touch with us.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((item) => (
              <FAQItem key={item.q} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-dark-lighter/50" id="contact">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Contact Us</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300"
            >
              <FiGithub className="w-8 h-8 text-white" />
              <div>
                <h3 className="font-semibold text-white">GitHub Issues</h3>
                <p className="text-sm text-gray-400">Report bugs and request features</p>
              </div>
            </a>
            <a
              href="mailto:support@devtools-installer.example.com"
              className="flex items-center gap-4 bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300"
            >
              <FiMail className="w-8 h-8 text-primary-light" />
              <div>
                <h3 className="font-semibold text-white">Email Support</h3>
                <p className="text-sm text-gray-400">Get help via email</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
