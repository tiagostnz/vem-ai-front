import type { ReactNode } from 'react'
import { IconeAlerta, IconeCheck } from '../icones'

type AvisoProps = {
  tipo: 'sucesso' | 'erro'
  children: ReactNode
}

/** Feedback depois de enviar um formulário ou chamar a API. */
export function Aviso({ tipo, children }: AvisoProps) {
  const sucesso = tipo === 'sucesso'
  return (
    <div
      role={sucesso ? 'status' : 'alert'}
      className={`flex animate-surgir items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
        sucesso ? 'border-green-200 bg-green-50 text-green-900' : 'border-red-200 bg-red-50 text-red-900'
      }`}
    >
      {sucesso ? (
        <IconeCheck className="mt-0.5 h-5 w-5 shrink-0 text-sucesso" />
      ) : (
        <IconeAlerta className="mt-0.5 h-5 w-5 shrink-0 text-perigo" />
      )}
      <div>{children}</div>
    </div>
  )
}
