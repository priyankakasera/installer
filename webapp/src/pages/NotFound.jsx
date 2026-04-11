import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found — DevTools Installer"
        description="This page does not exist. Browse our developer tool installation guides or return to the home page."
        path="/404"
        noindex
      />

      <section className="pt-28 pb-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <p className="text-7xl font-extrabold text-primary-light mb-4">404</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 px-6 py-3 bg-dark-card border border-dark-border text-white font-medium rounded-xl hover:border-primary/40 transition-all"
            >
              Browse Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
