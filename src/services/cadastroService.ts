import type { Centro, Cliente, Entregador } from '../types/api'
import { request } from './api'

// Dados de apoio que o painel usa para preencher selects e cruzar ids com nomes.

export function listarCentros(): Promise<Centro[]> {
  return request<Centro[]>('/centros')
}

export function listarEntregadores(): Promise<Entregador[]> {
  return request<Entregador[]>('/entregadores')
}

export function listarClientes(): Promise<Cliente[]> {
  return request<Cliente[]>('/clientes')
}
