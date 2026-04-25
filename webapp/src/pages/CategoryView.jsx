import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FiClock, FiArrowRight, FiSearch } from 'react-icons/fi'
import { guideCategories } from '../config/guidesData'
import SEO from '../components/SEO'

export default function CategoryView() {
  const params = useParams()
  const id = params.slug || params.categoryId
  const category = guideCategories.find(c => c.id === id)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setSearchQuery('')
  }, [id])

  if (!category) {
    return (
      <div className="p-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Category not found</h1>
        <Link to="/guides/java-guides" className="text-primary hover:underline mt-4 inline-block">Back to guides</Link>
      </div>
    )
  }

  const filteredArticles = category.articles.filter(article => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return true

    const titleMatch = article.title.toLowerCase().includes(query)
    const descMatch = article.description.toLowerCase().includes(query)
    
    // Match against keywords array
    const keywordMatch = article.keywords?.some(kw => kw.toLowerCase().includes(query))
    
    // Match against versions (for tools)
    const versionMatch = article.versions?.some(v => v.toLowerCase().includes(query))
    
    // Match against tool category
    const toolCategoryMatch = article.toolCategory?.toLowerCase().includes(query)

    return titleMatch || descMatch || keywordMatch || versionMatch || toolCategoryMatch
  })

  const renderCard = (article) => (
    <Link
      key={article.slug}
      to={`/guides/${article.slug}`}
      className="group flex flex-col justify-between p-5 bg-white dark:bg-[#121a16] border border-gray-200 dark:border-gray-800 rounded-xl hover:border-primary dark:hover:border-primary hover:shadow-md transition-all h-full"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-1">
            {article.title}
          </h3>
          <FiArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
          {article.description}
        </p>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
        {article.type === 'tool' ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-1.5">
              {article.versions?.map((v) => (
                <span key={v} className="px-2 py-0.5 text-[10px] font-medium border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                  {v}
                </span>
              ))}
            </div>
            {(!article.versions || article.versions.length === 0) && (
              <span className="self-start px-2 py-0.5 text-[10px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded">Setup Guide</span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
            <FiClock className="w-3.5 h-3.5" />
            {article.readTime}
          </div>
        )}
      </div>
    </Link>
  )

  let content;
  if (category.id === 'installations') {
    const grouped = filteredArticles.reduce((acc, article) => {
      const cat = article.toolCategory || 'Other Tools';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(article);
      return acc;
    }, {});

    const orderedCategories = ['Core Runtimes', 'Package Managers', 'Version Control', 'Other Tools'];
    Object.keys(grouped).forEach(k => {
      if (!orderedCategories.includes(k)) orderedCategories.push(k);
    });

    content = orderedCategories.map(catName => {
      if (!grouped[catName] || grouped[catName].length === 0) return null;
      return (
        <div key={catName} className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{catName}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {grouped[catName].map(renderCard)}
          </div>
        </div>
      )
    })
  } else {
    content = (
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map(renderCard)}
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#0a0f0d] min-h-full">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:px-12">
        <SEO
          title={`${category.name} Guides — DevTools Installer`}
          description={category.description}
          path={`/guides/${category.id}`}
        />

        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{category.name}</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">{category.description}</p>
            </div>
            <div className="relative w-full md:w-72 shrink-0">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-[#121a16] border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>
        </header>

        {filteredArticles.length === 0 ? (
          <div className="py-20 text-center bg-gray-50 dark:bg-[#121a16] rounded-3xl border border-dashed border-gray-300 dark:border-gray-800">
            <p className="text-gray-400 font-medium">No guides found matching your search.</p>
          </div>
        ) : content}
      </div>
    </div>
  )
}
