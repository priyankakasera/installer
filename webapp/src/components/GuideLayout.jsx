import { Link } from 'react-router-dom'
import { FiCalendar, FiArrowLeft, FiClock } from 'react-icons/fi'
import SEO from './SEO'

export default function GuideLayout({ 
  children, 
  title, 
  description, 
  keywords, 
  path, 
  jsonLd, 
  author = "Vishal Hulawale",
  authorSlug = "vishalhulawale",
  publishDate = "April 2026",
  readTime = "12 min read"
}) {
  return (
    <div className="guide-light min-h-screen">
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        path={path}
        jsonLd={jsonLd}
      />

      <article className="pt-16 pb-24">
        {/* Progress bar container (sticky) */}
        <div className="fixed top-16 left-0 w-full h-1 z-40">
            <div className="h-full bg-primary" style={{ width: '0%' }}></div>
        </div>

        <div className="max-w-screen-md mx-auto px-6 lg:px-8">
          {/* Header */}
          <header className="mb-12">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link to="/guides" className="hover:text-primary transition-colors flex items-center gap-1">
                <FiArrowLeft className="w-3 h-3" />
                Back to Guides
              </Link>
            </nav>

            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-[1.15]">
              {title.split(' — ')[0]}
            </h1>

            <div className="flex items-center gap-4 py-6 border-y border-gray-200 mb-10">
              <img 
                src={`/avatars/${authorSlug === 'vishalhulawale' ? 'vh' : 'pk'}.svg`} 
                alt={author}
                className="w-12 h-12 rounded-full bg-primary/10 border border-gray-100"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Link to={`/authors/${authorSlug}`} className="font-semibold text-gray-900 hover:underline">
                    {author}
                  </Link>
                  <span className="text-gray-400">·</span>
                  <button className="text-primary text-sm font-medium hover:text-primary-dark">Follow</button>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-3.5 h-3.5" />
                    {publishDate}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <FiClock className="w-3.5 h-3.5" />
                    {readTime}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="prose prose-lg">
            {children}
          </div>

          {/* Footer of article */}
          <footer className="mt-20 pt-10 border-t border-gray-200">
             <div className="flex flex-wrap gap-2 mb-10">
                {['Java', 'Programming', 'Backend', 'Software Engineering'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {tag}
                    </span>
                ))}
             </div>
             
             <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <h3 className="text-lg font-bold mb-2 text-gray-900">Enjoyed this guide?</h3>
                <p className="text-gray-600 text-sm mb-6">
                    Stay updated with the latest developer tools and Windows configuration tips.
                </p>
                <div className="flex justify-center gap-3">
                    <button className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-black transition-colors">
                        Share on Twitter
                    </button>
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                        Copy link
                    </button>
                </div>
             </div>
          </footer>
        </div>
      </article>
    </div>
  )
}
