import { CardIntegrante } from '../components/integrantes/CardIntegrante'
import { CabecalhoPagina } from '../components/ui/CabecalhoPagina'
import { Container } from '../components/ui/Container'
import { INTEGRANTES } from '../data/integrantes'
import { useTitulo } from '../hooks/useTitulo'

export function Integrantes() {
  useTitulo('Integrantes')

  return (
    <>
      <CabecalhoPagina
        etiqueta="Equipe"
        titulo="Quem fez o Vem Aí"
        descricao="Cinco estudantes da turma 1TDSPJ da FIAP."
      />
      <Container className="py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {INTEGRANTES.map((integrante) => (
            <li key={integrante.slug} className="flex">
              <CardIntegrante integrante={integrante} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
