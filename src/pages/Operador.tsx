import { CardLote } from '../components/operador/CardLote'
import { CabecalhoPagina } from '../components/ui/CabecalhoPagina'
import { Carregando } from '../components/ui/Carregando'
import { Container } from '../components/ui/Container'
import { EstadoErro } from '../components/ui/EstadoErro'
import { EstadoVazio } from '../components/ui/EstadoVazio'
import { useApi } from '../hooks/useApi'
import { useTitulo } from '../hooks/useTitulo'
import { listarCentros, listarEntregadores } from '../services/cadastroService'
import { listarLotes } from '../services/loteService'
import { indexarPor } from '../utils/formatar'

// as três buscas são independentes, então rodam em paralelo
async function carregarPainel() {
  const [lotes, centros, entregadores] = await Promise.all([listarLotes(), listarCentros(), listarEntregadores()])
  return {
    lotes: [...lotes].sort((a, b) => b.cdLote - a.cdLote),
    centros: indexarPor(centros, (c) => c.cdCentro),
    entregadores: indexarPor(entregadores, (e) => e.cdEntregador),
  }
}

export function Operador() {
  useTitulo('Painel do operador')
  const { dados, carregando, erro, recarregar } = useApi(carregarPainel)

  return (
    <>
      <CabecalhoPagina
        etiqueta="Operador do CD"
        titulo="Painel de lotes"
        descricao="Monte os pacotões por região, bipe as encomendas e acompanhe o que já saiu para a rua."
      />

      <Container className="py-12">
        <h2 className="mb-6 text-2xl font-extrabold">Lotes</h2>

        {carregando && <Carregando mensagem="Buscando lotes na API…" />}
        {erro && <EstadoErro mensagem={erro} aoTentarDeNovo={recarregar} />}
        {dados && dados.lotes.length === 0 && (
          <EstadoVazio
            titulo="Nenhum lote ainda"
            descricao="Crie o primeiro pacotão para começar a bipar encomendas."
          />
        )}
        {dados && dados.lotes.length > 0 && (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {dados.lotes.map((lote) => (
              <li key={lote.cdLote}>
                <CardLote
                  lote={lote}
                  nomeCentro={dados.centros.get(lote.cdCentro)?.nmCentro ?? `CD #${lote.cdCentro}`}
                  nomeEntregador={dados.entregadores.get(lote.cdEntregador)?.nmEntregador ?? `#${lote.cdEntregador}`}
                />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  )
}
