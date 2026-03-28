import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiArrowRight } from 'react-icons/fi'
import toolGuides from '../config/toolGuides'

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
    tools: toolGuides.filter((t) => t.category === cat),
  }))

  return (
    <>
      <Helmet>
        <title>
          How-To Guides — Install Java, Node.js, Python & More | DevTools
          Installer
        </title>
        <meta
          name="description"
          content="Step-by-step guides to install Java, Node.js, Python, Maven, Git, Docker, VS Code and 16+ developer tools on Windows. Download sources, PATH variables, and verification commands included."
        />
        <meta
          name="keywords"
          content="how to install Java Windows, setup Node.js, install Python, install Maven, install Git, setup developer tools, PATH configuration, JAVA_HOME, one-click installation"
        />
      </Helmet>

      {/* Header */}
      <section className="pt-20 pb-10 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="section-label mb-4 inline-flex">Guides</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            How-To Guides
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Step-by-step instructions to install each developer tool using
            DevTools Installer — including download sources, PATH variables,
            environment variables, and verification commands.
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
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
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
    </>
  )
}
