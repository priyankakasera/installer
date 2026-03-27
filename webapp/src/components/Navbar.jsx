import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiDownload } from 'react-icons/fi'
import release from '../config/release'

const navLinks = [
  { label: 'Product', to: '/product' },
  { label: 'How-To Guides', to: '/guides' },
  { label: 'Data Facting', to: '/data-facting' },
  { label: 'Support', to: '/support' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-dark-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-sm">DT</span>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block tracking-tight">
              DevTools Installer
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Download CTA */}
          <div className="hidden md:flex items-center">
            <a
              href={release.downloadUrl}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-accent rounded-lg shadow-md shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200"
            >
              <FiDownload className="w-4 h-4" />
              Download
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-dark-border">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-sm rounded-lg ${
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href={release.downloadUrl}
                rel="noopener noreferrer"
                className="mt-3 mx-3 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white text-center bg-gradient-to-r from-primary to-accent rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                <FiDownload className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
