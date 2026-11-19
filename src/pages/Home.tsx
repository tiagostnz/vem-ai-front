import { ChamadaFinal } from '../components/home/ChamadaFinal'
import { ComoFunciona } from '../components/home/ComoFunciona'
import { Hero } from '../components/home/Hero'
import { Publicos } from '../components/home/Publicos'
import { useTitulo } from '../hooks/useTitulo'

export function Home() {
  useTitulo('Início')

  return (
    <>
      <Hero />
      <ComoFunciona />
      <Publicos />
      <ChamadaFinal />
    </>
  )
}
