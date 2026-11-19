import { IconePin, IconeRelogio, IconeWhatsapp } from '../components/icones'
import { FormularioRastreio } from '../components/rastreio/FormularioRastreio'
import { CabecalhoPagina } from '../components/ui/CabecalhoPagina'
import { Container } from '../components/ui/Container'
import { useTitulo } from '../hooks/useTitulo'

const PASSOS = [
  {
    titulo: 'Acompanhe as paradas',
    texto: 'Veja quantas entregas faltam antes da sua, sem precisar instalar nada.',
    icone: IconeRelogio,
  },
  {
    titulo: 'Receba o aviso',
    texto: 'Quando faltarem 3 paradas ou menos, o link chega no seu WhatsApp.',
    icone: IconeWhatsapp,
  },
  {
    titulo: 'Veja o entregador no mapa',
    texto: 'Perto da sua vez, o mapa mostra onde o entregador está agora.',
    icone: IconePin,
  },
]

/** Página pública: o cidadão chega aqui sem link e digita o código. */
export function Rastreio() {
  useTitulo('Rastrear encomenda')

  return (
    <>
      <CabecalhoPagina
        etiqueta="Rastreio"
        titulo="Onde está a minha encomenda?"
        descricao="Digite o código que veio na mensagem ou no comprovante da loja."
      >
        <div className="mt-8 max-w-xl">
          <FormularioRastreio />
        </div>
      </CabecalhoPagina>

      <Container className="py-14">
        <h2 className="text-2xl font-extrabold">Como funciona</h2>
        <ol className="mt-6 grid gap-5 md:grid-cols-3">
          {PASSOS.map(({ titulo, texto, icone: Icone }, indice) => (
            <li key={titulo} className="rounded-3xl bg-white p-6 ring-1 ring-asfalto-200">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-marca-50 text-marca-700">
                  <Icone className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold text-asfalto-500">Passo {indice + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{titulo}</h3>
              <p className="mt-1 text-asfalto-500">{texto}</p>
            </li>
          ))}
        </ol>
      </Container>
    </>
  )
}