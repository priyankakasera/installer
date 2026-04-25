import { useParams, Navigate } from 'react-router-dom'
import { guideCategories, findArticleBySlug } from '../config/guidesData'
import CategoryView from './CategoryView'
import Java26Features from './Java26Features'
import JavaHomeExplained from './JavaHomeExplained'
import WindowsPathGuide from './WindowsPathGuide'
import SilentInstallGuide from './SilentInstallGuide'
import ToolGuide from './ToolGuide'

// Map article slugs to their custom page components
const articleComponents = {
  'java-26-new-features': Java26Features,
  'java-home-explained': JavaHomeExplained,
  'windows-path-explained': WindowsPathGuide,
  'windows-silent-install': SilentInstallGuide,
}

export default function GuideDispatcher() {
  const { slug } = useParams()

  // 1. Check if slug matches a category id → show category card listing
  const category = guideCategories.find(c => c.id === slug)
  if (category) {
    return <CategoryView />
  }

  // 2. Check if slug matches a custom article component
  const Component = articleComponents[slug]
  if (Component) {
    return <Component isEmbedded={true} />
  }

  // 3. Check if slug matches a tool installation guide in guidesData
  const article = findArticleBySlug(slug)
  if (article && article.type === 'tool') {
    return <ToolGuide toolId={slug} />
  }

  // 4. Default fallback — redirect to Java category
  return <Navigate to="/guides/java-guides" replace />
}
