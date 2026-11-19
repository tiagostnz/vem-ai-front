import { useId, type TextareaHTMLAttributes } from 'react'
import { MensagemCampo } from './Campo'

type CampoTextoProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  rotulo: string
  erro?: string
}

export function CampoTexto({ rotulo, erro, ...props }: CampoTextoProps) {
  const id = useId()
  const idErro = `${id}-erro`
  const tamanho = String(props.value ?? '').length

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-asfalto-900">
        {rotulo}
        {props.required && <span className="text-perigo"> *</span>}
      </label>
      <textarea
        id={id}
        rows={5}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? idErro : undefined}
        className={`rounded-xl border-2 bg-white px-4 py-3 text-base outline-none transition-colors focus:border-marca-700 ${
          erro ? 'border-perigo' : 'border-asfalto-200'
        }`}
        {...props}
      />
      {props.maxLength && (
        <p className="self-end text-xs text-asfalto-500">
          {tamanho}/{props.maxLength}
        </p>
      )}
      <MensagemCampo id={idErro}>{erro}</MensagemCampo>
    </div>
  )
}
