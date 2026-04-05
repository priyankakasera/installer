import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const Product = lazy(() => import('./pages/Product'))
const Guides = lazy(() => import('./pages/Guides'))
const ToolGuide = lazy(() => import('./pages/ToolGuide'))
const WindowsPathGuide = lazy(() => import('./pages/WindowsPathGuide'))
const DataFacting = lazy(() => import('./pages/DataFacting'))
const Support = lazy(() => import('./pages/Support'))
const Authors = lazy(() => import('./pages/Authors'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/windows-path-explained" element={<WindowsPathGuide />} />
          <Route path="/guides/:toolId" element={<ToolGuide />} />
          <Route path="/data-practices" element={<DataFacting />} />
          <Route path="/support" element={<Support />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
