const FORMATO_DATA_HORA = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
})

/** "2026-11-17T22:21:23.004518" -> "17/11, 22:21" */
export function formatarDataHora(iso: string | null): string {
  if (!iso) return '—'
  const data = new Date(iso)
  return Number.isNaN(data.getTime()) ? '—' : FORMATO_DATA_HORA.format(data)
}

/** Monta um mapa id -> item para cruzar ids que a API devolve com os nomes. */
export function indexarPor<T>(itens: T[], chave: (item: T) => number): Map<number, T> {
  return new Map(itens.map((item) => [chave(item), item]))
}
