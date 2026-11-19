import { useCallback, useEffect, useState } from 'react'
import { mensagemDeErro } from '../services/api'

type EstadoApi<T> = {
  dados: T | null
  carregando: boolean
  erro: string | null
  recarregar: () => void
}

/**
 * Executa uma busca na API ao montar a tela (e quando as dependências mudam),
 * devolvendo os três estados que toda tela precisa tratar.
 */
export function useApi<T>(buscar: () => Promise<T>, dependencias: unknown[] = []): EstadoApi<T> {
  const [dados, setDados] = useState<T | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [versao, setVersao] = useState(0)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const buscarMemo = useCallback(buscar, dependencias)

  useEffect(() => {
    // evita atualizar o estado se a tela foi desmontada no meio da requisição
    let ativo = true
    setCarregando(true)
    setErro(null)

    buscarMemo()
      .then((resultado) => {
        if (ativo) setDados(resultado)
      })
      .catch((falha: unknown) => {
        if (ativo) setErro(mensagemDeErro(falha))
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [buscarMemo, versao])

  const recarregar = useCallback(() => setVersao((v) => v + 1), [])

  return { dados, carregando, erro, recarregar }
}
