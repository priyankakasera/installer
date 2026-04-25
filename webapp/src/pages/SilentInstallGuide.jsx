import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import GuideLayout from '../components/GuideLayout'
import CodeBlock from '../components/CodeBlock'
import { buildBreadcrumbJsonLd } from '../config/seo'
import AdUnit, { SLOTS } from '../components/AdUnit'

export default function SilentInstallGuide({ isEmbedded = false }) {
  const jsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: 'Silent Install on Windows', url: '/guides/windows-silent-install' },
  ])

  return (
    <GuideLayout
      title="Windows Silent Install Explained — MSI, EXE, NSIS, Inno (2026)"
      description="How Windows silent install switches work for MSI /quiet, NSIS /S, and Inno Setup /VERYSILENT. Automate any installer from the command line — with examples."
      keywords="Windows silent install, MSI quiet install, NSIS silent install, Inno Setup silent, /quiet msiexec, unattended install Windows, silent exe install, automated software installation Windows, batch install Windows, PowerShell silent install"
      path="/guides/windows-silent-install"
      jsonLd={jsonLd}
      isEmbedded={isEmbedded}
      backTo="/guides/general"
    >
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
        How MSI, NSIS, Inno Setup, and EXE installers can be made to run without any
        user interaction — and how DevTools Installer uses these techniques to automate
        the setup of 20+ developer tools.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Is a Silent Install?</h2>
        <p>
            A <strong className="text-gray-900 dark:text-white">silent install</strong> (also called an
            unattended install or quiet install) is an installation that runs to completion
            without displaying any graphical wizard, dialog boxes, or progress screens. The
            installer runs in the background, makes all its decisions based on default
            settings or command-line arguments, and exits when it is done.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">MSI Installers (msiexec)</h2>
        <p>
            MSI (Microsoft Software Installer) is the native Windows technology. 
            They are run via <code>msiexec.exe</code>.
        </p>
        <CodeBlock>{`msiexec /i package.msi /quiet /norestart`}</CodeBlock>
        <p className="mt-4">
            The <code>/quiet</code> flag suppresses all UI. 
            You can also pass public properties like <code>INSTALLDIR="C:\Java"</code>.
        </p>
      </section>

      <AdUnit slot={SLOTS.ARTICLE_MID} format="fluid" layout="in-article" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">NSIS (Nullsoft)</h2>
        <p>
            Common for EXE installers like Miniconda or Git. The flag is case-sensitive:
        </p>
        <CodeBlock>installer.exe /S</CodeBlock>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
            Note: An uppercase /S is required for NSIS installers.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Inno Setup</h2>
        <p>
            Used by Gradle and Notepad++. It uses a different set of flags:
        </p>
        <CodeBlock>{`installer.exe /VERYSILENT /SUPPRESSMSGBOXES`}</CodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Quick Reference Table</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-200 dark:border-gray-800">
                <thead className="bg-gray-50 dark:bg-[#0f1612]">
                    <tr>
                        <th className="text-left py-3 px-4 border-b border-gray-200 dark:border-gray-800 font-bold text-gray-900 dark:text-white">Framework</th>
                        <th className="text-left py-3 px-4 border-b border-gray-200 dark:border-gray-800 font-bold text-gray-900 dark:text-white">Silent Flag</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">MSI (msiexec)</td>
                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 font-mono text-primary">/quiet</td>
                    </tr>
                    <tr>
                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">NSIS</td>
                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 font-mono text-primary">/S</td>
                    </tr>
                    <tr>
                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">Inno Setup</td>
                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 font-mono text-primary">/VERYSILENT</td>
                    </tr>
                    <tr>
                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">Squirrel (VS Code)</td>
                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 font-mono text-primary">--silent</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </section>

      <AdUnit slot={SLOTS.ARTICLE_BOTTOM} format="auto" />
      <section className="mb-12 mt-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Related Guides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { to: '/guides/java-home-explained', name: 'JAVA_HOME Explained', description: 'Why Maven and Gradle need JAVA_HOME separate from PATH, and how to set it correctly on Windows.' },
            { to: '/guides/windows-path-explained', name: 'Windows PATH Explained', description: 'Master the PATH environment variable and fix "command not found" errors.' },
            { to: '/guides/installations', name: 'All Installations', description: 'Browse all tool installation guides.' },
          ].map((rel) => (
            <Link
              key={rel.to}
              to={rel.to}
              className="group bg-white dark:bg-[#121a16] shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 !no-underline"
            >
              <h3 className="text-gray-900 dark:text-white font-medium mb-1 flex items-center justify-between">
                {rel.name}
                <FiArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                {rel.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </GuideLayout>
  )
}
