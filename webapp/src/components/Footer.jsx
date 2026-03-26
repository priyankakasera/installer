import { Link } from 'react-router-dom'
import { FaGithub, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-dark-lighter border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DT</span>
              </div>
              <span className="text-white font-semibold">DevTools Installer</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              One-click developer environment setup for Windows. Install all essential
              tools in minutes.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/product" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/product#tools" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Included Tools
                </Link>
              </li>
              <li>
                <Link to="/product#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/support#faq" className="text-sm text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support#contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DevTools Installer. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link to="/support" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
