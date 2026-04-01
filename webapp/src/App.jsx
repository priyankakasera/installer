import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const Product = lazy(() => import('./pages/Product'))
const Guides = lazy(() => import('./pages/Guides'))
const ToolGuide = lazy(() => import('./pages/ToolGuide'))
const Support = lazy(() => import('./pages/Support'))
const Authors = lazy(() => import('./pages/Authors'))
const Privacy = lazy(() => import('./pages/Privacy'))

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:toolId" element={<ToolGuide />} />
          <Route path="/support" element={<Support />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
