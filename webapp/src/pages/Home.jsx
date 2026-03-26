import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import WhyChoose from '../components/WhyChoose'
import IncludedTools from '../components/IncludedTools'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>DevTools Installer — One-Click Dev Environment Setup</title>
        <meta
          name="description"
          content="Set up your development environment in one click. Install Java, Maven, Node.js, Python, Git and more with automatic PATH configuration."
        />
      </Helmet>
      <Hero />
      <WhyChoose />
      <IncludedTools />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  )
}
