import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd, buildFAQJsonLd } from '../config/seo'
import AdUnit, { SLOTS } from '../components/AdUnit'

function CodeBlock({ children }) {
  return (
    <pre className="bg-black/40 rounded-lg px-4 py-3 text-sm text-gray-300 overflow-x-auto font-mono whitespace-pre-wrap">
      {children}
    </pre>
  )
}

function ErrorBlock({ children }) {
  return (
    <div className="bg-black/40 rounded-lg p-4 font-mono text-xs text-red-400">
      {children}
    </div>
  )
}

const faqs = [
  {
    q: 'Does JAVA_HOME point to the JDK root or the bin folder?',
    a: 'JAVA_HOME should point to the JDK root directory — e.g., C:\\Program Files\\Java\\jdk-21.0.10. Do NOT include the \\bin subfolder in JAVA_HOME. The bin folder belongs in your PATH entry instead (%JAVA_HOME%\\bin).',
  },
  {
    q: 'Do I need both JAVA_HOME and the bin directory in PATH?',
    a: 'Yes. JAVA_HOME is used by build tools (Maven, Gradle, Ant) to locate the JDK root. The PATH entry (%JAVA_HOME%\\bin) lets you run "java", "javac", and "jar" commands directly from any terminal. Both are needed.',
  },
  {
    q: 'What is the difference between a JDK and a JRE, and does JAVA_HOME care?',
    a: 'The JDK (Java Development Kit) includes the compiler (javac) and other development tools in addition to the runtime. The JRE (Java Runtime Environment) only includes what is needed to run Java applications. JAVA_HOME must point to a JDK — not a standalone JRE — because Maven, Gradle, and other build tools require the compiler.',
  },
  {
    q: 'Can I have multiple Java versions installed and switch between them?',
    a: 'Yes. Install multiple JDK versions and update JAVA_HOME to point to the one you want active. You can also reorder PATH entries. Run "where java" to confirm which java.exe Windows resolves first. Some teams use wrapper scripts or version managers to automate the switch.',
  },
  {
    q: 'Do I need JAVA_HOME for just running Java programs?',
    a: 'No. If you only want to run Java applications (not develop them), you just need java.exe in your PATH. JAVA_HOME is specifically used by build tools and IDEs that need to locate the full JDK directory structure.',
  },
]

