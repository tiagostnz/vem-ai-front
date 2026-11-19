import type { ErroApi } from '../types/api'

const BASE_URL: string = import.meta.env.VITE_API_URL ?? '/api'

/**
 * Erro lançado quando a API responde com status de falha.
 * Guarda o status HTTP e, quando vier, os erros de validação por campo.
 */
export class ApiError extends Error {
  readonly status: number
  readonly campos: Record<string, string>

  constructor(status: number, mensagem: string, campos?: Record<string, string> | null) {
    super(mensagem)
    this.name = 'ApiError'
    this.status = status
    this.campos = campos ?? {}
  }
}

type Metodo = 'GET' | 'POST' | 'PUT' | 'DELETE'

function ehErroApi(valor: unknown): valor is ErroApi {
  return typeof valor === 'object' && valor !== null && 'mensagem' in valor
}

/** Única função que chama o fetch: todos os services passam por aqui. */
export async function request<T>(caminho: string, metodo: Metodo = 'GET', corpo?: unknown): Promise<T> {
  let resposta: Response

  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, {
      method: metodo,
      headers: corpo === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
    })
  } catch {
    // fetch só rejeita quando nem chegou resposta: sem internet ou servidor fora
    throw new ApiError(0, 'Não foi possível conectar ao servidor. Verifique sua internet e tente de novo.')
  }

  // 204 No Content (ex.: DELETE) não tem corpo para ler
  if (resposta.status === 204) {
    return undefined as T
  }

  const texto = await resposta.text()
  const dados: unknown = texto ? JSON.parse(texto) : null

  if (!resposta.ok) {
    if (ehErroApi(dados)) {
      throw new ApiError(resposta.status, dados.mensagem, dados.campos)
    }
    throw new ApiError(resposta.status, 'O servidor não conseguiu concluir a operação. Tente novamente.')
  }

  return dados as T
}

/** Mensagem amigável para mostrar na tela a partir de qualquer erro. */
export function mensagemDeErro(erro: unknown): string {
  if (erro instanceof ApiError) return erro.message
  return 'Algo deu errado. Tente novamente.'
}
