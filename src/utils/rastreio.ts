/** Link público que o cidadão recebe: abre direto a página de rastreio. */
export function linkRastreio(codigo: string): string {
  return `${window.location.origin}/rastreio/${encodeURIComponent(codigo)}`
}
