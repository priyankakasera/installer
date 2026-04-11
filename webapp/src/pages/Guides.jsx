import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd, buildItemListJsonLd } from '../config/seo'
import toolGuides from '../config/toolGuides'
import AdUnit, { SLOTS } from '../components/AdUnit'

const categoryOrder = [
  'Core Runtimes',
  'Package Managers',
  'Version Control',
  'Cloud & DevOps',
  'IDEs & Editors',
  'API Tools',
]

export default function Guides() {
  const grouped = categoryOrder.map((cat) => ({
    name: cat,
    tools: toolGuides.filter((t) => t.category === cat && !t.hidden),
  }))

  const visibleGuides = toolGuides.filter((t) => !t.hidden)
  const guidesJsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'How-To Guides', url: '/guides' },
    ]),
    buildItemListJsonLd(
      visibleGuides.map((t) => ({
        name: t.headline,
        url: `/guides/${t.id}`,
      })),
    ),
  ]

  return (
    <>
      <SEO
        title="Install, Upgrade & Remove Java, Node.js, Python & More — Windows Guides (2026)"
        description="Step-by-step guides to install, upgrade, downgrade, or uninstall 20+ developer tools on Windows. Official downloads, PATH config, environment variables, and verify commands."
        keywords="how to install Java Windows, upgrade Java version Windows, downgrade Node.js version, uninstall Python Windows, bulk uninstall developer tools, setup Node.js, install Maven, install Git, PATH configuration, JAVA_HOME, one-click installation, switch tool versions Windows, development environment guide"
        path="/guides"
        jsonLd={guidesJsonLd}
      />

      {/* Header */}
      <section className="pt-20 pb-10 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="section-label mb-4 inline-flex">Guides</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Developer Tool Guides
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Install, upgrade, downgrade, or remove any supported tool on
            Windows. Every guide shows the official download source, the
            exact setup steps, the PATH or environment variables that
            matter, and how to verify the install worked.
          </p>
        </div>
      </section>

      {/* Tool listing by category */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {grouped.map((group) => (
            <div key={group.name}>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-primary to-accent" />
                {group.name}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.tools.map((tool) => (
                  <Link
                    key={tool.id}
                    to={`/guides/${tool.id}`}
                    className="group bg-dark-card border border-dark-border rounded-xl p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <h3 className="text-white font-medium mb-1 flex items-center justify-between">
                      {tool.name}
                      <FiArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary-light group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {tool.versions.map((v) => (
                        <span
                          key={v}
                          className="px-2 py-0.5 text-xs rounded bg-dark-lighter border border-dark-border text-gray-500"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad slot — between tool grid and Reference articles */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdUnit slot={SLOTS.GUIDES_INDEX} format="auto" />
      </div>

      {/* Reference & Concepts articles */}
      <section className="py-16 border-t border-dark-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="section-label">Reference &amp; Concepts</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-2">
              Windows Environment Deep Dives
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl">
              Use these reference articles when you need extra context on PATH,
              JAVA_HOME, or silent installers before following a tool-specific guide.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                to: '/guides/windows-path-explained',
                label: 'Windows PATH Variable Explained',
                desc: 'What the PATH environment variable is, why it matters, how to view and edit it safely, and how DevTools Installer manages it automatically.',
                tag: 'Windows Internals',
              },
              {
                to: '/guides/java-home-explained',
                label: 'What Is JAVA_HOME?',
                desc: 'Why Maven and Gradle need JAVA_HOME separate from PATH, how to set it correctly, and how to manage multiple JDK versions on the same machine.',
                tag: 'Java',
              },
              {
                to: '/guides/windows-silent-install',
                label: 'Silent Install on Windows',
                desc: 'How MSI /quiet, NSIS /S, Inno Setup /VERYSILENT, and Squirrel --silent flags work, and how DevTools Installer uses them to automate installs without any click-through wizards.',
                tag: 'Automation',
              },
            ].map((article) => (
              <Link
                key={article.to}
                to={article.to}
                className="group flex flex-col bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="text-xs text-primary-light font-medium mb-3 uppercase tracking-wide">
                  {article.tag}
                </span>
                <h3 className="text-white font-semibold mb-2 group-hover:text-primary-light transition-colors">
                  {article.label}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{article.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-gray-600 group-hover:text-primary-light transition-colors">
                  Read article <FiArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
