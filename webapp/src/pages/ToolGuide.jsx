import { useParams, Navigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { FiArrowLeft, FiDownload, FiCopy, FiCheck, FiExternalLink, FiTerminal } from 'react-icons/fi'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd, buildHowToJsonLd } from '../config/seo'
import toolGuides from '../config/toolGuides'

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative group">
      <pre className="bg-dark-lighter border border-dark-border rounded-lg px-4 py-3 text-sm text-gray-300 overflow-x-auto font-mono">
        {children}
      </pre>
      <button
        onClick={copy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-dark-card border border-dark-border text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy"
      >
        {copied ? (
          <FiCheck className="w-3.5 h-3.5 text-primary-light" />
        ) : (
          <FiCopy className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  )
}

function Linkify({ children }) {
  if (typeof children !== 'string') return children
  const urlRegex = /(https?:\/\/[^\s)]+)/g
  const parts = children.split(urlRegex)
  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline break-all">
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

export default function ToolGuide() {
  const { toolId } = useParams()
  const tool = toolGuides.find((t) => t.id === toolId)

  if (!tool) return <Navigate to="/guides" replace />

  const allSteps = [
    ...(tool.steps?.appSteps || []),
    ...(tool.steps?.manualSteps || []),
  ]

  const howToJsonLd = buildHowToJsonLd({
    name: tool.headline,
    description: `Step-by-step guide: ${tool.headline}. Download source, PATH configuration, environment variables, and verify commands.`,
    steps: allSteps,
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'How-To Guides', url: '/guides' },
    { name: tool.name, url: `/guides/${tool.id}` },
  ])

  const combinedJsonLd = [breadcrumbJsonLd, howToJsonLd]

  const toolKeywords = `${tool.headline}, install ${tool.name} Windows, ${tool.name} PATH configuration, ${tool.name} setup guide, ${tool.name} download, ${tool.name} environment variables, DevTools Installer ${tool.name}`

  return (
    <>
      <SEO
        title={`${tool.headline} — Step-by-Step Guide | DevTools Installer`}
        description={`Step-by-step guide: ${tool.headline}. Download source, PATH configuration, environment variables, and verify commands for ${tool.versions.join(', ')}.`}
        keywords={toolKeywords}
        path={`/guides/${tool.id}`}
        type="article"
      >
        {combinedJsonLd.map((ld, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(ld)}
          </script>
        ))}
        <meta property="article:section" content={tool.category} />
        <meta property="article:tag" content={tool.name} />
        <meta property="article:tag" content="Windows" />
        <meta property="article:tag" content="installation guide" />
      </SEO>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Breadcrumb */}
        <Link
          to="/guides"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-light transition-colors mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          All Guides
        </Link>

        {/* Header */}
        <div className="mb-10">
          <span className="section-label">{tool.category}</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-3">
            {tool.headline}
          </h1>
          <p className="text-gray-400 max-w-2xl">{tool.description}</p>
        </div>

        {/* Editorial intro */}
        {tool.editorial && (
          <div className="mb-12 space-y-4 text-gray-300 leading-relaxed max-w-3xl">
            {tool.editorial.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        {/* Quick facts */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-dark-card border border-dark-border rounded-xl p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Supported Versions
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tool.versions.map((v) => (
                <span key={v} className="px-2 py-0.5 text-xs rounded bg-dark-lighter border border-dark-border text-white font-medium">
                  {v}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-dark-card border border-dark-border rounded-xl p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Source
            </p>
            <p className="text-white font-medium truncate">
              {tool.downloadLabel}
            </p>
          </div>
          <div className="bg-dark-card border border-dark-border rounded-xl p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Verify
            </p>
            <p className="text-white font-mono text-sm truncate">
              {tool.verifyCommand}
            </p>
          </div>
        </div>

        {/* Install via DevTools Installer */}
        {tool.steps?.appSteps?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <FiDownload className="w-5 h-5 text-primary-light" />
              Install via DevTools Installer
            </h2>
            <ol className="space-y-3">
              {tool.steps.appSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-dark-card border border-dark-border rounded-xl px-5 py-4"
                >
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary-light text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-300 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Download Source */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <FiExternalLink className="w-5 h-5 text-primary-light" />
            Download Source
          </h2>
          <CodeBlock>{tool.downloadSource}</CodeBlock>
          {tool.altSources?.length > 0 && (
            <div className="mt-3 text-sm text-gray-500">
              <span className="font-medium text-gray-400">
                Alternative sources:{' '}
              </span>
              {tool.altSources.join(', ')}
            </div>
          )}
        </section>

        {/* PATH & Environment Variables */}
        {(tool.envVars?.length > 0 || tool.pathEntries?.length > 0) && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <FiTerminal className="w-5 h-5 text-primary-light" />
              PATH &amp; Environment Variables
            </h2>
            {tool.envVars?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Environment Variables
                </h3>
                <div className="space-y-2">
                  {tool.envVars.map((v) => (
                    <div key={v.name}>
                      <CodeBlock>{`${v.name}=${v.value}`}</CodeBlock>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tool.pathEntries?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  PATH Entries
                </h3>
                <div className="space-y-2">
                  {tool.pathEntries.map((p, i) => (
                    <CodeBlock key={i}>{p}</CodeBlock>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Verify Installation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <FiCheck className="w-5 h-5 text-primary-light" />
            Verify Installation
          </h2>
          <CodeBlock>{tool.verifyCommand}</CodeBlock>
          {tool.verifyOutput && (
            <p className="mt-2 text-sm text-gray-500">
              Expected output:{' '}
              <code className="text-gray-400">{tool.verifyOutput}</code>
            </p>
          )}
        </section>

        {/* Manual Installation Steps */}
        {tool.steps?.manualSteps?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-5">
              Manual Installation Steps
            </h2>
            <ol className="space-y-3">
              {tool.steps.manualSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-dark-card border border-dark-border rounded-xl px-5 py-4"
                >
                  <span className="w-6 h-6 rounded-full bg-dark-border text-gray-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-300 leading-relaxed"><Linkify>{step}</Linkify></span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Use Cases */}
        {tool.useCases?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-5">
              What Is {tool.name} Used For?
            </h2>
            <ul className="space-y-3">
              {tool.useCases.map((uc, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-dark-card border border-dark-border rounded-xl px-5 py-4"
                >
                  <span className="w-2 h-2 rounded-full bg-primary-light shrink-0 mt-2" />
                  <span className="text-gray-300 leading-relaxed">{uc}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Common Issues */}
        {tool.commonIssues?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-5">
              Common Issues &amp; Fixes
            </h2>
            <div className="space-y-4">
              {tool.commonIssues.map((issue, i) => (
                <div
                  key={i}
                  className="bg-dark-card border border-dark-border rounded-xl p-5"
                >
                  <p className="text-white font-medium mb-2">{issue.problem}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{issue.fix}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tips */}
        {tool.tips?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-5">
              Tips for {tool.name}
            </h2>
            <div className="bg-dark-card border border-dark-border rounded-xl p-5">
              <ul className="space-y-3">
                {tool.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary-light font-bold shrink-0">&#x2713;</span>
                    <span className="text-gray-300 leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Back link */}
        <Link
          to="/guides"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-light transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to All Guides
        </Link>
      </div>
    </>
  )
}