import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd } from '../config/seo'
import Hero from '../components/Hero'
import AdUnit, { SLOTS } from '../components/AdUnit'

const IncludedTools = lazy(() => import('../components/IncludedTools'))
const HowItWorks = lazy(() => import('../components/HowItWorks'))

function Divider() {
  return <hr className="section-divider" />
}

export default function Home() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
  ])

  return (
    <>
      <SEO
        title="DevTools Installer — Install Java, Node.js, Python & More in One Click | Free Windows Setup Tool"
        description="Free one-click installer for Java, Node.js, Python, Maven, Git, Docker, VS Code and 20+ developer tools on Windows. Automatic PATH configuration, setup bundles, and clean uninstall. No manual setup required."
        keywords="how to install Java, setup Node.js, install Python Windows, one-click developer setup, setup bundle, cleanup Java, uninstall developer tools, install Maven, install Git Windows, configure PATH automatically, developer environment setup, install Docker Windows, free dev tools installer, Windows development tools, JDK installer, developer environment Windows, auto configure PATH, dev tools bundle"
        path="/"
        jsonLd={breadcrumbJsonLd}
      />
      <Hero />
      <Divider />
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <IncludedTools />
        <Divider />
        <HowItWorks />
      </Suspense>

      {/* Ad slot — after How It Works */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdUnit slot={SLOTS.HOME_BOTTOM} format="auto" />
      </div>

      {/* Guides teaser */}
      <Divider />
      <section className="content-auto py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label">Documentation</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-4">
            Per-Tool Installation Guides
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Need to install a specific tool manually? Browse our detailed guides
            covering download sources, PATH configuration, environment
            variables, and verification steps for all 20+ supported tools.
          </p>
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 px-6 py-3 bg-dark-card border border-dark-border rounded-xl text-white font-medium hover:border-primary/40 transition-all duration-200"
          >
            Browse All Guides
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Team credibility callout */}
      <section className="py-14 border-t border-dark-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="flex -space-x-2">
              {[
                { initials: 'VH', bg: 'bg-primary/30' },
                { initials: 'PK', bg: 'bg-accent/30' },
              ].map((m) => (
                <span
                  key={m.initials}
                  className={`w-10 h-10 rounded-full ${m.bg} border-2 border-dark flex items-center justify-center text-white text-xs font-bold`}
                >
                  {m.initials}
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Built by a small team of working developers who got tired of manually configuring
            the same tools on every machine. We use DevTools Installer ourselves every time we
            set up a new Windows environment.
          </p>
          <Link
            to="/authors"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary-light hover:underline"
          >
            Meet the team <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </>
  )
}
