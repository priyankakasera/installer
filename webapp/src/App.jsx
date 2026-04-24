import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const Product = lazy(() => import('./pages/Product'))
const Guides = lazy(() => import('./pages/Guides'))
const ToolGuide = lazy(() => import('./pages/ToolGuide'))
const WindowsPathGuide = lazy(() => import('./pages/WindowsPathGuide'))
const JavaHomeExplained = lazy(() => import('./pages/JavaHomeExplained'))
const Java26Features = lazy(() => import('./pages/Java26Features'))
const SilentInstallGuide = lazy(() => import('./pages/SilentInstallGuide'))
const AuthorProfile = lazy(() => import('./pages/AuthorProfile'))
const DataFacting = lazy(() => import('./pages/DataFacting'))
const Support = lazy(() => import('./pages/Support'))
const Authors = lazy(() => import('./pages/Authors'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
const Disclaimer = lazy(() => import('./pages/Disclaimer'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/windows-path-explained" element={<WindowsPathGuide />} />
          <Route path="/guides/java-home-explained" element={<JavaHomeExplained />} />
          <Route path="/guides/java-26-new-features" element={<Java26Features />} />
          <Route path="/guides/windows-silent-install" element={<SilentInstallGuide />} />
          <Route path="/guides/:toolId" element={<ToolGuide />} />
          <Route path="/data-practices" element={<DataFacting />} />
          <Route path="/support" element={<Support />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:slug" element={<AuthorProfile />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
