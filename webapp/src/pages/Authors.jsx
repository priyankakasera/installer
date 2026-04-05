import { FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd } from '../config/seo'

export default function Authors() {
  return (
    <>
      <SEO
        title="About Us — DevTools Installer | Our Mission, Team & Story"
        description="Learn about DevTools Installer — who we are, why we built a free one-click developer tool setup for Windows, and how our team maintains 20+ tool integrations."
        keywords="DevTools Installer team, DevTools Installer about, developer tools contributors, open source developer tools, who made DevTools Installer"
        path="/authors"
        jsonLd={buildBreadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/authors' },
        ])}
      />

      <section className="pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">About Us</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            The story behind DevTools Installer and the team that keeps it running.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-5 text-gray-400 text-sm leading-relaxed">
            <h2 className="text-xl font-semibold text-white">Our Story</h2>
            <p>
              DevTools Installer started in early 2025 out of a simple frustration: every time we set up
              a new Windows machine or onboarded a new team member, we spent hours downloading Java, Node.js,
              Python, Git, and a dozen other tools from different websites, running separate installers,
              configuring PATH variables, and troubleshooting environment conflicts. The process was
              tedious, error-prone, and different every time.
            </p>
            <p>
              We searched for a single tool that could automate the entire workflow — download from official
              sources, configure environment variables correctly, and provide a clean uninstall path — but
              nothing existed that covered the full spectrum of developer tools without requiring a package
              manager like Chocolatey to already be installed. So we built one.
            </p>
            <p>
              Today, DevTools Installer supports 20+ tools across six categories — core runtimes, package
              managers, version control, cloud &amp; DevOps CLIs, IDEs, and API tools. Every binary is
              fetched directly from its official publisher. There is no bundled adware, no telemetry, and
              no subscription. The installer runs entirely on your local machine and modifies only what it
              needs to: tool directories, PATH entries, and environment variables like JAVA_HOME.
            </p>
            <p>
              The project is maintained by a small team of professional software engineers with combined
              experience spanning backend systems, DevOps infrastructure, and developer tooling. We
              personally test every supported tool version on Windows 10 and Windows 11 before each
              release. Our goal is to save developers time so they can focus on writing code instead of
              fighting with setup.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-white mb-6">The Team</h2>

          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              DT
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">DevTools Installer Team</h3>
              <p className="text-sm text-primary-light mb-3">Core Maintainers &amp; Engineers</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-2">
                We are a group of professional software engineers specializing in backend development,
                DevOps, and developer tooling. Our day jobs involve building and maintaining
                large-scale distributed systems, CI/CD pipelines, and cloud infrastructure — which
                means we have first-hand experience with the pain of setting up development environments
                across dozens of machines and VMs.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                We built DevTools Installer to scratch our own itch and decided to release it for free
                because we believe every developer deserves a friction-free setup experience. We
                actively maintain the project: updating tool versions, adding new integrations, and
                fixing issues reported by the community.
              </p>
              <div className="flex gap-3">
                <a
                  href="mailto:support@devtools-installer.web.app"
                  className="w-9 h-9 bg-white/5 border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Email"
                >
                  <FaEnvelope className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Expertise */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-white mb-6">Our Expertise</h2>
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-5 text-gray-400 text-sm leading-relaxed">
            <p>
              Every installation guide, troubleshooting tip, and configuration instruction on this
              website is written and reviewed by engineers who use these tools professionally. Our
              technical content is based on hands-on experience — not copied from other sources or
              generated by AI.
            </p>
            <p>
              Before publishing a guide, we perform a full install-and-verify cycle on clean Windows 10
              and Windows 11 machines. We test the official download link, run the installer (both
              manual and automated), configure environment variables, and execute the verification
              command. We also reproduce each &quot;Common Issue&quot; to confirm both the problem
              description and the fix are accurate.
            </p>
            <p>
              Our team's professional background includes:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Backend development with Java (Spring Boot), Node.js (Express, NestJS), and Python (Django, FastAPI).</li>
              <li>DevOps and infrastructure management using Kubernetes, Helm, and cloud platforms (AWS, Azure).</li>
              <li>CI/CD pipeline engineering with Jenkins, GitHub Actions, and Azure DevOps.</li>
              <li>Windows desktop application development using Electron and native APIs.</li>
              <li>Developer experience tooling — build systems, environment managers, and CLI tools.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-white mb-6">What We Do</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Test Every Release',
                desc: 'Each tool version is manually verified on Windows 10 and Windows 11 before we ship an update. We check downloads, silent installs, PATH configuration, and verification commands.',
              },
              {
                title: 'Official Sources Only',
                desc: 'We never host binaries ourselves. Every tool is downloaded directly from its publisher — Oracle, nodejs.org, python.org, GitHub, Microsoft, AWS, and others.',
              },
              {
                title: 'Clean Installs & Uninstalls',
                desc: 'Our installer tracks what it modifies. When you uninstall a tool, it removes the binaries, cleans PATH entries, and deletes environment variables — leaving no leftover configuration.',
              },
              {
                title: 'Open to Feedback',
                desc: 'We actively read and respond to every support message. Bug reports, feature requests, and tool suggestions are all welcome via our contact form or email.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-dark-card border border-dark-border rounded-xl p-5"
              >
                <h3 className="text-white font-medium mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Contributing */}
      <section className="py-12 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
            <h2 className="text-lg font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              Have a question, found a bug, or want to suggest a feature? You can reach us at{' '}
              <a href="mailto:support@devtools-installer.web.app" className="text-primary-light hover:underline">
                support@devtools-installer.web.app
              </a>{' '}
              or use the contact form on our{' '}
              <Link to="/support" className="text-primary-light hover:underline">
                Support page
              </Link>. We typically respond within 48 hours.
            </p>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
            <h2 className="text-lg font-semibold text-white mb-4">Contributing</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              DevTools Installer is a community-friendly project. If you would like to contribute — whether
              it is adding support for a new tool, fixing a bug, improving documentation, or suggesting a
              feature — we welcome pull requests and issues.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              For bug reports and feature requests, use our{' '}
              <Link to="/support" className="text-primary-light hover:underline">support page</Link> or email
              us at{' '}
              <a href="mailto:support@devtools-installer.web.app" className="text-primary-light hover:underline">
                support@devtools-installer.web.app
              </a>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
