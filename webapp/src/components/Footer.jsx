import { Link, useNavigate } from 'react-router-dom'

const toolGuideLinks = [
  { label: 'Install Java', to: '/guides/java' },
  { label: 'Install Node.js', to: '/guides/nodejs' },
  { label: 'Install Python', to: '/guides/python' },
  { label: 'Install Maven', to: '/guides/maven' },
  { label: 'Install Git', to: '/guides/git' },
  { label: 'All Guides →', to: '/guides' },
]

function FooterLink({ to, children }) {
  const navigate = useNavigate()

  function handleClick(e) {
    const [path, hash] = to.split('#')
    const targetPath = path || '/'
    if (hash) {
      e.preventDefault()
      if (window.location.pathname === targetPath) {
        const el = document.getElementById(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate(to)
      }
    } else {
      // For non-hash links, let the Link handle navigation
      // ScrollToTop in Layout will scroll to top
    }
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="text-sm text-gray-400 hover:text-white transition-colors"
    >
      {children}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="bg-dark-lighter border-t border-dark-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="/logo.png"
                alt="DevTools Installer Logo"
                className="w-8 h-8 rounded-lg shadow-lg shadow-primary/20"
              />
              <span className="text-white font-semibold tracking-tight">
                DevTools Installer
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Free one-click development environment setup for Windows.
              Install, configure, and cleanly remove 20+ developer tools — all
              downloaded directly from official sources with no bundled adware.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <a
                href="mailto:support@devtoolsinstaller.com"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
              >
                support@devtoolsinstaller.com
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Product
            </p>
            <ul className="space-y-2.5">
              <li>
                <FooterLink to="/product#features">
                  Features
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/product#tools">
                  Included Tools
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/support">
                  Support &amp; FAQ
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/authors">
                  About Us
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/privacy">
                  Privacy Policy
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/terms">
                  Terms &amp; Conditions
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/cookie-policy">
                  Cookie Policy
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/disclaimer">
                  Disclaimer
                </FooterLink>
              </li>
            </ul>
          </div>

          {/* How-To Guides */}
          <div className="col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              How-To Guides
            </p>
            <ul className="space-y-2.5">
              {toolGuideLinks.map((link) => (
                <li key={link.to}>
                  <FooterLink to={link.to}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Learn
            </p>
            <ul className="space-y-2.5">
              <li>
                <FooterLink to="/guides/java-home-explained">
                  What is JAVA_HOME?
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/guides/windows-path-explained">
                  Windows PATH Guide
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/guides/windows-silent-install">
                  Silent Install Guide
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mt-10 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DevTools Installer. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/support"
              className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
