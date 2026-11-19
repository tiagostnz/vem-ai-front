import { Link, useParams } from 'react-router'
import { CardEncomenda } from '../components/encomenda/CardEncomenda'
import { Carregando } from '../components/ui/Carregando'
import { Container } from '../components/ui/Container'
import { EstadoErro } from '../components/ui/EstadoErro'
import { EstadoVazio } from '../components/ui/EstadoVazio'
import { StatusBadge } from '../components/ui/StatusBadge'
import { useApi } from '../hooks/useApi'
import { useSessaoEntregador } from '../hooks/useSessaoEntregador'
import { useTitulo } from '../hooks/useTitulo'
import { listarClientes } from '../services/cadastroService'
import { buscarLote, listarEncomendasDoLote } from '../services/loteService'
import { indexarPor } from '../utils/formatar'

async function carregarRota(id: number) {
  const [lote, encomendas, clientes] = await Promise.all([buscarLote(id), listarEncomendasDoLote(id), listarClientes()])
  return {
    lote,
    // a ordem da rota vem da API (nrPosicaoRota), calculada ao ler o QR
    encomendas: [...encomendas].sort((a, b) => (a.nrPosicaoRota ?? 999) - (b.nrPosicaoRota ?? 999)),
    clientes: indexarPor(clientes, (c) => c.cdCliente),
  }
}

/** Tela de rua: uma coluna, alvos de toque grandes, próxima parada sempre em destaque. */
export function RotaEntregador() {
  const { id } = useParams<{ id: string }>()
  const idLote = Number(id)
  useTitulo(`Rota do lote #${id}`)
  const { entregador } = useSessaoEntregador()
  const { dados, carregando, erro, recarregar } = useApi(() => carregarRota(idLote), [idLote])

  if (!entregador) {
    return (
      <Container className="max-w-lg py-14">
        <EstadoVazio
          titulo="Entre para ver sua rota"
          descricao="A lista de paradas só aparece para o entregador logado."
          acao={
            <Link
              to="/entregador"
              className="mt-2 inline-flex min-h-12 items-center rounded-xl bg-marca-700 px-6 font-semibold text-white hover:bg-marca-800"
            >
              Ir para o login
            </Link>
          }
        />
      </Container>
    )
  }

  const pendentes = dados?.encomendas.filter((e) => e.status === 'EM_ROTA') ?? []
  const proxima = pendentes[0]
  const total = dados?.encomendas.length ?? 0
  const feitas = total - pendentes.length

  return (
    <Container className="max-w-2xl py-8">
      <Link to="/entregador" className="inline-block rounded text-sm font-semibold text-marca-700 hover:underline">
        ← Área do entregador
      </Link>

      {carregando && !dados && <Carregando mensagem="Carregando suas paradas…" />}
      {erro && (
        <div className="mt-6">
          <EstadoErro mensagem={erro} aoTentarDeNovo={recarregar} />
        </div>
      )}

      {dados && (
        <>
          <header className="sticky top-18 z-10 -mx-4 mt-4 bg-asfalto-50/95 px-4 py-4 backdrop-blur sm:mx-0 sm:px-0">
            <div className="flex items-center justify-between gap-3">
              <h1 className="font-mono text-2xl font-bold">{dados.lote.codigoQr}</h1>
              <StatusBadge status={dados.lote.status} />
            </div>
            <p className="mt-1 text-lg">
              <strong>{feitas}</strong> de <strong>{total}</strong> paradas concluídas
            </p>
            <div
              className="mt-2 h-3 overflow-hidden rounded-full bg-asfalto-200"
              role="progressbar"
              aria-label="Progresso da rota"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={feitas}
            >
              <div
                className="h-full rounded-full bg-sucesso transition-all"
                style={{ width: total ? `${(feitas / total) * 100}%` : '0%' }}
              />
            </div>
          </header>

          {total === 0 ? (
            <EstadoVazio titulo="Lote sem encomendas" descricao="Não há paradas neste lote." />
          ) : (
            <ol className="mt-4 flex flex-col gap-3">
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
                      destaque={encomenda.cdEncomenda === proxima?.cdEncomenda}
                    />
                  </li>
                )
              })}
            </ol>
          )}
        </>
      )}
    </Container>
  )
}
