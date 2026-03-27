import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Hero from '../components/Hero'
import WhyChoose from '../components/WhyChoose'
import IncludedTools from '../components/IncludedTools'
import HowItWorks from '../components/HowItWorks'
import BehindTheScenes from '../components/BehindTheScenes'
import UnknownPublisher from '../components/UnknownPublisher'

function Divider() {
  return <hr className="section-divider" />
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          DevTools Installer — Install Java, Node.js, Python &amp; More in One
          Click | Free Windows Setup Tool
        </title>
        <meta
          name="description"
          content="Free one-click installer for Java, Node.js, Python, Maven, Git, Docker, VS Code and 16+ developer tools on Windows. Automatic PATH configuration, setup bundles, and clean uninstall. No manual setup required."
        />
        <meta
          name="keywords"
          content="how to install Java, setup Node.js, install Python Windows, one-click developer setup, setup bundle, cleanup Java, uninstall developer tools, install Maven, install Git Windows, configure PATH automatically, developer environment setup, install Docker Windows, free dev tools installer"
        />
        <link rel="canonical" href="https://devtools-installer.web.app/" />
      </Helmet>
      <Hero />
      <Divider />
      <IncludedTools />
      <Divider />
      <WhyChoose />
      <Divider />
      <HowItWorks />
      <Divider />
      <BehindTheScenes />
      <Divider />
      <UnknownPublisher />

      {/* Guides teaser */}
      <Divider />
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label">Documentation</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-4">
            Per-Tool Installation Guides
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Need to install a specific tool manually? Browse our detailed guides
            covering download sources, PATH configuration, environment
            variables, and verification steps for all 16 tools.
          </p>
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 px-6 py-3 bg-dark-card border border-dark-border rounded-xl text-white font-medium hover:border-primary/40 transition-all duration-200"
          >
            Browse All Guides
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
