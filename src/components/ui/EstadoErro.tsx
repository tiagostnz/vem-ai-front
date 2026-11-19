import { IconeAlerta } from '../icones'
import { Botao } from './Botao'

type EstadoErroProps = {
  mensagem: string
  aoTentarDeNovo?: () => void
}

export function EstadoErro({ mensagem, aoTentarDeNovo }: EstadoErroProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center"
    >
      <IconeAlerta className="h-9 w-9 text-perigo" />
      <p className="font-semibold text-red-900">Não deu para carregar</p>
      <p className="max-w-md text-sm text-red-800">{mensagem}</p>
      {aoTentarDeNovo && (
        <Botao variante="secundario" onClick={aoTentarDeNovo} className="mt-2">
          Tentar de novo
        </Botao>
      )}
    </div>
  )
}
