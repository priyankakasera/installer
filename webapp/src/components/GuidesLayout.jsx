import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiArrowLeft } from 'react-icons/fi'
import { guideCategories } from '../config/guidesData'




export default function GuidesLayout() {
  const { pathname } = useLocation()
  const currentSlug = pathname.split('/').pop()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile sidebar on navigation and clear text selection
  useEffect(() => {
    setMobileOpen(false)
    if (window.getSelection) {
      window.getSelection().removeAllRanges()
    }
  }, [pathname])

  const isCategory = guideCategories.some(c => c.id === currentSlug)

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#0a0f0d] border-b border-gray-200 dark:border-gray-800 sticky top-16 z-30">
        <span className="font-bold text-gray-900 dark:text-white">Guides Menu</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-gray-600 dark:text-gray-300">
          {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar - only show if on category page or mobile open */}
      {(isCategory || mobileOpen) && (
        <aside className={`
          fixed inset-0 z-40 top-16 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
          w-72 shrink-0 bg-gray-50 dark:bg-[#0f1612] border-r border-gray-200 dark:border-gray-800 overflow-y-auto h-[calc(100vh-4rem)] md:sticky md:top-16
          flex flex-col
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${!isCategory && 'md:hidden'}
        `}>
          <div className="p-5 flex-1 flex flex-col">
            {/* Back to Home */}
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4 shrink-0" />
              Back to Home
            </Link>

            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Documentation</p>

            <nav className="space-y-0.5 mb-8">
            {guideCategories.map(cat => (
              <NavLink
                key={cat.id}
                to={`/guides/${cat.id}`}
                className={({ isActive }) => `
                  block px-3 py-2 rounded-lg text-sm font-semibold transition-colors
                  ${isActive ? 'text-primary bg-primary/10' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}
                `}
              >
                {cat.name}
              </NavLink>
            ))}
            </nav>
            
          </div>
        </aside>

      )}

      {/* Main Content Area */}
      <main className={`flex-1 min-w-0 overflow-auto ${!isCategory ? 'w-full' : ''}`}>
        <Outlet />
      </main>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  )
}
