import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
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
        title="Install, Upgrade &amp; Uninstall Dev Tools on Windows — Free | DevTools Installer"
        description="Install, upgrade, downgrade, or uninstall Java, Node.js, Python, and 20+ tools on Windows with one click. Automatic PATH and environment variable configuration. Free."
        keywords="how to install Java, setup Node.js, install Python Windows, one-click developer setup, upgrade Java version Windows, downgrade Node.js version, uninstall developer tools, bulk uninstall dev tools, switch tool versions Windows, cleanup Java, install Maven, install Git Windows, configure PATH automatically, developer environment setup, free dev tools installer, Windows development tools, JDK installer, developer environment Windows, dev tools bundle"
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

      {/* Overview video */}
      <Divider />
      <section className="content-auto relative py-20 lg:py-28 overflow-hidden">
        {/* Ambient glow backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 50%, color-mix(in srgb, #10b981 8%, transparent), transparent 80%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="section-label">Overview</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 tracking-tight">
              See It in Action
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              Watch a quick overview of how DevTools Installer sets up your
              entire Windows development environment in minutes — no manual
              configuration required.
            </p>
          </div>

          {/* Video card */}
          <div
            className="rounded-2xl p-1"
            style={{
              background:
                'linear-gradient(135deg, color-mix(in srgb, #10b981 30%, transparent), color-mix(in srgb, #06b6d4 20%, transparent))',
            }}
          >
            <div className="rounded-xl overflow-hidden bg-dark-card" style={{ boxShadow: '0 0 60px color-mix(in srgb, #10b981 18%, transparent), 0 25px 50px rgba(0,0,0,0.6)' }}>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/XI5mc804hbA"
                  title="DevTools Installer Overview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Highlights row */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { text: 'Install 20+ tools with one click' },
              { text: 'Upgrade, downgrade, or uninstall anytime' },
              { text: 'Automatic PATH & env var setup' },
            ].map(({ text }) => (
              <div
                key={text}
                className="flex items-center gap-3 bg-dark-card border border-dark-border rounded-xl px-4 py-3"
              >
                <FiCheckCircle className="w-4 h-4 shrink-0 text-primary-light" />
                <span className="text-sm text-gray-300">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides teaser */}
      <Divider />
      <section className="content-auto py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label">Documentation</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-4">
            Per-Tool Installation Guides
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Need to install, upgrade, or remove a specific tool? Browse our
            detailed guides covering download sources, PATH configuration,
            environment variables, and verification steps for all 20+ supported tools.
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
                { name: 'Vishal Hulawale', avatar: '/avatars/vh.svg' },
                { name: 'Priyanka Kasera', avatar: '/avatars/pk.svg' },
              ].map((m) => (
                <img
                  key={m.name}
                  src={m.avatar}
                  alt={m.name}
                  className="w-10 h-10 rounded-full border-2 border-dark object-cover bg-gradient-to-br from-primary to-accent"
                />
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
