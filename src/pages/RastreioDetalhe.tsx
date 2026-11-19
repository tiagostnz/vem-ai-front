import { Link, useParams } from 'react-router'
import { LinhaParadas } from '../components/home/LinhaParadas'
import { IconeAlerta, IconeCaixa, IconeCheck, IconePin, IconeRelogio } from '../components/icones'
import { FormularioRastreio } from '../components/rastreio/FormularioRastreio'
import { Carregando } from '../components/ui/Carregando'
import { Container } from '../components/ui/Container'
import { EstadoErro } from '../components/ui/EstadoErro'
import { StatusBadge } from '../components/ui/StatusBadge'
import { useApi } from '../hooks/useApi'
import { useTitulo } from '../hooks/useTitulo'
import { rastrear } from '../services/rastreioService'
import type { Rastreio } from '../types/api'

// acima disso a linha de paradas não cabe no celular; mostramos só o número
const MAXIMO_NA_LINHA = 8

/** Mensagem principal conforme o status: linguagem simples, pensada para qualquer pessoa. */
function Situacao({ rastreio }: { rastreio: Rastreio }) {
  if (rastreio.status === 'ENTREGUE') {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-sucesso">
          <IconeCheck className="h-9 w-9" />
        </span>
        <p className="text-2xl font-extrabold">Encomenda entregue!</p>
        <p className="text-asfalto-500">Obrigado por usar o Vem Aí.</p>
      </div>
    )
  }

  if (rastreio.status === 'FALHA') {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-perigo">
          <IconeAlerta className="h-9 w-9" />
        </span>
        <p className="text-2xl font-extrabold">Não conseguimos entregar</p>
        <p className="max-w-sm text-asfalto-500">
          A transportadora vai entrar em contato para combinar uma nova tentativa.
        </p>
      </div>
    )
  }

  if (rastreio.status === 'NO_CD' || rastreio.paradasRestantes === null) {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-asfalto-100 text-asfalto-700">
          <IconeCaixa className="h-9 w-9" />
        </span>
        <p className="text-2xl font-extrabold">Ainda no centro de distribuição</p>
        <p className="max-w-sm text-asfalto-500">
          Sua encomenda está sendo separada. Você pode sair de casa tranquilo: avisamos quando ela estiver perto.
        </p>
      </div>
    )
  }

  // EM_ROTA: paradasRestantes conta a sua própria parada (1 = você é a próxima)
  const paradas = rastreio.paradasRestantes
  return (
    <div>
      {paradas === 1 ? (
        <p className="font-display text-3xl font-extrabold text-marca-700">Você é a próxima parada!</p>
      ) : (
        <p>
          <span className="font-display text-6xl font-extrabold text-marca-700">{paradas}</span>
          <span className="ml-2 text-xl font-semibold">paradas até você</span>
        </p>
      )}
      <p className="mt-2 flex items-center gap-2 text-asfalto-500">
        <IconeRelogio className="h-5 w-5" />
        {rastreio.exibirMapa
          ? 'O entregador está perto. Fique de olho!'
          : 'Avisamos no WhatsApp quando faltarem 3 paradas.'}
      </p>
      {paradas <= MAXIMO_NA_LINHA && (
        <div className="mt-6">
          <LinhaParadas total={paradas} concluidas={0} posicaoCliente={paradas} />
        </div>
      )}
    </div>
  )
}

/** Página pública que o cidadão abre pelo link do WhatsApp: /rastreio/PC-XXXXXX */
export function RastreioDetalhe() {
  const { codigo = '' } = useParams<{ codigo: string }>()
  useTitulo(`Rastreio ${codigo}`)
  const { dados, carregando, erro, recarregar } = useApi(() => rastrear(codigo), [codigo])

  return (
    <Container className="max-w-2xl py-10">
      <Link to="/rastreio" className="inline-block rounded text-sm font-semibold text-marca-700 hover:underline">
        ← Rastrear outra encomenda
      </Link>

      {carregando && !dados && <Carregando mensagem="Procurando sua encomenda…" />}

      {erro && (
        <div className="mt-6 flex flex-col gap-6">
          <EstadoErro mensagem={erro} aoTentarDeNovo={recarregar} />
          <div className="rounded-3xl bg-white p-6 ring-1 ring-asfalto-200">
            <p className="mb-4 font-semibold">Confira o código e tente de novo:</p>
            <FormularioRastreio codigoInicial={codigo} />
          </div>
        </div>
      )}

      {dados && (
        <article className="mt-6 animate-surgir rounded-3xl bg-white p-6 shadow-sm ring-1 ring-asfalto-200 md:p-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-asfalto-200 pb-5">
            <div className="flex items-center gap-3">
              <IconePin className="h-6 w-6 text-marca-700" />
              <div>
                <p className="text-xs font-semibold tracking-wider text-asfalto-500 uppercase">Encomenda</p>
                <h1 className="font-mono text-xl font-bold">{dados.codigoRastreio}</h1>
              </div>
            </div>
            <StatusBadge status={dados.status} />
          </header>

          <Situacao rastreio={dados} />
        </article>
      )}
    </Container>
  )
}
