import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Product from './pages/Product'
import DataFacting from './pages/DataFacting'
import Support from './pages/Support'
import Authors from './pages/Authors'
import Privacy from './pages/Privacy'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/data-facting" element={<DataFacting />} />
        <Route path="/support" element={<Support />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/privacy" element={<Privacy />} />
      </Route>
    </Routes>
  )
}
