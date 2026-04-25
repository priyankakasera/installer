import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import CodeBlock from '../components/CodeBlock'
import GuideLayout from '../components/GuideLayout'
import { buildBreadcrumbJsonLd, buildFAQJsonLd } from '../config/seo'
import AdUnit, { SLOTS } from '../components/AdUnit'

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

export default function JavaHomeExplained({ isEmbedded = false }) {
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides' },
      { name: 'What Is JAVA_HOME?', url: '/guides/java-home-explained' },
    ]),
    buildFAQJsonLd(faqs),
  ]

  return (
    <GuideLayout
      title="JAVA_HOME Explained — Set It Correctly on Windows (2026)"
      description="What is JAVA_HOME, why Maven and Gradle need it, and how to set it on Windows without mistakes. Covers JDK vs JRE, multi-version setups, and common errors."
      keywords="JAVA_HOME, set JAVA_HOME Windows, JAVA_HOME environment variable, Maven JAVA_HOME, Gradle JAVA_HOME, Java environment variables, configure Java Windows, JAVA_HOME not set, Java PATH configuration"
      path="/guides/java-home-explained"
      jsonLd={jsonLd}
      isEmbedded={isEmbedded}
    >
      <section className="mb-12">
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          JAVA_HOME is an environment variable that tells build tools and IDEs where your Java
          Development Kit is installed. Misconfiguring it is the single most common reason Maven 
          and Gradle builds fail on Windows.
        </p>

        <h2 className="text-2xl font-bold mb-4">What Is JAVA_HOME?</h2>
        <p>
            <strong className="text-gray-900 dark:text-white">JAVA_HOME</strong> is a Windows environment
            variable that stores the path to your Java Development Kit (JDK) installation
            directory. When a build tool like Apache Maven or Gradle starts up, one of the
            first things it does is read the JAVA_HOME variable to locate the JDK — specifically
            to find the Java compiler (<code>javac.exe</code>),
            the <code>jar</code> tool, and the libraries needed to compile your project.
        </p>
        <p className="mt-4">
            A correctly set JAVA_HOME looks like this:
        </p>
        <CodeBlock>{`JAVA_HOME=C:\\Program Files\\Java\\jdk-21.0.10`}</CodeBlock>
        <div className="bg-red-50 border-l-4 border-red-200 p-4 my-6">
            <p className="text-sm text-red-700">
                <strong>Common Mistake:</strong> Do NOT point JAVA_HOME to the <code className="!text-red-700">bin</code> subfolder. 
                It should point to the <em>root</em> of the JDK directory.
            </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Why Do Maven and Gradle Need It?</h2>
        <p>
            Maven needs more than just <code>java.exe</code>. It needs
            access to the JDK's entire directory structure to find the compiler, the archive tool, 
            and required libraries. Without JAVA_HOME, Maven cannot reliably "walk" the file system 
            to find these tools based just on a PATH entry.
        </p>
      </section>

      <AdUnit slot={SLOTS.ARTICLE_MID} format="fluid" layout="in-article" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">JAVA_HOME vs. PATH</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-200 dark:border-gray-800 rounded-lg">
                <thead className="bg-gray-50 dark:bg-[#0f1612]">
                    <tr>
                        <th className="text-left py-3 px-4 border-b border-gray-200 dark:border-gray-800 font-bold text-gray-900 dark:text-white">Variable</th>
                        <th className="text-left py-3 px-4 border-b border-gray-200 dark:border-gray-800 font-bold text-gray-900 dark:text-white">Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 font-mono text-primary font-bold">JAVA_HOME</td>
                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">Points to the JDK root. Used by build tools.</td>
                    </tr>
                    <tr>
                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 font-mono text-primary font-bold">PATH</td>
                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">Makes commands like "java" runnable globally.</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">How to Set It (Quick Steps)</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
            <li>Open <strong>System Properties</strong> (search for "Env" in Start).</li>
            <li>Click <strong>Environment Variables</strong>.</li>
            <li>Under <strong>System variables</strong>, click <strong>New</strong>.</li>
            <li>Set Name: <code>JAVA_HOME</code>.</li>
            <li>Set Value: Path to your JDK (e.g., <code>C:\Program Files\Java\jdk-21</code>).</li>
            <li>Edit the <strong>Path</strong> variable and add <code>%JAVA_HOME%\bin</code>.</li>
        </ol>
      </section>

      <AdUnit slot={SLOTS.ARTICLE_BOTTOM} format="auto" />

      <section className="mt-16">
        <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white m-0">Frequently Asked Questions</h2>
        </div>
        <div className="grid gap-4">
            {faqs.map((faq, i) => (
                <div key={i} className="bg-gray-50 dark:bg-[#121a16] border border-gray-100 dark:border-gray-800 rounded-xl p-6 hover:shadow-sm transition-shadow">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                        <span className="text-primary mt-0.5">Q.</span>
                        {faq.q}
                    </h4>
                    <div className="pl-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-l-2 border-gray-200 dark:border-gray-800 ml-1 mt-3">
                        {faq.a}
                    </div>
                </div>
            ))}
        </div>
      </section>

      <section className="mb-12 mt-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Related Guides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { to: '/guides/java-26-new-features', name: 'Java 26 New Features', description: 'Explore JDK 26 features including HTTP/3, Stable Values, and G1 GC improvements.' },
            { to: '/guides/java', name: 'Install Java (JDK)', description: 'Install a JDK on Windows with JAVA_HOME and PATH configured correctly.' },
            { to: '/guides/windows-path-explained', name: 'Windows PATH Explained', description: 'Master the PATH environment variable and fix "command not found" errors.' },
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
