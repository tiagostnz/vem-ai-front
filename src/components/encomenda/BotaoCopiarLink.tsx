import { useState } from 'react'
import { linkRastreio } from '../../utils/rastreio'
import { IconeCheck } from '../icones'

type BotaoCopiarLinkProps = {
  codigo: string
}

export function BotaoCopiarLink({ codigo }: BotaoCopiarLinkProps) {
  const [copiado, setCopiado] = useState(false)

  async function copiar() {
    try {
      await navigator.clipboard.writeText(linkRastreio(codigo))
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      // sem permissão de área de transferência: abre o link para copiar da barra
      window.open(linkRastreio(codigo), '_blank', 'noopener')
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-asfalto-100 px-3 text-sm font-semibold text-asfalto-700 hover:bg-asfalto-200"
    >
      {copiado && <IconeCheck className="h-4 w-4 text-sucesso" />}
      <span aria-live="polite">{copiado ? 'Link copiado' : 'Copiar link de rastreio'}</span>
    </button>
  )
}
