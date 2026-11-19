type LinhaParadasProps = {
  total: number
  /** quantas paradas o entregador já fez */
  concluidas: number
  /** posição do cliente na rota (1 = primeira parada) */
  posicaoCliente: number
}

/**
 * Desenha a rota como uma linha de pontos: feitos, entregador atual e a casa do cliente.
 * Reaproveitada na Home (demonstração) e na página de rastreio.
 */
export function LinhaParadas({ total, concluidas, posicaoCliente }: LinhaParadasProps) {
  const paradas = Array.from({ length: total }, (_, i) => i + 1)

  return (
    <ol
      className="flex items-center"
      aria-label={`Parada ${concluidas + 1} de ${total}. Sua entrega é a parada ${posicaoCliente}.`}
    >
      {paradas.map((numero) => {
        const feita = numero <= concluidas
        const atual = numero === concluidas + 1
        const cliente = numero === posicaoCliente
        return (
          <li key={numero} className="flex flex-1 items-center last:flex-none">
            <span
              className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                cliente
                  ? 'bg-marca-700 text-white ring-4 ring-marca-200'
                  : feita
                    ? 'bg-asfalto-900 text-white'
                    : atual
                      ? 'bg-white text-marca-700 ring-2 ring-marca-700'
                      : 'bg-asfalto-200 text-asfalto-500'
              }`}
            >
              {atual && !cliente && (
                <span aria-hidden="true" className="absolute inset-0 animate-pulso rounded-full bg-marca-500/40" />
              )}
              {cliente ? '🏠' : numero}
            </span>
            {numero < total && (
              <span
                aria-hidden="true"
                className={`h-1 flex-1 ${numero <= concluidas ? 'bg-asfalto-900' : 'bg-[repeating-linear-gradient(90deg,var(--color-asfalto-200)_0_6px,transparent_6px_10px)]'}`}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
