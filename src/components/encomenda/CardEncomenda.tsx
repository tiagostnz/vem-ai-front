import type { ReactNode } from 'react'
import type { StatusEncomenda } from '../../types/api'
import { StatusBadge } from '../ui/StatusBadge'

type CardEncomendaProps = {
  codigoRastreio: string
  status: StatusEncomenda
  nomeCliente: string
  endereco: string
  /** posição na rota; null enquanto o lote não saiu */
  posicao: number | null
  /** botões extras (ex.: confirmar entrega, compartilhar link) */
  acoes?: ReactNode
  destaque?: boolean
}

/** Uma parada/encomenda. Usado no detalhe do lote (operador) e na rota do entregador. */
export function CardEncomenda({
  codigoRastreio,
  status,
  nomeCliente,
  endereco,
  posicao,
  acoes,
  destaque = false,
}: CardEncomendaProps) {
  const finalizada = status === 'ENTREGUE' || status === 'FALHA'

  return (
    <article
      className={`flex gap-4 rounded-2xl bg-white p-4 ring-1 transition sm:p-5 ${
        destaque ? 'shadow-lg ring-2 ring-marca-700' : 'ring-asfalto-200'
      } ${finalizada ? 'opacity-70' : ''}`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-xl font-extrabold ${
          destaque ? 'bg-marca-700 text-white' : 'bg-asfalto-100 text-asfalto-700'
        }`}
        aria-label={posicao ? `Parada ${posicao}` : 'Sem posição na rota'}
      >
        {posicao ?? '–'}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-sm font-bold text-asfalto-500">{codigoRastreio}</p>
          <StatusBadge status={status} />
        </div>
        <h3 className="mt-1 font-sans text-lg font-bold break-words">{nomeCliente}</h3>
        <p className="text-asfalto-500 break-words">{endereco}</p>
        {acoes && <div className="mt-4 flex flex-wrap gap-2">{acoes}</div>}
      </div>
    </article>
  )
}
