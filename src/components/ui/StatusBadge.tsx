import type { StatusEncomenda, StatusLote } from '../../types/api'

type Status = StatusEncomenda | StatusLote

// Cada status tem cor E texto: a informação nunca depende só da cor.
const ESTILOS: Record<Status, { rotulo: string; classe: string }> = {
  NO_CD: { rotulo: 'No centro', classe: 'bg-asfalto-100 text-asfalto-700' },
  MONTAGEM: { rotulo: 'Em montagem', classe: 'bg-asfalto-100 text-asfalto-700' },
  EM_ROTA: { rotulo: 'Em rota', classe: 'bg-marca-100 text-marca-800' },
  ENTREGUE: { rotulo: 'Entregue', classe: 'bg-green-100 text-green-800' },
  CONCLUIDO: { rotulo: 'Concluído', classe: 'bg-green-100 text-green-800' },
  FALHA: { rotulo: 'Falhou', classe: 'bg-red-100 text-red-800' },
}

type StatusBadgeProps = {
  status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { rotulo, classe } = ESTILOS[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${classe}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {rotulo}
    </span>
  )
}
