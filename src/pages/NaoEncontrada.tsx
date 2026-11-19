import { Link } from 'react-router'
import { IconePin } from '../components/icones'
import { Container } from '../components/ui/Container'
import { useTitulo } from '../hooks/useTitulo'

export function NaoEncontrada() {
  useTitulo('Página não encontrada')

  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <div className="relative">
        <p className="font-display text-[8rem] leading-none font-extrabold text-asfalto-200 md:text-[11rem]">404</p>
        <IconePin className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-marca-700" />
      </div>
      <h1 className="mt-4 text-3xl font-extrabold">Endereço não encontrado</h1>
      <p className="mt-3 max-w-md text-lg text-asfalto-500">
        Parece que essa parada não existe na rota. Confira o link ou volte para o início.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-marca-700 px-6 font-semibold text-white hover:bg-marca-800"
        >
          Voltar ao início
        </Link>
        <Link
          to="/rastreio"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-asfalto-900 px-6 font-semibold hover:bg-asfalto-100"
        >
          Rastrear encomenda
        </Link>
      </div>
    </Container>
  )
}
