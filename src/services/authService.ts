import type { LoginRequest, LoginResponse } from '../types/api'
import { request } from './api'

export function login(dados: LoginRequest): Promise<LoginResponse> {
  return request<LoginResponse>('/login', 'POST', dados)
}
