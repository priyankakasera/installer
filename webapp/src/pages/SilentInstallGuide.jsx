import GuideLayout from '../components/GuideLayout'
import { buildBreadcrumbJsonLd } from '../config/seo'
import AdUnit, { SLOTS } from '../components/AdUnit'

export default function SilentInstallGuide() {
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
    >
      <p className="text-xl text-gray-600 mb-12 leading-relaxed">
        How MSI, NSIS, Inno Setup, and EXE installers can be made to run without any
        user interaction — and how DevTools Installer uses these techniques to automate
        the setup of 20+ developer tools.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Is a Silent Install?</h2>
        <p>
            A <strong className="text-gray-900">silent install</strong> (also called an
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
            They are run via <code className="!text-gray-900">msiexec.exe</code>.
        </p>
        <pre><code>{`msiexec /i package.msi /quiet /norestart`}</code></pre>
        <p className="mt-4">
            The <code className="!text-gray-900">/quiet</code> flag suppresses all UI. 
            You can also pass public properties like <code className="!text-gray-900">INSTALLDIR="C:\Java"</code>.
        </p>
      </section>

      <AdUnit slot={SLOTS.ARTICLE_MID} format="fluid" layout="in-article" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">NSIS (Nullsoft)</h2>
        <p>
            Common for EXE installers like Miniconda or Git. The flag is case-sensitive:
        </p>
        <pre><code>installer.exe /S</code></pre>
        <p className="mt-4 text-sm text-gray-500 italic">
            Note: An uppercase /S is required for NSIS installers.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Inno Setup</h2>
        <p>
            Used by Gradle and Notepad++. It uses a different set of flags:
        </p>
        <pre><code>{`installer.exe /VERYSILENT /SUPPRESSMSGBOXES`}</code></pre>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Quick Reference Table</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left py-3 px-4 border-b border-gray-200 font-bold text-gray-900">Framework</th>
                        <th className="text-left py-3 px-4 border-b border-gray-200 font-bold text-gray-900">Silent Flag</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-3 px-4 border-b border-gray-200 text-gray-700">MSI (msiexec)</td>
                        <td className="py-3 px-4 border-b border-gray-200 font-mono text-primary">/quiet</td>
                    </tr>
                    <tr>
                        <td className="py-3 px-4 border-b border-gray-200 text-gray-700">NSIS</td>
                        <td className="py-3 px-4 border-b border-gray-200 font-mono text-primary">/S</td>
                    </tr>
                    <tr>
                        <td className="py-3 px-4 border-b border-gray-200 text-gray-700">Inno Setup</td>
                        <td className="py-3 px-4 border-b border-gray-200 font-mono text-primary">/VERYSILENT</td>
                    </tr>
                    <tr>
                        <td className="py-3 px-4 border-b border-gray-200 text-gray-700">Squirrel (VS Code)</td>
                        <td className="py-3 px-4 border-b border-gray-200 font-mono text-primary">--silent</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </section>

      <AdUnit slot={SLOTS.ARTICLE_BOTTOM} format="auto" />
    </GuideLayout>
  )
}
