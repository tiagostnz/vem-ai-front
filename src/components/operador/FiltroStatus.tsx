import type { StatusLote } from '../../types/api'

export type FiltroLote = StatusLote | 'TODOS'

const OPCOES: { valor: FiltroLote; rotulo: string }[] = [
  { valor: 'TODOS', rotulo: 'Todos' },
  { valor: 'MONTAGEM', rotulo: 'Em montagem' },
  { valor: 'EM_ROTA', rotulo: 'Em rota' },
  { valor: 'CONCLUIDO', rotulo: 'Concluídos' },
]

type FiltroStatusProps = {
  valor: FiltroLote
  contagem: Record<FiltroLote, number>
  aoMudar: (valor: FiltroLote) => void
}

export function FiltroStatus({ valor, contagem, aoMudar }: FiltroStatusProps) {
  return (
    <div role="group" aria-label="Filtrar lotes por status" className="flex flex-wrap gap-2">
      {OPCOES.map((opcao) => {
        const ativo = opcao.valor === valor
        return (
          <button
            key={opcao.valor}
            type="button"
            aria-pressed={ativo}
            onClick={() => aoMudar(opcao.valor)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition ${
              ativo
                ? 'bg-asfalto-900 text-white'
                : 'bg-white text-asfalto-700 ring-1 ring-asfalto-200 hover:bg-asfalto-100'
            }`}
          >
            {opcao.rotulo}
            <span className={`rounded-full px-2 py-0.5 text-xs ${ativo ? 'bg-marca-700' : 'bg-asfalto-100'}`}>
              {contagem[opcao.valor]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
