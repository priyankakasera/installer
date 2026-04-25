import toolGuides from './toolGuides'

export const guideCategories = [
  {
    id: 'java-guides',
    name: 'Java',
    description: 'Conceptual tutorials and deep dives into the Java ecosystem.',
    articles: [
      {
        title: 'Java 26 New Features',
        slug: 'java-26-new-features',
        description: 'Explore the latest features in Java 26, including HTTP/3 support, Lazy Constants, and performance boosts for G1 GC.',
        readTime: '15 min read',
        type: 'article',
        keywords: ['java 26', 'jdk 26', 'http/3', 'http3', 'lazy constants', 'jep 526', 'structured concurrency', 'primitive patterns', 'g1 gc', 'jep']
      },
      {
        title: 'What Is JAVA_HOME?',
        slug: 'java-home-explained',
        description: 'Why Maven and Gradle need JAVA_HOME separate from PATH, and how to set it correctly on Windows.',
        readTime: '10 min read',
        type: 'article',
        keywords: ['java_home', 'jdk path', 'maven', 'gradle', 'windows variables', 'set java_home', 'path variable']
      }
    ]
  },

  {
    id: 'installations',
    name: 'Installation Guides',
    description: 'Step-by-step setup guides for 20+ developer tools on Windows.',
    articles: toolGuides.filter(t => !t.hidden).map(tool => ({
      title: tool.name,
      slug: tool.id,
      description: tool.description,
      readTime: '5 min read',
      type: 'tool',
      toolCategory: tool.category || 'Other Tools',
      versions: tool.versions || []
    }))
  },
  {
      id: 'general',
      name: 'Windows Internals',
      description: 'Reference articles for Windows environment configuration.',
      articles: [
        {
          title: 'Windows PATH Explained',
          slug: 'windows-path-explained',
          description: 'Master the PATH environment variable and fix "command not found" errors.',
          readTime: '8 min read',
          type: 'article',
          keywords: ['windows path', 'environment variables', 'cmd', 'powershell', 'terminal error', 'command not found']
        },
        {
          title: 'Silent Install on Windows',
          slug: 'windows-silent-install',
          description: 'How to automate software installations using MSI, NSIS, and Inno Setup flags.',
          readTime: '12 min read',
          type: 'article',
          keywords: ['silent install', 'msi', 'nsis', 'inno setup', 'unattended install', 'automation', 'cli install']
        }
      ]
  }
]

export const findArticleBySlug = (slug) => {
  for (const cat of guideCategories) {
    const article = cat.articles.find(a => a.slug === slug)
    if (article) return { ...article, category: cat.name }
  }
  return null
}
