import { Link } from 'react-router-dom'
import { FaGithub, FaTwitter } from 'react-icons/fa'

const toolGuideLinks = [
  { label: 'Install Java', to: '/guides/java' },
  { label: 'Install Node.js', to: '/guides/nodejs' },
  { label: 'Install Python', to: '/guides/python' },
  { label: 'Install Maven', to: '/guides/maven' },
  { label: 'Install Git', to: '/guides/git' },
  { label: 'All Guides →', to: '/guides' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-lighter border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-sm">DT</span>
              </div>
              <span className="text-white font-semibold tracking-tight">
                DevTools Installer
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Free one-click development environment setup for Windows.
              Install, configure, and cleanly remove 16+ developer tools.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-dark-border rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:border-primary/40 transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-dark-border rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:border-primary/40 transition-all"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/product"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/product#tools"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  Included Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/data-facting"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  Data Facting
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  Support &amp; FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* How-To Guides */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              How-To Guides
            </h4>
            <ul className="space-y-2.5">
              {toolGuideLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-divider mt-10 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} DevTools Installer. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/support"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Support
            </Link>
            <Link
              to="/authors"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Authors
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
