import { useId, type InputHTMLAttributes, type ReactNode } from 'react'

type CampoProps = InputHTMLAttributes<HTMLInputElement> & {
  rotulo: string
  erro?: string
  dica?: string
}

/** Input com label, dica e mensagem de erro ligados por id (o leitor de tela lê tudo junto). */
export function Campo({ rotulo, erro, dica, className = '', ...props }: CampoProps) {
  const id = useId()
  const idDica = `${id}-dica`
  const idErro = `${id}-erro`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-asfalto-900">
        {rotulo}
        {props.required && <span className="text-perigo"> *</span>}
      </label>
      <input
        id={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={[dica && idDica, erro && idErro].filter(Boolean).join(' ') || undefined}
        className={`min-h-12 rounded-xl border-2 bg-white px-4 text-base outline-none transition-colors placeholder:text-asfalto-500 focus:border-marca-700 ${
          erro ? 'border-perigo' : 'border-asfalto-200'
        } ${className}`}
        {...props}
      />
      {dica && !erro && (
        <p id={idDica} className="text-xs text-asfalto-500">
          {dica}
        </p>
      )}
      <MensagemCampo id={idErro}>{erro}</MensagemCampo>
    </div>
  )
}

export function MensagemCampo({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null
  return (
    <p id={id} className="text-sm font-medium text-perigo">
      {children}
    </p>
  )
}
