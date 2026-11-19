import type { Coordenadas, Encomenda, IniciarRotaRequest, IniciarRotaResponse, Lote, LoteRequest } from '../types/api'
import { request } from './api'

export function listarLotes(): Promise<Lote[]> {
  return request<Lote[]>('/lotes')
}

export function buscarLote(id: number): Promise<Lote> {
  return request<Lote>(`/lotes/${id}`)
}

export function criarLote(dados: LoteRequest): Promise<Lote> {
  return request<Lote>('/lotes', 'POST', dados)
}

export function removerLote(id: number): Promise<void> {
  return request<void>(`/lotes/${id}`, 'DELETE')
}

export function listarEncomendasDoLote(id: number): Promise<Encomenda[]> {
  return request<Encomenda[]>(`/lotes/${id}/encomendas`)
}

/** Entregador lê o QR do pacotão: todas as encomendas viram EM_ROTA e ganham posição. */
export function iniciarRota(dados: IniciarRotaRequest): Promise<IniciarRotaResponse> {
  return request<IniciarRotaResponse>('/lotes/iniciar-rota', 'POST', dados)
}

export function enviarLocalizacao(id: number, posicao: Coordenadas): Promise<Lote> {
  return request<Lote>(`/lotes/${id}/localizacao`, 'PUT', posicao)
}
