import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd, buildFAQJsonLd } from '../config/seo'
import { FiChevronDown, FiMail, FiSend } from 'react-icons/fi'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

const faqs = [
  {
    q: 'Is DevTools Installer free?',
    a: 'Yes, DevTools Installer is 100% free and open source. No hidden costs or subscriptions.',
  },
  {
    q: 'Which versions of Windows are supported?',
    a: 'DevTools Installer is tested on Windows 11 64-bit and is compatible with both Windows 10 and Windows 11 (Home and Pro editions).',
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
    a: 'DevTools Installer includes a built-in one-click uninstall feature that removes the tool, cleans up PATH entries, and deletes related environment variables. You can also remove tools manually via Windows Settings → Apps & Features.',
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
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [hash])

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setError('')
    const fd = new FormData(e.target)
    try {
      await addDoc(collection(db, 'contactMessages'), {
        email: fd.get('email'),
        subject: fd.get('subject'),
        message: fd.get('message'),
        createdAt: serverTimestamp(),
      })
      setSent(true)
      e.target.reset()
    } catch {
      setError('Failed to send message. Please try again later.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <SEO
        title="Support & FAQ — DevTools Installer | Common Questions & Contact"
        description="Frequently asked questions about DevTools Installer: compatibility, administrator privileges, tool selection, uninstalling, and more. Contact support for bug reports and feature requests."
        keywords="DevTools Installer support, DevTools Installer FAQ, developer tools help, Windows installer support, how to uninstall dev tools, DevTools Installer contact, developer setup help"
        path="/support"
        jsonLd={[
          buildBreadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Support', url: '/support' },
          ]),
          buildFAQJsonLd(faqs),
        ]}
      />

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
          <h2 className="text-2xl font-bold text-white mb-2">Contact Us</h2>
          <p className="text-gray-400 mb-8">
            Have a question or found a bug? Fill out the form below or email us
            directly at{' '}
            <a
              href="mailto:support@devtools-installer.web.app"
              className="text-primary-light hover:underline"
            >
              support@devtools-installer.web.app
            </a>
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-400 mb-1.5">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-400 mb-1.5">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Bug report, feature request..."
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-gray-400 mb-1.5">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Describe your issue or feedback..."
                className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary/60 transition-colors resize-y"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSend className="w-4 h-4" />
              {sending ? 'Sending...' : 'Send Message'}
            </button>
            {sent && (
              <p className="text-sm text-green-400 mt-2">Message sent successfully!</p>
            )}
            {error && (
              <p className="text-sm text-red-400 mt-2">{error}</p>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
