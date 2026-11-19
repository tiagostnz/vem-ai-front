import { useState } from 'react'
import { useNavigate } from 'react-router'
import { mensagemDeErro } from '../../services/api'
import { removerLote } from '../../services/loteService'
import { Aviso } from '../ui/Aviso'
import { Botao } from '../ui/Botao'

type RemoverLoteProps = {
  idLote: number
}

/** Remoção em dois passos: o primeiro clique só pede confirmação. */
export function RemoverLote({ idLote }: RemoverLoteProps) {
  const navigate = useNavigate()
  const [confirmando, setConfirmando] = useState(false)
  const [removendo, setRemovendo] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  async function remover() {
    setRemovendo(true)
    setErro(null)
    try {
      await removerLote(idLote)
      navigate('/operador', { replace: true })
    } catch (falha) {
      setErro(mensagemDeErro(falha))
      setConfirmando(false)
    } finally {
      setRemovendo(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {erro && <Aviso tipo="erro">{erro}</Aviso>}
      {confirmando ? (
        <div className="rounded-2xl bg-white/10 p-4" role="alertdialog" aria-label="Confirmar remoção do lote">
          <p className="text-sm font-semibold">Remover este lote? Essa ação não pode ser desfeita.</p>
          <div className="mt-3 flex gap-2">
            <Botao className="flex-1 bg-perigo! hover:brightness-110!" carregando={removendo} onClick={remover}>
              Remover
            </Botao>
            <Botao variante="secundario" className="flex-1" onClick={() => setConfirmando(false)} disabled={removendo}>
              Cancelar
            </Botao>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirmando(true)}
          className="min-h-11 rounded-xl text-sm font-semibold text-red-300 underline underline-offset-4 hover:text-red-200"
        >
          Remover lote
        </button>
      )}
    </div>
  )
}