export default function JavaHomeExplained() {
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides' },
      { name: 'What Is JAVA_HOME?', url: '/guides/java-home-explained' },
    ]),
    buildFAQJsonLd(faqs),
  ]

  return (
    <>
      <SEO
        title="What Is JAVA_HOME and Why Does It Matter? — Complete Guide | DevTools Installer"
        description="A complete explanation of the JAVA_HOME environment variable on Windows. Learn what it is, why Maven and Gradle require it, how to set it correctly, and how to avoid the most common configuration mistakes."
        keywords="JAVA_HOME, set JAVA_HOME Windows, JAVA_HOME environment variable, Maven JAVA_HOME, Gradle JAVA_HOME, Java environment variables, configure Java Windows, JAVA_HOME not set, Java PATH configuration"
        path="/guides/java-home-explained"
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
              <span className="text-gray-400">What Is JAVA_HOME?</span>
            </nav>
            <span className="section-label mb-4 inline-flex">Core Runtimes</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 mt-4">
              What Is JAVA_HOME and Why Does It Matter?
            </h1>
            <p className="text-lg text-gray-400">
              JAVA_HOME is an environment variable that tells build tools and IDEs where your Java
              Development Kit is installed. Misconfiguring it — or not setting it at all — is the
              single most common reason Maven and Gradle builds fail on a freshly set up Windows
              machine.
            </p>
          </header>

          <div className="space-y-10">

            {/* What is JAVA_HOME */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">What Is JAVA_HOME?</h2>
              <p>
                <strong className="text-gray-300">JAVA_HOME</strong> is a Windows environment
                variable that stores the path to your Java Development Kit (JDK) installation
                directory. When a build tool like Apache Maven or Gradle starts up, one of the
                first things it does is read the JAVA_HOME variable to locate the JDK — specifically
                to find the Java compiler (<code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">javac.exe</code>),
                the <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">jar</code> tool, and
                the Java runtime libraries it needs to compile and run your project.
              </p>
              <p>
                A correctly set JAVA_HOME looks like this:
              </p>
              <CodeBlock>JAVA_HOME=C:\Program Files\Java\jdk-21.0.10</CodeBlock>
              <p>
                Notice that JAVA_HOME points to the <em>root</em> of the JDK directory — not to
                the <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">bin</code> subfolder.
                This is the most common configuration mistake: pointing JAVA_HOME at
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">C:\Program Files\Java\jdk-21.0.10\bin</code> instead
                of the directory above it. When that happens, Maven exits immediately with an error
                like this:
              </p>
              <ErrorBlock>The JAVA_HOME environment variable is not defined correctly,
this environment variable is needed to run this program.
NB: JAVA_HOME should point to a JDK, not a JRE.</ErrorBlock>
            </section>

            {/* Why tools need it */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Why Do Maven and Gradle Need JAVA_HOME?</h2>
              <p>
                You might wonder: if you can run <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">java -version</code> in
                your terminal, why can't Maven just use the same Java? The answer is that PATH-based
                lookup only gives you the executable file — it doesn't tell the build tool where the
                <em> rest</em> of the JDK lives.
              </p>
              <p>
                Maven needs more than just <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">java.exe</code>. It needs
                access to the JDK's entire directory structure — specifically:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">$JAVA_HOME/bin/javac.exe</code> — the Java compiler
                </li>
                <li>
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">$JAVA_HOME/bin/jar.exe</code> — the archive tool for
                  packaging <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">.jar</code> files
                </li>
                <li>
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">$JAVA_HOME/lib/</code> — JDK libraries required by
                  certain compiler plugins and annotation processors
                </li>
              </ul>
              <p>
                Maven reads JAVA_HOME to construct these paths directly. If the variable isn't set,
                Maven has no reliable way to find the compiler — it cannot simply walk the PATH to
                discover the surrounding directory structure.
              </p>
              <p>
                Gradle has the same requirement. It reads JAVA_HOME at startup to locate the JDK it
                will use to compile your project. If JAVA_HOME is missing or points to the wrong
                directory, you will see an error like:
              </p>
              <ErrorBlock>ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.</ErrorBlock>
              <p>
                IDEs are similar: IntelliJ IDEA and Eclipse can auto-detect JDKs in known
                directories, but they also read JAVA_HOME as a fallback to pre-populate the "Project
                JDK" field when you create a new project.
              </p>
            </section>

            {/* JAVA_HOME vs PATH */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">JAVA_HOME vs. PATH — What Is the Difference?</h2>
              <p>
                Both variables are needed, but they serve different purposes:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-dark-border">
                      <th className="text-left py-2 pr-4 text-white font-semibold">Variable</th>
                      <th className="text-left py-2 pr-4 text-white font-semibold">What It Does</th>
                      <th className="text-left py-2 text-white font-semibold">Who Uses It</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-dark-border/50">
                      <td className="py-2 pr-4 font-mono text-xs text-primary-light">JAVA_HOME</td>
                      <td className="py-2 pr-4">Points to the JDK root directory</td>
                      <td className="py-2">Maven, Gradle, Ant, IDEs</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs text-primary-light">PATH (…\bin)</td>
                      <td className="py-2 pr-4">Makes <code className="text-xs bg-white/5 px-1 py-0.5 rounded">java</code>, <code className="text-xs bg-white/5 px-1 py-0.5 rounded">javac</code> runnable from any terminal</td>
                      <td className="py-2">Terminal, scripts, VS Code tasks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                The standard configuration is to set JAVA_HOME to the JDK root, then add
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">%JAVA_HOME%\bin</code> to PATH. Using the variable
                reference in PATH (rather than a hardcoded path) means you only need to update
                JAVA_HOME when switching JDK versions — the PATH entry updates automatically.
              </p>
            </section>

            {/* How to set it */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">How to Set JAVA_HOME on Windows 10 and 11</h2>
              <p>
                There are two ways to set JAVA_HOME permanently on Windows: through the GUI (System
                Properties) or from the command line (PowerShell / setx). Both methods write to the
                same registry location.
              </p>

              <h3 className="text-sm font-semibold text-white">Method 1: System Properties (GUI)</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Press <kbd className="text-xs bg-white/10 px-1.5 py-0.5 rounded border border-dark-border">Win + R</kbd>, type <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">sysdm.cpl</code>, and press Enter.</li>
                <li>Click the <strong className="text-gray-300">Advanced</strong> tab, then <strong className="text-gray-300">Environment Variables</strong>.</li>
                <li>Under <strong className="text-gray-300">System variables</strong>, click <strong className="text-gray-300">New</strong>.</li>
                <li>Set Variable name: <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">JAVA_HOME</code></li>
                <li>Set Variable value: the path to your JDK root, e.g. <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">C:\Program Files\Java\jdk-21.0.10</code></li>
                <li>Click OK, then find the <strong className="text-gray-300">Path</strong> variable under System variables, click Edit, and add <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">%JAVA_HOME%\bin</code> as a new entry.</li>
                <li>Click OK on all dialogs. Open a <strong className="text-gray-300">new</strong> terminal and run: <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">echo %JAVA_HOME%</code></li>
              </ol>

              <h3 className="text-sm font-semibold text-white mt-4">Method 2: PowerShell (Admin)</h3>
              <CodeBlock>[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Java\jdk-21.0.10", "Machine")
$current = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
[System.Environment]::SetEnvironmentVariable("Path", "$current;%JAVA_HOME%\bin", "Machine")</CodeBlock>
              <p>
                After running these commands, open a <strong className="text-gray-300">new</strong> terminal
                to verify the changes:
              </p>
              <CodeBlock>echo %JAVA_HOME%
java -version
javac -version</CodeBlock>

              <h3 className="text-sm font-semibold text-white mt-4">Method 3: DevTools Installer (Automatic)</h3>
              <p>
                DevTools Installer sets JAVA_HOME and PATH automatically when you install Java. No
                manual steps required — the installer detects the JDK installation path and
                configures both variables through the Windows API before the installation wizard
                finishes.
              </p>
            </section>

            {/* Multiple versions */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Managing Multiple Java Versions</h2>
              <p>
                If your work requires switching between JDK versions — for example, JDK 21 for a
                new Spring Boot project and JDK 11 for a legacy enterprise application — you have
                a few options:
              </p>
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Option A: Update JAVA_HOME manually</h3>
                <p>
                  Install both JDK versions side by side. When you need to switch, update JAVA_HOME
                  to point to the desired JDK root and open a new terminal. Maven and Gradle will
                  pick up the change on the next build.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Option B: Per-project JAVA_HOME in .env</h3>
                <p>
                  For projects that require a specific JDK version, you can set JAVA_HOME in a
                  project-level PowerShell profile or <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">.env</code> file
                  and load it at the start of your build session. This keeps the global JAVA_HOME
                  pointing at your primary JDK while individual projects can override it.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Option C: Maven Toolchains</h3>
                <p>
                  Apache Maven has a built-in <strong className="text-gray-300">toolchains</strong> mechanism that lets you define
                  multiple JDKs in a{' '}
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">toolchains.xml</code> file and specify in each
                  project's pom.xml which JDK version it requires. Maven automatically uses the
                  right JDK for each build, independent of the system JAVA_HOME.
                </p>
              </div>
              <p>
                For most developers, Option A (manually updating JAVA_HOME) is sufficient. Options B
                and C are useful in team environments where different projects have strict JDK
                version requirements.
              </p>
            </section>

            {/* Ad slot — mid-article */}
            <AdUnit slot={SLOTS.ARTICLE_MID} format="fluid" layout="in-article" />

            {/* Common mistakes */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-5 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Common JAVA_HOME Mistakes</h2>

              <div>
                <p className="text-white font-medium mb-1">Mistake 1: Pointing JAVA_HOME at the bin folder</p>
                <p className="mb-2">Wrong: <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">JAVA_HOME=C:\Program Files\Java\jdk-21.0.10\bin</code></p>
                <p>Right: <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">JAVA_HOME=C:\Program Files\Java\jdk-21.0.10</code></p>
              </div>

              <div>
                <p className="text-white font-medium mb-1">Mistake 2: Pointing JAVA_HOME at a JRE instead of a JDK</p>
                <p>
                  Older Java installers would install both a JDK and a separate JRE at different
                  paths. JAVA_HOME must point to the <em>JDK</em>. A JRE directory is missing
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">bin\javac.exe</code>, which causes Maven to fail.
                  JDK 9+ merged the JDK and JRE into a single installation, so this is less common
                  today.
                </p>
              </div>

              <div>
                <p className="text-white font-medium mb-1">Mistake 3: Setting JAVA_HOME as a User variable instead of a System variable</p>
                <p>
                  If JAVA_HOME is a <em>User</em> variable, it is only visible to your user account
                  and only in interactive sessions. Build servers, Windows services, and processes
                  running under different accounts will not see it. Set JAVA_HOME as a{' '}
                  <strong className="text-gray-300">System variable</strong> under "System variables" in
                  Environment Variables, so it applies machine-wide.
                </p>
              </div>

              <div>
                <p className="text-white font-medium mb-1">Mistake 4: Not opening a new terminal after updating JAVA_HOME</p>
                <p>
                  Environment variable changes do not apply to already-open terminal sessions.
                  Always open a <strong className="text-gray-300">new</strong> Command Prompt,
                  PowerShell, or Windows Terminal instance after making changes. Running
                  <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">echo %JAVA_HOME%</code> in an old
                  session will show the old (or empty) value.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-5 text-gray-400 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
              <div className="space-y-5">
                {faqs.map((faq, i) => (
                  <div key={i}>
                    <p className="text-white font-medium mb-1">{faq.q}</p>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Ad slot — before Related Guides */}
            <AdUnit slot={SLOTS.ARTICLE_BOTTOM} format="auto" />

            {/* Related */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">Related Guides</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { to: '/guides/java', label: 'How to Install Java (JDK)', desc: 'Step-by-step guide including JAVA_HOME setup.' },
                  { to: '/guides/maven', label: 'How to Install Maven', desc: 'Maven setup including MAVEN_HOME and JDK requirements.' },
                  { to: '/guides/windows-path-explained', label: 'Windows PATH Explained', desc: 'Complete guide to the PATH environment variable.' },
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
