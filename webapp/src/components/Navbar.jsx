import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'
import { FiDownload, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from './ThemeProvider'
import release from '../config/release'

const guideCategories = [
  {
    name: 'Java',
    description: 'Conceptual & JDK Setup',
    links: [
      { label: 'Java 26 Features', to: '/guides/java-26-new-features' },
      { label: 'JAVA_HOME Explained', to: '/guides/java-home-explained' },
      { label: 'JDK Installation', to: '/guides/java' },
    ]
  },
  {
    name: 'Runtimes',
    description: 'Node.js, Python & Conda',
    links: [
      { label: 'Node.js Setup', to: '/guides/nodejs' },
      { label: 'Python Setup', to: '/guides/python' },
      { label: 'Miniconda Guide', to: '/guides/miniconda' },
    ]
  },
  {
    name: 'Tools & Automation',
    description: 'Git, Maven & Silent Installs',
    links: [
      { label: 'Git Installation', to: '/guides/git' },
      { label: 'Maven Setup', to: '/guides/maven' },
      { label: 'Silent Install Guide', to: '/guides/windows-silent-install' },
    ]
  }
]

export default function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  const [mobileOpen, setMobileOpen] = useState(false)
  const [guidesOpen, setGuidesOpen] = useState(false)
  const menuRef = useRef(null)

  // Close guides menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setGuidesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
      isLight 
        ? 'bg-white/90 border-gray-200 shadow-sm' 
        : 'bg-dark/80 border-dark-border'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img
              src="/logo.png"
              alt="DevTools Installer Logo"
              className="w-8 h-8 rounded-lg shadow-lg shadow-primary/20"
            />
            <span className={`font-semibold text-lg hidden sm:block tracking-tight transition-colors ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}>
              DevTools Installer
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={({ isActive }) => `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              isLight 
                ? (isActive ? 'text-primary bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')
                : (isActive ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5')
            }`}>Home</NavLink>
            <NavLink to="/product" className={({ isActive }) => `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              isLight 
                ? (isActive ? 'text-primary bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')
                : (isActive ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5')
            }`}>Product</NavLink>
            
            {/* Guides Mega Menu Trigger */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setGuidesOpen(!guidesOpen)}
                onMouseEnter={() => setGuidesOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isLight 
                    ? (guidesOpen ? 'text-primary bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')
                    : (guidesOpen ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5')
                }`}
              >
                Guides
                <HiChevronDown className={`w-4 h-4 transition-transform ${guidesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu */}
              {guidesOpen && (
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 mt-2 w-[600px] border rounded-2xl shadow-2xl overflow-hidden animate-fadeInUp ${
                    isLight ? 'bg-white border-gray-200' : 'bg-dark-lighter border-dark-border'
                  }`}
                  onMouseLeave={() => setGuidesOpen(false)}
                >
                  <div className="grid grid-cols-3 p-6 gap-8">
                    {guideCategories.map((cat) => (
                      <div key={cat.name}>
                        <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-3">{cat.name}</h3>
                        <p className={`text-[11px] mb-4 leading-tight text-gray-500`}>{cat.description}</p>
                        <ul className="space-y-2">
                          {cat.links.map((link) => (
                            <li key={link.to}>
                              <Link 
                                to={link.to} 
                                className={`text-sm hover:translate-x-1 transition-all inline-block ${
                                    isLight ? 'text-gray-700 hover:text-primary' : 'text-gray-300 hover:text-white'

                                }`}
                                onClick={() => setGuidesOpen(false)}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className={`p-4 flex justify-center border-t ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-dark-border'}`}>
                    <Link to="/guides" className="text-xs text-primary font-medium hover:underline" onClick={() => setGuidesOpen(false)}>
                      View All Guides →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/authors" className={({ isActive }) => `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              isLight 
                ? (isActive ? 'text-primary bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')
                : (isActive ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5')
            }`}>About</NavLink>
            <NavLink to="/support" className={({ isActive }) => `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              isLight 
                ? (isActive ? 'text-primary bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')
                : (isActive ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5')
            }`}>Support</NavLink>
          </div>

          {/* Download CTA */}
          {release.downloadUrl && (
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
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 mr-1 rounded-lg transition-colors ${isLight ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 transition-colors ${isLight ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}
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
          <div className={`md:hidden py-4 border-t max-h-[80vh] overflow-y-auto ${isLight ? 'border-gray-200' : 'border-dark-border'}`}>
            <div className="flex flex-col gap-1">
              <Link to="/" className={`px-3 py-2 text-sm ${isLight ? 'text-gray-600' : 'text-gray-300'}`} onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/product" className={`px-3 py-2 text-sm ${isLight ? 'text-gray-600' : 'text-gray-300'}`} onClick={() => setMobileOpen(false)}>Product</Link>
              
              <div className="px-3 py-2">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Guides</p>
                <div className="pl-4 space-y-4">
                  {guideCategories.map(cat => (
                    <div key={cat.name}>
                      <p className={`text-[10px] font-bold uppercase mb-1 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{cat.name}</p>
                      <ul className="space-y-1">
                        {cat.links.map(link => (
                          <li key={link.to}>
                            <Link to={link.to} className={`text-sm block py-0.5 ${isLight ? 'text-gray-600' : 'text-gray-300'}`} onClick={() => setMobileOpen(false)}>{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/authors" className={`px-3 py-2 text-sm ${isLight ? 'text-gray-600' : 'text-gray-300'}`} onClick={() => setMobileOpen(false)}>About</Link>
              <Link to="/support" className={`px-3 py-2 text-sm ${isLight ? 'text-gray-600' : 'text-gray-300'}`} onClick={() => setMobileOpen(false)}>Support</Link>

              
              {release.downloadUrl && (
                <a
                  href={release.downloadUrl}
                  rel="noopener noreferrer"
                  className="mt-3 mx-3 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white text-center bg-gradient-to-r from-primary to-accent rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  <FiDownload className="w-4 h-4" />
                  Download
                </a>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
