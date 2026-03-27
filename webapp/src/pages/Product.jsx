import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
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
  { name: 'Java (JDK)', logo: '/icons/java.png', desc: 'Oracle JDK & Adoptium Temurin — multiple versions' },
  { name: 'Node.js', logo: '/icons/nodejs.svg', desc: 'JavaScript runtime — LTS and Current releases' },
  { name: 'Python', logo: '/icons/python.svg', desc: 'Python 3.x with pip and Scripts in PATH' },
  { name: 'Maven', logo: '/icons/maven.svg', desc: 'Build automation for Java projects' },
  { name: 'Gradle', logo: '/icons/gradle.svg', desc: 'Multi-language build automation tool' },
  { name: 'Yarn', logo: '/icons/yarn.svg', desc: 'Fast dependency management for Node.js' },
  { name: 'Chocolatey', logo: '/icons/chocolatey.png', desc: 'The package manager for Windows' },
  { name: 'Git', logo: '/icons/github.svg', desc: 'Distributed version control system' },
  { name: 'Docker Desktop', logo: '/icons/docker.svg', desc: 'Container platform with Engine, CLI, and Compose' },
  { name: 'Kubernetes CLI', logo: '/icons/kubernetes.png', desc: 'kubectl for controlling K8s clusters' },
  { name: 'AWS CLI', logo: '/icons/aws.jpeg', desc: 'Command-line interface for Amazon Web Services' },
  { name: 'Azure CLI', logo: '/icons/azure.png', desc: 'Command-line interface for Microsoft Azure' },
  { name: 'VS Code', logo: '/icons/vscode.png', desc: 'Lightweight but powerful code editor' },
  { name: 'IntelliJ IDEA', logo: '/icons/intellij.png', desc: 'Professional IDE for Java and Kotlin development' },
  { name: 'Notepad++', logo: '/icons/notepadpp.png', desc: 'Free source code editor and Notepad replacement' },
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
      <Helmet>
        <title>Product — DevTools Installer</title>
        <meta name="description" content="Explore all features, supported tools, and how the DevTools Installer works." />
      </Helmet>

      {/* Header */}
      <section className="pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Product</h1>
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
                <img src={t.logo} alt={t.name} className="w-8 h-8 shrink-0 mt-0.5 object-contain" />
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
