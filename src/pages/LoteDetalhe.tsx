import { Link, useParams } from 'react-router'
import { CardEncomenda } from '../components/encomenda/CardEncomenda'
import { Carregando } from '../components/ui/Carregando'
import { Container } from '../components/ui/Container'
import { EstadoErro } from '../components/ui/EstadoErro'
import { EstadoVazio } from '../components/ui/EstadoVazio'
import { StatusBadge } from '../components/ui/StatusBadge'
import { useApi } from '../hooks/useApi'
import { useTitulo } from '../hooks/useTitulo'
import { listarCentros, listarClientes, listarEntregadores } from '../services/cadastroService'
import { buscarLote, listarEncomendasDoLote } from '../services/loteService'
import { formatarDataHora, indexarPor } from '../utils/formatar'

const LIMITE_LOTE = 20

async function carregarLote(id: number) {
  const [lote, encomendas, clientes, centros, entregadores] = await Promise.all([
    buscarLote(id),
    listarEncomendasDoLote(id),
    listarClientes(),
    listarCentros(),
    listarEntregadores(),
  ])
  // ordem da rota primeiro; as sem posição (ainda no CD) vão para o fim
  const ordenadas = [...encomendas].sort((a, b) => (a.nrPosicaoRota ?? 999) - (b.nrPosicaoRota ?? 999))
  return {
    lote,
    encomendas: ordenadas,
    clientes: indexarPor(clientes, (c) => c.cdCliente),
    centro: centros.find((c) => c.cdCentro === lote.cdCentro),
    entregador: entregadores.find((e) => e.cdEntregador === lote.cdEntregador),
  }
}

export function LoteDetalhe() {
  const { id } = useParams<{ id: string }>()
  const idLote = Number(id)
  useTitulo(`Lote #${id}`)
  const { dados, carregando, erro, recarregar } = useApi(() => carregarLote(idLote), [idLote])

  const entregues = dados?.encomendas.filter((e) => e.status === 'ENTREGUE').length ?? 0

  return (
    <Container className="py-10 md:py-14">
      <Link to="/operador" className="inline-block rounded text-sm font-semibold text-marca-700 hover:underline">
        ← Voltar ao painel
      </Link>

      {carregando && !dados && <Carregando mensagem="Abrindo o lote…" />}
      {erro && (
        <div className="mt-6">
          <EstadoErro mensagem={erro} aoTentarDeNovo={recarregar} />
        </div>
      )}

      {dados && (
        <div className="mt-6 grid animate-surgir gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
          <aside className="flex flex-col gap-5 rounded-3xl bg-asfalto-900 p-6 text-white lg:sticky lg:top-24">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-asfalto-200">Lote #{dados.lote.cdLote}</p>
                <h1 className="font-mono text-2xl font-bold">{dados.lote.codigoQr}</h1>
              </div>
              <StatusBadge status={dados.lote.status} />
            </div>

            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-asfalto-200">Centro</dt>
                <dd className="font-semibold">{dados.centro?.nmCentro ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-asfalto-200">Entregador</dt>
                <dd className="font-semibold">{dados.entregador?.nmEntregador ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-asfalto-200">Criado</dt>
                <dd className="font-semibold">{formatarDataHora(dados.lote.dtCriacao)}</dd>
              </div>
              <div>
                <dt className="text-asfalto-200">Saiu para rota</dt>
                <dd className="font-semibold">{formatarDataHora(dados.lote.dtInicioRota)}</dd>
              </div>
            </dl>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-asfalto-200">Ocupação do pacotão</span>
                <span className="font-semibold">
                  {dados.encomendas.length}/{LIMITE_LOTE}
                </span>
              </div>
              <div
                className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label="Ocupação do lote"
                aria-valuemin={0}
                aria-valuemax={LIMITE_LOTE}
                aria-valuenow={dados.encomendas.length}
              >
                <div
                  className="h-full rounded-full bg-marca-500"
                  style={{ width: `${(dados.encomendas.length / LIMITE_LOTE) * 100}%` }}
                />
              </div>
              {dados.lote.status !== 'MONTAGEM' && (
                <p className="mt-3 text-sm text-asfalto-200">
                  {entregues} de {dados.encomendas.length} entregues
                </p>
              )}
            </div>
          </aside>

          <section aria-labelledby="titulo-encomendas">
            <h2 id="titulo-encomendas" className="mb-5 text-2xl font-extrabold">
              Encomendas {dados.lote.status === 'MONTAGEM' ? 'no pacotão' : 'na ordem da rota'}
            </h2>
            {dados.encomendas.length === 0 ? (
              <EstadoVazio
                titulo="Lote vazio"
                descricao="Bipe encomendas no painel. Elas entram neste lote se forem da região do entregador."
              />
            ) : (
              <ul className="flex flex-col gap-3">
                {dados.encomendas.map((encomenda) => {
                  const cliente = dados.clientes.get(encomenda.cdCliente)
                  return (
                    <li key={encomenda.cdEncomenda}>
                      <CardEncomenda
                        codigoRastreio={encomenda.codigoRastreio}
                        status={encomenda.status}
                        nomeCliente={cliente?.nmCliente ?? `Cliente #${encomenda.cdCliente}`}
                        endereco={cliente?.dsEndereco ?? 'Endereço indisponível'}
                        posicao={encomenda.nrPosicaoRota}
                      />
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        </div>
      )}
    </Container>
  )
}
