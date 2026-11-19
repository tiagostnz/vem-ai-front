import { Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import { Contato } from './pages/Contato'
import { Entregador } from './pages/Entregador'
import { Faq } from './pages/Faq'
import { Home } from './pages/Home'
import { IntegranteDetalhe } from './pages/IntegranteDetalhe'
import { Integrantes } from './pages/Integrantes'
import { LoteDetalhe } from './pages/LoteDetalhe'
import { NaoEncontrada } from './pages/NaoEncontrada'
import { Operador } from './pages/Operador'
import { RotaEntregador } from './pages/RotaEntregador'
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
        <Route path="contato" element={<Contato />} />
        <Route path="operador" element={<Operador />} />
        <Route path="operador/lotes/:id" element={<LoteDetalhe />} />
        <Route path="entregador" element={<Entregador />} />
        <Route path="entregador/lotes/:id" element={<RotaEntregador />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  )
}

export default App
