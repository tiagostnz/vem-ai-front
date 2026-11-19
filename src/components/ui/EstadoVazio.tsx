import type { ReactNode } from 'react'
import { IconeCaixa } from '../icones'

type EstadoVazioProps = {
  titulo: string
  descricao?: string
  acao?: ReactNode
}

export function EstadoVazio({ titulo, descricao, acao }: EstadoVazioProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-asfalto-200 px-6 py-12 text-center">
      <IconeCaixa className="h-10 w-10 text-asfalto-500" />
      <p className="font-semibold text-asfalto-900">{titulo}</p>
      {descricao && <p className="max-w-md text-sm text-asfalto-500">{descricao}</p>}
      {acao}
    </div>
  )
}
