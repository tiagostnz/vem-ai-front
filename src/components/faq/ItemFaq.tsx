import { useId } from 'react'
import type { PerguntaFaq } from '../../data/faq'

type ItemFaqProps = {
  item: PerguntaFaq
  aberto: boolean
  aoAlternar: () => void
}

export function ItemFaq({ item, aberto, aoAlternar }: ItemFaqProps) {
  const idResposta = useId()

  return (
    <li className={`rounded-2xl bg-white ring-1 transition ${aberto ? 'ring-marca-700' : 'ring-asfalto-200'}`}>
      <h3>
        <button
          type="button"
          onClick={aoAlternar}
          aria-expanded={aberto}
          aria-controls={idResposta}
          className="flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-sans text-lg font-semibold"
        >
          {item.pergunta}
          <span
            aria-hidden="true"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl transition ${
              aberto ? 'rotate-45 bg-marca-700 text-white' : 'bg-asfalto-100 text-asfalto-700'
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <div id={idResposta} hidden={!aberto} className="px-5 pb-5 text-asfalto-700">
        {item.resposta}
      </div>
    </li>
  )
}
