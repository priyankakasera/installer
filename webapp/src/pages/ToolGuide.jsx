import { useParams, Navigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { FiArrowLeft, FiArrowRight, FiDownload, FiCopy, FiCheck, FiTerminal, FiCalendar } from 'react-icons/fi'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd, buildHowToJsonLd } from '../config/seo'
import toolGuides from '../config/toolGuides'
import AdUnit, { SLOTS } from '../components/AdUnit'

function FactCard({ label, children }) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-4">
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{label}</p>
      <div className="text-sm text-white leading-relaxed">{children}</div>
    </div>
  )
}

function SectionHeading({ id, icon, title, description }) {
  return (
    <div id={id} className="scroll-mt-28 mb-5">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">{description}</p>
      )}
    </div>
  )
}

function StepList({ steps, tone = 'primary' }) {
  const numberClass =
    tone === 'muted'
      ? 'bg-dark-border text-gray-300'
      : 'bg-primary/10 text-primary-light'

  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl border border-dark-border bg-dark-card px-5 py-4"
        >
          <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${numberClass}`}>
            {i + 1}
          </span>
          <span className="text-gray-300 leading-relaxed">
            <Linkify>{step}</Linkify>
          </span>
        </li>
      ))}
    </ol>
  )
}

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

function InlineCode({ children }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      title="Click to copy"
      className="inline-flex items-center gap-1 font-mono text-xs bg-dark-lighter border border-dark-border rounded px-1.5 py-0.5 text-primary-light hover:border-primary/40 transition-colors cursor-copy"
    >
      {children}
      {copied
        ? <FiCheck className="w-2.5 h-2.5 shrink-0" />
        : <FiCopy className="w-2.5 h-2.5 shrink-0 opacity-40" />}
    </button>
  )
}

function Linkify({ children }) {
  if (typeof children !== 'string') return children
  const regex = /(`[^`]+`|https?:\/\/[^\s)]+)/g
  const parts = children.split(regex)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <InlineCode key={i}>{part.slice(1, -1)}</InlineCode>
    }
    if (part.startsWith('http://') || part.startsWith('https://')) {
      return (
        <a key={i} href={part} target="_blank" rel="nofollow noopener noreferrer" className="text-primary-light hover:underline break-all">
          {part}
        </a>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export default function ToolGuide() {
  const { toolId } = useParams()
  const tool = toolGuides.find((t) => t.id === toolId)

  if (!tool) return <Navigate to="/404" replace />

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
  const hasEnvSetup = Boolean(tool.envVars?.length || tool.pathEntries?.length)
  const setupSummary = hasEnvSetup
    ? [
        tool.envVars?.length ? `${tool.envVars.length} environment ${tool.envVars.length === 1 ? 'variable' : 'variables'}` : null,
        tool.pathEntries?.length ? `${tool.pathEntries.length} PATH ${tool.pathEntries.length === 1 ? 'entry' : 'entries'}` : null,
      ]
        .filter(Boolean)
        .join(' + ')
    : 'No PATH or environment variables required'


  return (
    <>
      <SEO
        title={tool.seoTitle || `${tool.headline} — Step-by-Step (2026)`}
        description={tool.seoDescription || `${tool.headline} on Windows 10 & 11. Official download, PATH setup, environment variables, and verify command. Step-by-step.`}
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
          <p className="text-gray-400 max-w-2xl leading-relaxed">{tool.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            {tool.author && (
              <span className="flex items-center gap-1.5">
                Written by{' '}
                <Link to={`/authors/${tool.author.slug}`} className="text-primary-light hover:underline font-medium">
                  {tool.author.name}
                </Link>
              </span>
            )}
            {tool.lastReviewed && (
              <span className="flex items-center gap-1.5">
                <FiCalendar className="w-3.5 h-3.5" />
                Last reviewed: {new Date(tool.lastReviewed).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            )}
          </div>
        </div>

        {/* Quick facts */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
          <FactCard label="Supported Versions">
            <div className="flex flex-wrap gap-1.5">
              {tool.versions.map((v) => (
                <span key={v} className="rounded border border-dark-border bg-dark-lighter px-2 py-0.5 text-xs font-medium text-white">
                  {v}
                </span>
              ))}
            </div>
          </FactCard>
          <FactCard label="Official Source">
            <p className="font-medium">{tool.downloadLabel}</p>
          </FactCard>
          <FactCard label="Environment Setup">
            <p>{setupSummary}</p>
          </FactCard>
          <FactCard label="Verify Step">
            <p className="font-mono break-all">{tool.verifyCommand}</p>
          </FactCard>
        </div>

        {/* Affiliation disclaimer */}
        <p className="text-xs text-gray-500 mb-10 leading-relaxed">
          DevTools Installer is not affiliated with, endorsed by, or sponsored by the publisher of {tool.name}. All product names and logos are trademarks of their respective owners. Downloads are sourced directly from the official publisher.
        </p>

        {/* Ad slot — top of content, below disclaimer */}
        <AdUnit slot={SLOTS.GUIDE_HEADER} format="auto" className="mb-10" />

        {/* Prerequisite Tools */}
        {tool.prerequisiteTools?.length > 0 && (
          <section className="mb-12">
            <SectionHeading
              id="prerequisites"
              icon={<FiTerminal className="w-5 h-5 text-primary-light" />}
              title="Prerequisites"
              description={`Install these tools first if you want ${tool.name} to work correctly.`}
            />
            <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-5">
              <div className="flex flex-wrap gap-3">
                {tool.prerequisiteTools.map((prereq) => (
                  <Link
                    key={prereq.id}
                    to={`/guides/${prereq.id}`}
                    className="inline-flex flex-col rounded-lg border border-amber-800/30 bg-dark-card px-4 py-3 transition-colors hover:border-primary/40"
                  >
                    <span className="text-sm font-medium text-white">{prereq.name}</span>
                    <span className="mt-0.5 text-xs text-gray-500">{prereq.reason}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Install via DevTools Installer */}
        {tool.steps?.appSteps?.length > 0 && (
          <section className="mb-12">
            <SectionHeading
              id="install-with-devtools-installer"
              icon={<FiDownload className="w-5 h-5 text-primary-light" />}
              title="Install With DevTools Installer"
              description="Use this path if you want DevTools Installer to download the official package and handle the Windows setup for you."
            />
            <StepList steps={tool.steps.appSteps} />

            {/* Download source used */}
            <div className="mt-6 rounded-xl border border-dark-border bg-dark-card p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Download Source</h3>
              <p className="text-sm text-gray-300 mb-2">
                DevTools Installer downloads from the official publisher:
              </p>
              <CodeBlock>{tool.downloadSource}</CodeBlock>
              {tool.altSources?.length > 0 && (
                <div className="mt-3 text-sm text-gray-400">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Alternative sources</p>
                  <div className="space-y-1">
                    {tool.altSources.map((source) => (
                      <p key={source} className="leading-relaxed"><Linkify>{source}</Linkify></p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PATH & environment variables set by the app */}
            {(tool.envVars?.length > 0 || tool.pathEntries?.length > 0) && (
              <div className="mt-4 rounded-xl border border-dark-border bg-dark-card p-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">PATH &amp; Environment Variables</h3>
                <p className="text-sm text-gray-300 mb-3">
                  DevTools Installer sets the following automatically:
                </p>
                {tool.envVars?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Environment variables</p>
                    <div className="space-y-2">
                      {tool.envVars.map((v) => (
                        <CodeBlock key={v.name}>{`${v.name}=${v.value}`}</CodeBlock>
                      ))}
                    </div>
                  </div>
                )}
                {tool.pathEntries?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">PATH entries</p>
                    <div className="space-y-2">
                      {tool.pathEntries.map((p, i) => (
                        <CodeBlock key={i}>{p}</CodeBlock>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Verification handled by the app */}
            <div className="mt-4 rounded-xl border border-dark-border bg-dark-card p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Verification</h3>
              <p className="text-sm text-gray-300 mb-2">
                DevTools Installer verifies the install by running:
              </p>
              <CodeBlock>{tool.verifyCommand}</CodeBlock>
              {tool.verifyOutput && (
                <p className="mt-2 text-xs text-gray-500">Expected output: <span className="font-mono text-gray-300">{tool.verifyOutput}</span></p>
              )}
            </div>
          </section>
        )}

        {/* Manual Installation Steps */}
        {tool.steps?.manualSteps?.length > 0 && (
          <section className="mb-12">
            <SectionHeading
              id="manual-installation"
              icon={<FiDownload className="w-5 h-5 text-primary-light" />}
              title="Manual Installation Steps"
              description={
                hasEnvSetup
                  ? 'Use these steps if you want to run the installer yourself and apply the Windows PATH or environment changes manually.'
                  : 'Use these steps if you want to run the official installer yourself.'
              }
            />
            <StepList steps={tool.steps.manualSteps} tone="muted" />
          </section>
        )}

        {/* Ad slot — mid-content, after verify */}
        <AdUnit slot={SLOTS.GUIDE_MID} format="fluid" layout="in-article" className="mb-12" />

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

        {/* Post-install config */}
        {tool.postInstallConfig?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-5">First-Time Setup</h2>
            <p className="text-gray-400 text-sm mb-4">
              After installing, run these commands in a new terminal to configure{' '}
              {tool.name} for your identity and preferences:
            </p>
            <div className="space-y-3">
              {tool.postInstallConfig.map((item, i) => (
                <div key={i}>
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <CodeBlock>{item.cmd}</CodeBlock>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommended Extensions (VS Code) */}
        {tool.recommendedExtensions?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-2">Recommended Extensions</h2>
            <p className="text-gray-400 text-sm mb-5">
              Install these VS Code extensions to get the most out of{' '}
              {tool.name} for your workflow:
            </p>
            <div className="space-y-3">
              {tool.recommendedExtensions.map((ext) => (
                <div
                  key={ext.name}
                  className="flex items-start gap-3 bg-dark-card border border-dark-border rounded-xl px-5 py-4"
                >
                  <span className="w-2 h-2 rounded-full bg-primary-light shrink-0 mt-2" />
                  <div>
                    <p className="text-white font-medium text-sm">{ext.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{ext.publisher}</p>
                    <p className="text-sm text-gray-400 mt-1">{ext.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommended Plugins (IntelliJ) */}
        {tool.recommendedPlugins?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-2">Recommended Plugins</h2>
            <p className="text-gray-400 text-sm mb-5">
              These plugins are widely used in professional Java development with{' '}
              {tool.name}:
            </p>
            <div className="space-y-3">
              {tool.recommendedPlugins.map((plugin) => (
                <div
                  key={plugin.name}
                  className="flex items-start gap-3 bg-dark-card border border-dark-border rounded-xl px-5 py-4"
                >
                  <span className="w-2 h-2 rounded-full bg-primary-light shrink-0 mt-2" />
                  <div>
                    <p className="text-white font-medium text-sm">{plugin.name}</p>
                    <p className="text-sm text-gray-400 mt-1">{plugin.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Workflow Tips (Postman) */}
        {tool.workflowTips?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-2">Workflow Tips</h2>
            <p className="text-gray-400 text-sm mb-5">
              Get more out of {tool.name} with these practical workflow patterns:
            </p>
            <div className="bg-dark-card border border-dark-border rounded-xl p-5">
              <ul className="space-y-3">
                {tool.workflowTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary-light font-bold shrink-0">&#x2192;</span>
                    <span className="text-gray-300 leading-relaxed text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Common Issues */}
        {tool.commonIssues?.length > 0 && (
          <section className="mb-12">
            <SectionHeading
              id="common-issues-and-fixes"
              icon={<FiTerminal className="w-5 h-5 text-primary-light" />}
              title="Common Issues And Fixes"
              description="Check the problem and the exact fix before you reinstall anything. Some guides also include the reason the issue happens."
            />
            <div className="space-y-4">
              {tool.commonIssues.map((issue, i) => (
                <div
                  key={i}
                  className="bg-dark-card border border-dark-border rounded-xl p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Problem</p>
                  <p className="mt-2 text-white font-medium">{issue.problem}</p>
                  {issue.why && (
                    <>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Why it happens</p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">{issue.why}</p>
                    </>
                  )}
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Exact fix</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">{issue.fix}</p>
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

        {/* Ad slot — bottom of content, before Related Guides */}
        <AdUnit slot={SLOTS.GUIDE_BOTTOM} format="auto" className="mb-12" />

        {/* Related Guides */}
        {tool.relatedGuides?.length > 0 && (() => {
          const related = tool.relatedGuides
            .map((id) => toolGuides.find((t) => t.id === id))
            .filter(Boolean)
          return related.length > 0 ? (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-white mb-5">
                Related Guides
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/guides/${rel.id}`}
                    className="group bg-dark-card border border-dark-border rounded-xl p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <h3 className="text-white font-medium mb-1 flex items-center justify-between">
                      {rel.name}
                      <FiArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary-light group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {rel.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null
        })()}

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