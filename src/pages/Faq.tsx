import { useState } from 'react'
import { Link } from 'react-router'
import { ItemFaq } from '../components/faq/ItemFaq'
import { CabecalhoPagina } from '../components/ui/CabecalhoPagina'
import { Container } from '../components/ui/Container'
import { PERGUNTAS } from '../data/faq'
import { useTitulo } from '../hooks/useTitulo'

export function Faq() {
  useTitulo('Perguntas frequentes')
  // só uma resposta aberta por vez; null = todas fechadas
  const [abertoId, setAbertoId] = useState<string | null>(PERGUNTAS[0].id)

  return (
    <>
      <CabecalhoPagina
        etiqueta="FAQ"
        titulo="Perguntas frequentes"
        descricao="O que as pessoas mais querem saber sobre o aviso, o mapa e o pacotão."
      />
      <Container className="max-w-3xl py-16">
        <ul className="flex flex-col gap-3">
          {PERGUNTAS.map((item) => (
            <ItemFaq
              key={item.id}
              item={item}
              aberto={abertoId === item.id}
              aoAlternar={() => setAbertoId((atual) => (atual === item.id ? null : item.id))}
            />
          ))}
        </ul>
        <p className="mt-10 text-center text-asfalto-500">
          Não achou o que procurava?{' '}
          <Link to="/contato" className="rounded font-semibold text-marca-700 underline underline-offset-4">
            Fale com a gente
          </Link>
        </p>
      </Container>
    </>
  )
}
