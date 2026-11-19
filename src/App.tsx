import { Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import { Faq } from './pages/Faq'
import { Home } from './pages/Home'
import { IntegranteDetalhe } from './pages/IntegranteDetalhe'
import { Integrantes } from './pages/Integrantes'
import { NaoEncontrada } from './pages/NaoEncontrada'
import { Sobre } from './pages/Sobre'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="integrantes" element={<Integrantes />} />
        <Route path="integrantes/:slug" element={<IntegranteDetalhe />} />
        <Route path="faq" element={<Faq />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  )
}

export default App
