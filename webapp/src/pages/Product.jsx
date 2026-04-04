import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SEO from '../components/SEO'
import { buildBreadcrumbJsonLd, buildSoftwareApplicationJsonLd } from '../config/seo'
import {
  FiMousePointer, FiSettings, FiCheckCircle, FiShield, FiZap,
  FiDownload, FiList, FiMonitor, FiTrash2, FiLayers
} from 'react-icons/fi'
import { HiOutlineDesktopComputer } from 'react-icons/hi'

const features = [
  { icon: FiMousePointer, title: 'One-Click Setup', desc: 'Select tools and hit install — everything is handled automatically.' },
  { icon: FiTrash2, title: 'One-Click Cleanup', desc: 'Cleanly uninstall tools, remove PATH entries, and delete environment variables in one click.' },
  { icon: FiLayers, title: 'Bundle Installation', desc: 'Pre-configured bundles for Java, Full-Stack, Frontend, and Cloud & DevOps workflows.' },
  { icon: FiSettings, title: 'Automatic Config', desc: 'PATH, JAVA_HOME, MAVEN_HOME, and all environment variables are set for you.' },
  { icon: FiCheckCircle, title: 'Hassle-Free', desc: 'Avoid setup errors, version conflicts, and manual configuration.' },
  { icon: FiShield, title: 'Safe & Secure', desc: 'Downloads directly from official sources. No bundled adware or telemetry.' },
  { icon: FiZap, title: 'Fast & Lightweight', desc: 'Small installer size with parallel downloads for maximum speed.' },
  { icon: FiDownload, title: 'Version Selection', desc: 'Choose exactly which version of each tool you want to install.' },
  { icon: HiOutlineDesktopComputer, title: 'Tested on Windows 11', desc: 'Built and tested on Windows 11 64-bit. Compatible with Windows 10 and 11.' },
]

const tools = [
  { name: 'Java (JDK)', logo: '/icons/java.webp', desc: 'Oracle JDK & Adoptium Temurin — multiple versions' },
  { name: 'Node.js', logo: '/icons/nodejs.svg', desc: 'JavaScript runtime — LTS and Current releases' },
  { name: 'Python', logo: '/icons/python.svg', desc: 'Python 3.x with pip and Scripts in PATH' },
  { name: 'Maven', logo: '/icons/maven.svg', desc: 'Build automation for Java projects' },
  { name: 'Gradle', logo: '/icons/gradle.svg', desc: 'Multi-language build automation tool' },
  { name: 'Yarn', logo: '/icons/yarn.svg', desc: 'Fast dependency management for Node.js' },
  { name: 'Chocolatey', logo: '/icons/chocolatey.webp', desc: 'The package manager for Windows' },
  { name: 'Miniconda', logo: '/icons/miniconda.svg', desc: 'Minimal conda installer for Python environments' },
  { name: 'Git', logo: '/icons/github.svg', desc: 'Distributed version control system' },
  { name: 'GitHub Desktop', logo: '/icons/github-desktop.svg', desc: 'Visual Git client with intuitive GUI' },
  { name: 'Kubernetes CLI', logo: '/icons/kubernetes.webp', desc: 'kubectl for controlling K8s clusters' },
  { name: 'Helm', logo: '/icons/helm.svg', desc: 'The package manager for Kubernetes' },
  { name: 'Istio', logo: '/icons/istio.svg', desc: 'Service mesh CLI for traffic management' },
  { name: 'AWS CLI', logo: '/icons/aws.webp', desc: 'Command-line interface for Amazon Web Services' },
  { name: 'Azure CLI', logo: '/icons/azure.webp', desc: 'Command-line interface for Microsoft Azure' },
  { name: 'VS Code', logo: '/icons/vscode.webp', desc: 'Lightweight but powerful code editor' },
  { name: 'IntelliJ IDEA', logo: '/icons/intellij.webp', desc: 'Professional IDE for Java and Kotlin development' },
  { name: 'Notepad++', logo: '/icons/notepadpp.webp', desc: 'Free source code editor and Notepad replacement' },
  { name: 'Postman', logo: '/icons/postman.svg', desc: 'API platform for building, testing, and documenting APIs' },
]

const steps = [
  { num: '1', icon: FiDownload, title: 'Download & Run', desc: 'Download the lightweight .exe installer and run it. No setup wizard needed.' },
  { num: '2', icon: FiList, title: 'Select & Install', desc: 'Pick the tools and versions you need, then click Install.' },
  { num: '3', icon: FiMonitor, title: 'Start Coding', desc: 'All tools are installed with correct PATH. Open a terminal and start coding.' },
]

export default function Product() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash])

  return (
    <>
      <SEO
        title="Features & Supported Tools — DevTools Installer | Java, Node.js, Python & 20+ Tools"
        description="Explore all features of DevTools Installer: one-click setup, automatic PATH configuration, setup bundles, clean uninstall, and 20+ supported developer tools including Java, Node.js, Python, Maven, Git, VS Code."
        keywords="DevTools Installer features, supported developer tools, one-click install Windows, automatic PATH configuration, Java installer, Node.js setup, Python installer, Maven setup, Git installer, VS Code installer, developer tool bundles, clean uninstall developer tools"
        path="/product"
        jsonLd={[
          buildBreadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Product', url: '/product' },
          ]),
          buildSoftwareApplicationJsonLd({
            description:
              'Free one-click installer for Java, Node.js, Python, Maven, Git, VS Code and 20+ developer tools on Windows. Automatic PATH configuration, setup bundles, and clean uninstall.',
          }),
        ]}
      />

      {/* Header */}
      <section className="pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Features &amp; Supported Developer Tools</h1>
          <p className="text-lg text-gray-400">
            Everything you need to set up a professional development environment on Windows.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-dark-card border border-dark-border rounded-2xl p-7 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                <f.icon className="w-8 h-8 text-primary-light mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 bg-dark-lighter/50" id="tools">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Included Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((t) => (
              <div key={t.name} className="flex items-start gap-4 bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300">
                <img src={t.logo} alt={t.name} width={32} height={32} className="w-8 h-8 shrink-0 mt-0.5 object-contain" loading="lazy" />
                <div>
                  <h3 className="font-semibold text-white">{t.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16" id="how-it-works">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="relative bg-dark-card border border-dark-border rounded-2xl p-8 text-center hover:border-primary/40 transition-all duration-300">
                <div className="mx-auto w-12 h-12 mb-5 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/25">
                  {s.num}
                </div>
                <s.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
