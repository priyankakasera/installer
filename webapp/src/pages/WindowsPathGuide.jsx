import { Link } from 'react-router-dom'
import { FiCalendar } from 'react-icons/fi'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd } from '../config/seo'
import AdUnit, { SLOTS } from '../components/AdUnit'

export default function WindowsPathGuide() {
  return (
    <>
      <SEO
        title="Windows PATH Variable Explained — Edit & Fix It (2026)"
        description="What the Windows PATH variable does, how to view and edit it on Windows 10 & 11, and the most common mistakes that cause 'command not found' errors."
        keywords="Windows PATH variable, edit PATH Windows 10, edit PATH Windows 11, environment variables Windows, add to PATH, PATH not working, command not found Windows, configure PATH developer tools"
        path="/guides/windows-path-explained"
        jsonLd={buildBreadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Guides', url: '/guides' },
          { name: 'Windows PATH Variable Explained', url: '/guides/windows-path-explained' },
        ])}
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
              <span className="text-gray-400">Windows PATH Variable</span>
            </nav>
            <span className="section-label mb-4 inline-flex">Windows Internals</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 mt-4">
              Windows PATH Variable Explained
            </h1>
            <p className="text-lg text-gray-400">
              Everything you need to know about the PATH environment variable on Windows — what it
              does, how to edit it, and why developer tools like Java, Node.js, and Python depend on it.
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

          <div className="prose prose-invert prose-sm max-w-none space-y-10">
            {/* What Is PATH? */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">What Is the PATH Variable?</h2>
              <p>
                The <strong className="text-gray-300">PATH</strong> is a system environment variable that
                tells Windows where to look for executable programs. When you type a command like{' '}
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">java --version</code> or{' '}
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">node -v</code> in a terminal,
                Windows searches through every directory listed in PATH, in order, until it finds a matching
                executable file.
              </p>
              <p>
                If the directory containing <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">java.exe</code>{' '}
                is not in PATH, Windows cannot find it, and you get the error:
              </p>
              <div className="bg-black/40 rounded-lg p-4 font-mono text-xs text-red-400">
                'java' is not recognized as an internal or external command, operable program or batch file.
              </div>
              <p>
                This is the single most common setup issue for developer tools on Windows. The tool is
                installed, but the system does not know where to find it.
              </p>
            </section>

            {/* System vs User PATH */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">System PATH vs. User PATH</h2>
              <p>Windows has two separate PATH variables:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong className="text-gray-300">System PATH</strong> — applies to all users on the
                  machine. Editing requires administrator privileges. Typical entries include{' '}
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">C:\Windows\system32</code> and
                  directories for globally installed tools.
                </li>
                <li>
                  <strong className="text-gray-300">User PATH</strong> — applies only to the current
                  user account. Can be edited without administrator privileges. Often used for per-user
                  tool installations (e.g., Python installed via the Microsoft Store).
                </li>
              </ul>
              <p>
                When you open a terminal, Windows merges both variables: the system PATH entries come first,
                followed by user PATH entries. If two directories contain executables with the same name,
                the one earlier in the combined PATH wins.
              </p>
            </section>

            {/* How to View PATH */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">How to View Your Current PATH</h2>
              <p>Open any terminal (Command Prompt, PowerShell, or Windows Terminal) and run:</p>
              <div className="bg-black/40 rounded-lg p-4 font-mono text-xs text-green-400">
                echo %PATH%
              </div>
              <p>Or in PowerShell:</p>
              <div className="bg-black/40 rounded-lg p-4 font-mono text-xs text-green-400">
                $env:Path -split ';'
              </div>
              <p>
                The PowerShell version is easier to read because it prints each directory on its own line
                instead of one long semicolon-separated string.
              </p>
            </section>

            {/* How to Edit PATH */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">How to Edit PATH on Windows 10 &amp; 11</h2>
              <ol className="list-decimal list-inside space-y-3">
                <li>Press <kbd className="text-xs bg-white/5 px-1.5 py-0.5 rounded border border-dark-border">Win + S</kbd> and search for <strong className="text-gray-300">&quot;Environment Variables&quot;</strong>.</li>
                <li>Click <strong className="text-gray-300">"Edit the system environment variables"</strong>.</li>
                <li>In the System Properties dialog, click <strong className="text-gray-300">"Environment Variables…"</strong>.</li>
                <li>Under "System variables" (or "User variables"), select <strong className="text-gray-300">Path</strong> and click <strong className="text-gray-300">"Edit…"</strong>.</li>
                <li>Click <strong className="text-gray-300">"New"</strong> to add a directory, or select an entry and click <strong className="text-gray-300">"Delete"</strong> to remove one.</li>
                <li>Click <strong className="text-gray-300">OK</strong> on all dialogs to save.</li>
                <li><strong className="text-gray-300">Open a new terminal</strong> — existing terminals will not see the change.</li>
              </ol>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-xs">
                <strong className="text-primary-light">Important:</strong> Changes to PATH only take effect in
                newly opened terminal windows. If you edit PATH and then run a command in an already-open
                terminal, you will still see the old PATH.
              </div>
            </section>

            {/* Common Env Vars */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Common Developer Environment Variables</h2>
              <p>
                Besides PATH, many developer tools require their own environment variables. Here are the
                most common ones:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-dark-border text-left">
                      <th className="py-2 pr-4 text-gray-300 font-medium">Variable</th>
                      <th className="py-2 pr-4 text-gray-300 font-medium">Tool</th>
                      <th className="py-2 text-gray-300 font-medium">Typical Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                    {[
                      ['JAVA_HOME', 'Java (JDK)', 'C:\\Program Files\\Java\\jdk-21'],
                      ['MAVEN_HOME', 'Apache Maven', 'C:\\Program Files\\Maven\\apache-maven-3.9.9'],
                      ['GRADLE_HOME', 'Gradle', 'C:\\Program Files\\Gradle\\gradle-8.x'],
                      ['PYTHON_HOME', 'Python', 'C:\\Program Files\\Python\\Python3.x'],
                      ['NODE_PATH', 'Node.js', 'C:\\Program Files\\nodejs\\node_modules'],
                    ].map(([variable, tool, value]) => (
                      <tr key={variable}>
                        <td className="py-2 pr-4 font-mono text-green-400">{variable}</td>
                        <td className="py-2 pr-4">{tool}</td>
                        <td className="py-2 font-mono text-gray-500">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                These variables let other tools locate the installation. For example, Maven uses{' '}
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">JAVA_HOME</code> to find the
                JDK, and many build scripts reference{' '}
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">MAVEN_HOME</code> or{' '}
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">GRADLE_HOME</code>.
              </p>
            </section>

            {/* Common Mistakes */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Common PATH Mistakes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-medium mb-1">1. Adding the executable file instead of the directory</h3>
                  <p>
                    <span className="text-red-400">Wrong:</span>{' '}
                    <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">C:\Program Files\Java\jdk-21\bin\java.exe</code>
                  </p>
                  <p>
                    <span className="text-green-400">Correct:</span>{' '}
                    <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">C:\Program Files\Java\jdk-21\bin</code>
                  </p>
                  <p className="mt-1">PATH entries must point to <em>directories</em>, not individual files.</p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">2. Not opening a new terminal after editing</h3>
                  <p>
                    Environment variable changes are only picked up by newly launched processes.
                    Always close and reopen your terminal after editing PATH.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">3. Trailing or extra semicolons</h3>
                  <p>
                    A stray semicolon can create an empty entry that sometimes causes subtle issues.
                    Windows 10/11's graphical editor avoids this, but manual edits via the command
                    line (e.g., <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">setx</code>)
                    can introduce them.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">4. Exceeding the 2048-character limit</h3>
                  <p>
                    The User PATH variable has a 2048-character limit in the Windows Registry. If too many
                    directories are added, new entries are silently truncated. Use{' '}
                    <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">echo %PATH%</code> to
                    check the total length.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">5. Confusing system and user PATH</h3>
                  <p>
                    If a tool is installed system-wide (e.g., in <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">C:\Program Files</code>),
                    its directory should go in the <em>System</em> PATH. Adding it to User PATH works
                    only for the current account.
                  </p>
                </div>
              </div>
            </section>

            {/* Ad slot — mid-article */}
            <AdUnit slot={SLOTS.ARTICLE_MID} format="fluid" layout="in-article" />

            {/* How DevTools Installer Helps */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">How DevTools Installer Manages PATH Automatically</h2>
              <p>
                DevTools Installer eliminates all of the above manual steps. When you install a tool
                through the application:
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>The tool binary is downloaded from its official source and extracted to a standard directory.</li>
                <li>The correct <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">bin</code> directory is automatically added to the system PATH.</li>
                <li>Required environment variables (JAVA_HOME, MAVEN_HOME, etc.) are created and set to the correct values.</li>
                <li>The tool's version command is executed to confirm everything is configured correctly.</li>
              </ol>
              <p>
                When you uninstall a tool, DevTools Installer reverses these changes: removing the PATH
                entry, deleting environment variables, and cleaning up files. Your system PATH stays clean.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Link
                  to="/product"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl transition-colors"
                >
                  See All Features
                </Link>
                <Link
                  to="/guides"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-dark-card border border-dark-border text-white text-sm font-medium rounded-xl hover:border-primary/40 transition-colors"
                >
                  Browse Tool Guides
                </Link>
              </div>
            </section>

            {/* Ad slot — bottom of article, before closing */}
            <AdUnit slot={SLOTS.ARTICLE_BOTTOM} format="auto" className="mt-6" />
          </div>
        </div>
      </article>
    </>
  )
}
