import type { Rastreio } from '../types/api'
import { request } from './api'

/** Consulta pública: é o que o cidadão abre pelo link do WhatsApp. */
export function rastrear(codigo: string): Promise<Rastreio> {
  return request<Rastreio>(`/rastreio/${encodeURIComponent(codigo)}`)
}
