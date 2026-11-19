import type { Encomenda, EncomendaBipada, EncomendaRequest, EntregaResponse, Evento } from '../types/api'
import { request } from './api'

export function listarEncomendas(): Promise<Encomenda[]> {
  return request<Encomenda[]>('/encomendas')
}

/** Operador bipa a encomenda no CD; a API coloca no lote do entregador da região. */
export function biparEncomenda(dados: EncomendaRequest): Promise<EncomendaBipada> {
  return request<EncomendaBipada>('/encomendas', 'POST', dados)
}

/** Marca a parada como entregue e recalcula quantas faltam para cada cliente. */
export function concluirEntrega(id: number): Promise<EntregaResponse> {
  return request<EntregaResponse>(`/encomendas/${id}/entrega`, 'POST')
}

export function listarEventos(id: number): Promise<Evento[]> {
  return request<Evento[]>(`/encomendas/${id}/eventos`)
}
