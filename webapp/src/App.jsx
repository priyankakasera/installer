import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

import GuidesLayout from './components/GuidesLayout'
import GuideDispatcher from './pages/GuideDispatcher'

const Product = lazy(() => import('./pages/Product'))
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
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-[#0d1117]" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/product" element={<Product />} />
          <Route path="/guides" element={<GuidesLayout />}>
            <Route index element={<Navigate to="/guides/java-guides" replace />} />
            <Route path=":slug" element={<GuideDispatcher />} />
          </Route>
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
