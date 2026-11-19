import { useEffect } from 'react'

/** Troca o título da aba do navegador conforme a página aberta. */
export function useTitulo(titulo: string) {
  useEffect(() => {
    document.title = `${titulo} · Vem Aí`
  }, [titulo])
}
