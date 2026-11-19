import { Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { NaoEncontrada } from './pages/NaoEncontrada'
import { Sobre } from './pages/Sobre'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  )
}

export default App
