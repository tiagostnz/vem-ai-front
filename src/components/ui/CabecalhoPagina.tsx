import type { ReactNode } from 'react'
import { Container } from './Container'

type CabecalhoPaginaProps = {
  etiqueta: string
  titulo: string
  descricao?: ReactNode
  children?: ReactNode
}

/** Faixa de abertura usada no topo das páginas internas. */
export function CabecalhoPagina({ etiqueta, titulo, descricao, children }: CabecalhoPaginaProps) {
  return (
    <section className="border-b border-asfalto-200 bg-white">
      <Container className="animate-surgir py-12 md:py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-marca-700">{etiqueta}</p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-balance md:text-5xl">
          {titulo}
        </h1>
        {descricao && <p className="mt-4 max-w-2xl text-lg text-asfalto-500">{descricao}</p>}
        {children}
      </Container>
    </section>
  )
}
