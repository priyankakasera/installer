import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getConsent, setConsent } from '../utils/consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => !getConsent())

  function accept() {
    setConsent('accepted')
    setVisible(false)
  }

  function decline() {
    setConsent('declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[200] p-4 sm:p-6"
    >
      <div className="max-w-3xl mx-auto bg-dark-card border border-dark-border rounded-2xl shadow-2xl shadow-black/40 p-5 sm:p-6">
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          This website uses cookies via Google AdSense to display advertisements
          and measure ad performance. By clicking &quot;Accept,&quot; you consent
          to the use of cookies for advertising. You can opt out at any time via{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-light hover:underline"
          >
            Google Ads Settings
          </a>
          . Read our{' '}
          <Link to="/privacy" className="text-primary-light hover:underline">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/cookie-policy" className="text-primary-light hover:underline">
            Cookie Policy
          </Link>{' '}
          for full details.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={accept}
            className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-accent rounded-lg hover:opacity-90 transition-opacity"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="px-5 py-2 text-sm font-medium text-gray-400 bg-dark-lighter border border-dark-border rounded-lg hover:text-white transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
