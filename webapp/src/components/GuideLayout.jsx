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
  readTime = "12 min read",
  isEmbedded = false,
  backTo = null
}) {
  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        path={path}
        jsonLd={jsonLd}
      />

      <div className="bg-white dark:bg-[#0a0f0d] min-h-screen guide-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Header */}
        <header className="mb-12">
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Link
              to={backTo || '/guides/java-guides'}
              className="hover:text-primary transition-colors flex items-center gap-1.5 font-medium"
            >
              <FiArrowLeft className="w-3.5 h-3.5" />
              Back to Guides
            </Link>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-[1.15] text-gray-900 dark:text-white">
            {title.split(' — ')[0]}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mb-6">{description}</p>

          <div className="flex items-center gap-4 py-6 border-y border-gray-200 dark:border-gray-800 mb-10">
            <img 
              src={`/avatars/${authorSlug === 'vishalhulawale' ? 'vh' : 'pk'}.svg`} 
              alt={author}
              className="w-12 h-12 rounded-full bg-primary/10 border border-gray-100 dark:border-gray-800"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link to={`/authors/${authorSlug}`} className="font-semibold text-gray-900 dark:text-white hover:underline">
                  {author}
                </Link>
                <span className="text-gray-400">·</span>
                <button className="text-primary text-sm font-medium hover:text-primary-dark">Follow</button>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
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
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
      </div>
    </>
  )
}
