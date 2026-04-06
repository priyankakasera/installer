import { Link } from 'react-router-dom'
import { FiCalendar } from 'react-icons/fi'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd } from '../config/seo'
import AdUnit, { SLOTS } from '../components/AdUnit'

function CodeBlock({ children }) {
  return (
    <pre className="bg-black/40 rounded-lg px-4 py-3 text-sm text-gray-300 overflow-x-auto font-mono whitespace-pre-wrap">
      {children}
    </pre>
  )
}

export default function SilentInstallGuide() {
  const jsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: 'Silent Install on Windows', url: '/guides/windows-silent-install' },
  ])

  return (
    <>
      <SEO
        title="Silent Install on Windows Explained — MSI, EXE, NSIS, Inno Setup | DevTools Installer"
        description="A complete guide to Windows silent installation switches. Learn how MSI /quiet, NSIS /S, and Inno Setup /VERYSILENT work, how to automate any installer from the command line, and how DevTools Installer uses silent installs internally."
        keywords="Windows silent install, MSI quiet install, NSIS silent install, Inno Setup silent, /quiet msiexec, unattended install Windows, silent exe install, automated software installation Windows, batch install Windows, PowerShell silent install"
        path="/guides/windows-silent-install"
        jsonLd={jsonLd}
      />

      <article className="pt-20 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <header className="mb-12">
            <nav className="text-sm text-gray-500 mb-4">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/guides" className="hover:text-gray-300">Guides</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Silent Install on Windows</span>
            </nav>
            <span className="section-label mb-4 inline-flex">Windows Internals</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 mt-4">
              Silent Install on Windows Explained
            </h1>
            <p className="text-lg text-gray-400">
              How MSI, NSIS, Inno Setup, and EXE installers can be made to run without any
              user interaction — and how DevTools Installer uses these techniques to automate
              the setup of 20+ developer tools.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
              <span>
                Written by{' '}
                <Link to="/authors/vishalhulawale" className="text-primary-light hover:underline font-medium">
                  Vishal Hulawale
                </Link>
              </span>
              <span className="flex items-center gap-1.5">
                <FiCalendar className="w-3.5 h-3.5" />
                Last reviewed: April 2026
              </span>
            </div>
          </header>

          <div className="space-y-10">

            {/* What is silent install */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">What Is a Silent Install?</h2>
              <p>
                A <strong className="text-gray-300">silent install</strong> (also called an
                unattended install or quiet install) is an installation that runs to completion
                without displaying any graphical wizard, dialog boxes, or progress screens. The
                installer runs in the background, makes all its decisions based on default
                settings or command-line arguments, and exits when it is done.
              </p>
              <p>
                Silent installs are used by IT administrators provisioning corporate workstations,
                DevOps engineers building machine images, CI/CD pipelines setting up build agents,
                and tools like DevTools Installer that automate multi-tool developer environment
                setup. Without silent install support, you would need to click through every
                installer wizard manually — which is exactly the problem DevTools Installer was
                built to solve.
              </p>
              <p>
                The key insight is that the same installer executable that shows you a GUI wizard
                also supports a headless mode. You just have to know the right command-line switch —
                and that switch depends on which installer framework the publisher used.
              </p>
            </section>

            {/* MSI installers */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">MSI Installers — Windows Installer Technology</h2>
              <p>
                MSI (Microsoft Software Installer) is the native Windows installer technology,
                built into Windows Installer (msiexec.exe). MSI files end in <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">.msi</code> and
                are common for enterprise software like Java JDK, Maven, Yarn, AWS CLI, and Azure CLI.
                They are not run directly — they are passed to msiexec.exe.
              </p>

              <h3 className="text-sm font-semibold text-white">Silent install switches</h3>
              <CodeBlock>{`msiexec /i package.msi /quiet
msiexec /i package.msi /quiet /norestart
msiexec /i package.msi /passive          ; shows progress bar, no dialogs`}</CodeBlock>

              <p>
                The <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">/quiet</code> flag is the most commonly used. It
                suppresses all user interface — no wizard, no dialogs, no progress bar. The
                installer runs entirely silently. <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">/norestart</code> prevents
                the installer from rebooting the machine automatically if one is required (useful in
                CI/CD pipelines). <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">/passive</code> is a middle ground
                that shows a minimal progress bar but no interactive dialogs.
              </p>

              <h3 className="text-sm font-semibold text-white mt-2">Passing custom properties</h3>
              <p>
                MSI installers often expose <strong className="text-gray-300">public properties</strong> that
                control installation behavior. For example, Python's MSI installer accepts{' '}
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">PrependPath=1</code> to add Python to PATH:
              </p>
              <CodeBlock>msiexec /i python-3.14.3-amd64.msi /quiet InstallAllUsers=1 PrependPath=1</CodeBlock>
              <p>
                DevTools Installer uses properties like this internally in the Python integration
                to ensure PATH is configured correctly without requiring the user to check any boxes.
              </p>

              <h3 className="text-sm font-semibold text-white mt-2">Tools installed by DevTools Installer using MSI</h3>
              <p>
                Java JDK, Yarn, AWS CLI, Azure CLI, Chocolatey, Git, and Maven all use MSI-based
                installers, making them straightforward to automate with msiexec.
              </p>
            </section>

            {/* NSIS installers */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">NSIS Installers — Nullsoft Scriptable Install System</h2>
              <p>
                NSIS is a widely used open-source installer framework originally developed by
                Winamp's creator, Nullsoft. Many popular tools distribute their Windows installers
                as NSIS-based EXE files, including Miniconda/Anaconda, some versions of Node.js, and
                parts of Git for Windows.
              </p>
              <p>
                NSIS installers are wrapped EXE files. Unlike MSI packages, they are not passed to
                msiexec — you run them directly. The silent install flag is:
              </p>
              <CodeBlock>installer.exe /S</CodeBlock>
              <p>
                Note the uppercase <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">/S</code> — NSIS is case-sensitive
                on this flag. A lowercase <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">/s</code> will not work.
              </p>

              <h3 className="text-sm font-semibold text-white">Custom install directory</h3>
              <CodeBlock>installer.exe /S /D=C:\CustomInstallPath</CodeBlock>
              <p>
                The <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">/D=</code> switch overrides the default install
                directory. It must come <strong className="text-gray-300">last</strong> on the command line, and the path
                must not be quoted even if it contains spaces.
              </p>

              <h3 className="text-sm font-semibold text-white mt-2">Miniconda — NSIS with custom properties</h3>
              <p>
                Miniconda uses an NSIS-based installer with additional custom properties:
              </p>
              <CodeBlock>Miniconda3-latest-Windows-x86_64.exe /InstallationType=AllUsers /AddToPath=0 /RegisterPython=0 /S /D=C:\ProgramData\miniconda3</CodeBlock>
              <p>
                DevTools Installer uses this exact command internally, with{' '}
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">AddToPath=0</code> because it configures the
                PATH entries itself through the Windows API rather than relying on the installer to
                do so — ensuring the correct three conda directories are added in the right order.
              </p>
            </section>

            {/* Inno Setup */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Inno Setup Installers</h2>
              <p>
                Inno Setup is another widely used installer framework, common for smaller and
                open-source Windows applications including Notepad++, Gradle, and many others.
                Inno Setup installers are also EXE files run directly, but with different flags
                than NSIS:
              </p>
              <CodeBlock>{`installer.exe /SILENT          ; shows progress window, no questions
installer.exe /VERYSILENT     ; completely headless, no windows at all
installer.exe /SUPPRESSMSGBOXES  ; suppresses any error message boxes`}</CodeBlock>
              <p>
                Unlike NSIS, these flags are case-<em>insensitive</em>. The distinction between
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">/SILENT</code> and{' '}
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">/VERYSILENT</code> matters in CI/CD: the former
                shows a progress window (which may cause issues in headless environments), while
                the latter runs completely invisible.
              </p>

              <h3 className="text-sm font-semibold text-white">Custom directory</h3>
              <CodeBlock>installer.exe /VERYSILENT /DIR="C:\CustomInstallPath"</CodeBlock>

              <h3 className="text-sm font-semibold text-white mt-2">Notepad++ example</h3>
              <CodeBlock>npp.8.9.3.Installer.x64.exe /S</CodeBlock>
              <p>
                Notepad++ uses Inno Setup but accepts the NSIS-style{' '}
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">/S</code> for compatibility. When there is
                ambiguity, check the installer's documentation or run{' '}
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">installer.exe /?</code> to see the supported flags.
              </p>
            </section>

            {/* Squirrel / NSIS-based GUI installers */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Squirrel-Based Installers</h2>
              <p>
                GitHub Desktop, Postman, VS Code, and Slack use a framework called{' '}
                <strong className="text-gray-300">Squirrel</strong>, which is common for
                Electron-based applications. Squirrel installs to the user's own profile directory
                (<code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">%LOCALAPPDATA%</code>), which is why these apps
                do not require administrator privileges.
              </p>
              <p>
                Squirrel-based installers use the{' '}
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">--silent</code> flag (with double dashes):
              </p>
              <CodeBlock>GitHubDesktopSetup-x64.exe --silent
PostmanSetup-x64.exe --silent</CodeBlock>
              <p>
                One complexity: Squirrel installers often auto-launch the application after
                installation. DevTools Installer handles this by detecting and closing any
                auto-launched application windows after the installer finishes.
              </p>
            </section>

            {/* Ad slot — mid-article */}
            <AdUnit slot={SLOTS.ARTICLE_MID} format="fluid" layout="in-article" />

            {/* How DevTools Installer uses these */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">How DevTools Installer Uses Silent Installs</h2>
              <p>
                DevTools Installer knows the installer type (MSI, NSIS, Inno Setup, Squirrel, or
                zip archive) for each of the 20+ supported tools, along with the exact silent flags
                needed for that specific tool version. When you click "Install Selected," the
                following happens:
              </p>
              <ol className="list-decimal list-inside space-y-3">
                <li>
                  The installer binary is downloaded from the official publisher's server and saved
                  to a temporary directory.
                </li>
                <li>
                  The installer is launched with the appropriate silent flag for its type —{' '}
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">msiexec /i ... /quiet</code> for MSI,{' '}
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">setup.exe /S</code> for NSIS, etc.
                </li>
                <li>
                  DevTools Installer monitors the process and waits for it to exit. The exit code
                  is checked — a non-zero exit code indicates failure and is reported to the user.
                </li>
                <li>
                  After the installer exits, DevTools Installer configures environment variables
                  through the Windows API (for tools that don't configure their own PATH), then
                  runs the tool's verification command to confirm the installation succeeded.
                </li>
              </ol>
              <p>
                For zip-archive tools (Maven, Gradle, Helm, kubectl, Istio), there is no installer
                at all — DevTools Installer extracts the archive to the target directory and
                sets up all environment variables manually.
              </p>
            </section>

            {/* Quick reference table */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Quick Reference — Silent Install Switches</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-dark-border">
                      <th className="text-left py-2 pr-4 text-white font-semibold">Framework</th>
                      <th className="text-left py-2 pr-4 text-white font-semibold">Silent Flag</th>
                      <th className="text-left py-2 text-white font-semibold">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { fw: 'MSI (msiexec)', flag: '/quiet', examples: 'Java, Maven, Yarn, AWS CLI, Azure CLI, Git' },
                      { fw: 'NSIS', flag: '/S (uppercase)', examples: 'Miniconda, some Python builds' },
                      { fw: 'Inno Setup', flag: '/VERYSILENT', examples: 'Notepad++, Gradle' },
                      { fw: 'Squirrel', flag: '--silent', examples: 'GitHub Desktop, Postman' },
                      { fw: 'Custom EXE', flag: '/quiet or /q', examples: 'Node.js, IntelliJ IDEA' },
                      { fw: 'Zip archive', flag: 'No installer — extract & configure', examples: 'kubectl, Helm, Istio, Maven, Gradle' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-dark-border/50">
                        <td className="py-2 pr-4 font-medium text-gray-300">{row.fw}</td>
                        <td className="py-2 pr-4 font-mono text-xs text-primary-light">{row.flag}</td>
                        <td className="py-2 text-gray-500">{row.examples}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Ad slot — before Related Guides */}
            <AdUnit slot={SLOTS.ARTICLE_BOTTOM} format="auto" />

            {/* Related guides */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">Related Guides</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { to: '/guides/windows-path-explained', label: 'Windows PATH Explained', desc: 'How the PATH environment variable works on Windows.' },
                  { to: '/guides/java-home-explained', label: 'What Is JAVA_HOME?', desc: 'Why Maven and Gradle need JAVA_HOME to be set.' },
                  { to: '/guides/java', label: 'How to Install Java (JDK)', desc: 'Step-by-step Java installation guide with MSI flags.' },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group bg-dark-card border border-dark-border rounded-xl p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <p className="text-white text-sm font-medium mb-1">{link.label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            <Link
              to="/guides"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-light transition-colors"
            >
              ← Back to All Guides
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
