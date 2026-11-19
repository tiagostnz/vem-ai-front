import { Link } from 'react-router'
import type { Lote } from '../../types/api'
import { formatarDataHora } from '../../utils/formatar'
import { IconeQr, IconeSeta } from '../icones'
import { StatusBadge } from '../ui/StatusBadge'

type CardLoteProps = {
  lote: Lote
  nomeCentro: string
  nomeEntregador: string
}

export function CardLote({ lote, nomeCentro, nomeEntregador }: CardLoteProps) {
  return (
    <Link
      to={`/operador/lotes/${lote.cdLote}`}
      className="group flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm ring-1 ring-asfalto-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-marca-700"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-asfalto-900 text-marca-500">
            <IconeQr className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold tracking-wider text-asfalto-500 uppercase">Lote #{lote.cdLote}</p>
            <p className="font-mono font-bold">{lote.codigoQr}</p>
          </div>
        </div>
        <StatusBadge status={lote.status} />
      </div>

      <dl className="mt-5 grid flex-1 grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-asfalto-500">Centro</dt>
          <dd className="font-semibold">{nomeCentro}</dd>
        </div>
        <div>
          <dt className="text-asfalto-500">Entregador</dt>
          <dd className="font-semibold">{nomeEntregador}</dd>
        </div>
        <div>
          <dt className="text-asfalto-500">Criado em</dt>
          <dd className="font-semibold">{formatarDataHora(lote.dtCriacao)}</dd>
        </div>
        <div>
          <dt className="text-asfalto-500">Saiu em</dt>
          <dd className="font-semibold">{formatarDataHora(lote.dtInicioRota)}</dd>
        </div>
      </dl>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-marca-700">
        Ver encomendas
        <IconeSeta className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
