import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiChevronDown } from 'react-icons/fi'

const navLinks = [
  {
    label: 'Product',
    to: '/product',
    hasDropdown: true,
    children: [
      { label: 'Features', to: '/product#features' },
      { label: 'Tools', to: '/product#tools' },
      { label: 'How It Works', to: '/product#how-it-works' },
    ],
  },
  { label: 'Data Facting', to: '/data-facting' },
  {
    label: 'Support',
    to: '/support',
    hasDropdown: true,
    children: [
      { label: 'FAQ', to: '/support#faq' },
      { label: 'Contact', to: '/support#contact' },
    ],
  },
  { label: 'Authors', to: '/authors' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  return (
    <header className="sticky top-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-dark-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DT</span>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block">
              DevTools Installer
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                {link.hasDropdown ? (
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    onClick={() => toggleDropdown(link.label)}
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.label}
                    <FiChevronDown className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm rounded-lg transition-colors ${
                        isActive
                          ? 'text-white bg-white/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}

                {/* Dropdown */}
                {link.hasDropdown && (
                  <div
                    className={`absolute top-full left-0 mt-1 w-48 bg-dark-card border border-dark-border rounded-xl shadow-2xl py-2 transition-all duration-200 ${
                      openDropdown === link.label
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sign in */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg transition-all"
            >
              Sign in
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-dark-border">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.label)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5"
                      >
                        {link.label}
                        <FiChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === link.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openDropdown === link.label && (
                        <div className="ml-4 flex flex-col gap-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.to}
                              className="px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                              onClick={() => {
                                setMobileOpen(false)
                                setOpenDropdown(null)
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
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
                  )}
                </div>
              ))}
              <Link
                to="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 mx-3 px-4 py-2 text-sm font-medium text-white text-center bg-white/10 border border-white/10 rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
