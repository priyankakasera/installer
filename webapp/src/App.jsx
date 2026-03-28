import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Product from './pages/Product'
import Guides from './pages/Guides'
import ToolGuide from './pages/ToolGuide'
import Support from './pages/Support'
import Authors from './pages/Authors'
import Privacy from './pages/Privacy'

export default function App() {
  return (
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
  )
}
