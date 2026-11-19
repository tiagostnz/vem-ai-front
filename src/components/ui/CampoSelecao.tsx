import { useId, type SelectHTMLAttributes } from 'react'
import { MensagemCampo } from './Campo'

export type Opcao = {
  valor: string
  rotulo: string
}

type CampoSelecaoProps = SelectHTMLAttributes<HTMLSelectElement> & {
  rotulo: string
  opcoes: Opcao[]
  erro?: string
  /** texto da primeira opção vazia */
  placeholder?: string
}

export function CampoSelecao({ rotulo, opcoes, erro, placeholder = 'Selecione…', ...props }: CampoSelecaoProps) {
  const id = useId()
  const idErro = `${id}-erro`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-asfalto-900">
        {rotulo}
        {props.required && <span className="text-perigo"> *</span>}
      </label>
      <select
        id={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? idErro : undefined}
        className={`min-h-12 rounded-xl border-2 bg-white px-4 text-base outline-none transition-colors focus:border-marca-700 ${
          erro ? 'border-perigo' : 'border-asfalto-200'
        }`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.rotulo}
          </option>
        ))}
      </select>
      <MensagemCampo id={idErro}>{erro}</MensagemCampo>
    </div>
  )
}
