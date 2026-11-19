import type { ReactNode } from 'react'
import { IconeCaixa, IconeMoto, IconeQr, IconeWhatsapp } from '../icones'
import { Container } from '../ui/Container'

type Passo = {
  titulo: string
  texto: string
  icone: ReactNode
}

const PASSOS: Passo[] = [
  {
    titulo: 'Pacotão no CD',
    texto: 'O operador bipa as encomendas e junta até 20 da mesma região num lote com QR code.',
    icone: <IconeCaixa className="h-7 w-7" />,
  },
  {
    titulo: 'Um QR, vinte encomendas',
    texto: 'O entregador lê o QR e todas entram “em rota” de uma vez, já na melhor ordem de paradas.',
    icone: <IconeQr className="h-7 w-7" />,
  },
  {
    titulo: 'A rota se recalcula',
    texto: 'A cada entrega concluída, o sistema atualiza quantas paradas faltam para cada cliente.',
    icone: <IconeMoto className="h-7 w-7" />,
  },
  {
    titulo: 'Aviso na hora certa',
    texto: 'Faltando 2 ou 3 paradas, o cliente recebe o link do mapa com o entregador ao vivo.',
    icone: <IconeWhatsapp className="h-7 w-7" />,
  },
]

export function ComoFunciona() {
  return (
    <section aria-labelledby="como-funciona" className="py-20">
      <Container>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-marca-700">Como funciona</p>
        <h2 id="como-funciona" className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          Do centro de distribuição até a sua porta, em quatro paradas
        </h2>

        <ol className="relative mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* a "estrada" que liga os passos no desktop */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-8 hidden h-1 bg-[repeating-linear-gradient(90deg,var(--color-asfalto-200)_0_16px,transparent_16px_28px)] lg:block"
          />
          {PASSOS.map((passo, indice) => (
            <li key={passo.titulo} className="relative">
              <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-asfalto-900 text-marca-500 shadow-lg">
                {passo.icone}
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-marca-700 text-sm font-bold text-white">
                  {indice + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold">{passo.titulo}</h3>
              <p className="mt-2 text-asfalto-500">{passo.texto}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
