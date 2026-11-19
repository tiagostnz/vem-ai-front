import { Hero } from '../components/home/Hero'
import { useTitulo } from '../hooks/useTitulo'

export function Home() {
  useTitulo('Início')

  return (
    <>
      <Hero />
    </>
  )
}
