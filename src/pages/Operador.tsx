import { useMemo, useState } from 'react'
import { CardLote } from '../components/operador/CardLote'
import { FormularioNovoLote } from '../components/operador/FormularioNovoLote'
import { FiltroStatus, type FiltroLote } from '../components/operador/FiltroStatus'
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
    listaCentros: centros,
    listaEntregadores: entregadores,
    centros: indexarPor(centros, (c) => c.cdCentro),
    entregadores: indexarPor(entregadores, (e) => e.cdEntregador),
  }
}

export function Operador() {
  useTitulo('Painel do operador')
  const { dados, carregando, erro, recarregar } = useApi(carregarPainel)
  const [filtro, setFiltro] = useState<FiltroLote>('TODOS')

  const contagem = useMemo(() => {
    const total: Record<FiltroLote, number> = { TODOS: 0, MONTAGEM: 0, EM_ROTA: 0, CONCLUIDO: 0 }
    for (const lote of dados?.lotes ?? []) {
      total.TODOS++
      total[lote.status]++
    }
    return total
  }, [dados])

  const lotesFiltrados = (dados?.lotes ?? []).filter((lote) => filtro === 'TODOS' || lote.status === filtro)

  return (
    <>
      <CabecalhoPagina
        etiqueta="Operador do CD"
        titulo="Painel de lotes"
        descricao="Monte os pacotões por região, bipe as encomendas e acompanhe o que já saiu para a rua."
      />

      <Container className="grid gap-8 py-12 lg:grid-cols-[340px_1fr] lg:items-start">
        <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-asfalto-200 lg:sticky lg:top-24">
          {dados ? (
            <FormularioNovoLote
              centros={dados.listaCentros}
              entregadores={dados.listaEntregadores}
              aoCriar={recarregar}
            />
          ) : (
            <p className="text-sm text-asfalto-500">O formulário aparece quando os dados carregarem.</p>
          )}
        </aside>

        <section aria-label="Lista de lotes">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-extrabold">Lotes</h2>
            {dados && <FiltroStatus valor={filtro} contagem={contagem} aoMudar={setFiltro} />}
          </div>

          {carregando && <Carregando mensagem="Buscando lotes na API…" />}
          {erro && <EstadoErro mensagem={erro} aoTentarDeNovo={recarregar} />}
          {dados && dados.lotes.length === 0 && (
            <EstadoVazio
              titulo="Nenhum lote ainda"
              descricao="Crie o primeiro pacotão para começar a bipar encomendas."
            />
          )}
          {dados && dados.lotes.length > 0 && lotesFiltrados.length === 0 && (
            <EstadoVazio titulo="Nenhum lote com esse status" descricao="Escolha outro filtro para ver mais lotes." />
          )}
          {dados && lotesFiltrados.length > 0 && (
            <ul className="grid gap-5 md:grid-cols-2">
              {lotesFiltrados.map((lote) => (
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
        </section>
      </Container>
    </>
  )
}
