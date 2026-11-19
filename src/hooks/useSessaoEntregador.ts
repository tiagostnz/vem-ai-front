import { useCallback, useState } from 'react'
import type { LoginResponse } from '../types/api'

const CHAVE = 'vemai:entregador'

function lerSessao(): LoginResponse | null {
  try {
    const salvo = sessionStorage.getItem(CHAVE)
    return salvo ? (JSON.parse(salvo) as LoginResponse) : null
  } catch {
    return null
  }
}

/**
 * Guarda o entregador logado no sessionStorage: sobrevive a um F5,
 * mas some ao fechar a aba (celular compartilhado não fica logado).
 */
export function useSessaoEntregador() {
  const [entregador, setEntregador] = useState<LoginResponse | null>(lerSessao)

  const entrar = useCallback((dados: LoginResponse) => {
    try {
      sessionStorage.setItem(CHAVE, JSON.stringify(dados))
    } catch {
      // modo anônimo sem storage: segue só com o estado em memória
    }
    setEntregador(dados)
  }, [])

  const sair = useCallback(() => {
    try {
      sessionStorage.removeItem(CHAVE)
    } catch {
      // ignorado de propósito
    }
    setEntregador(null)
  }, [])

  return { entregador, entrar, sair }
}
