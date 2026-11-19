import { useState } from 'react'
import { mensagemDeErro } from '../../services/api'
import { concluirEntrega } from '../../services/encomendaService'
import type { EntregaResponse } from '../../types/api'
import { IconeCheck } from '../icones'
import { Aviso } from '../ui/Aviso'
import { Botao } from '../ui/Botao'

type BotaoEntregueProps = {
  cdEncomenda: number
  aoConcluir: (resposta: EntregaResponse) => void
}

/** Botão de rua: grande, verde e com o estado de envio visível. */
export function BotaoEntregue({ cdEncomenda, aoConcluir }: BotaoEntregueProps) {
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  async function confirmar() {
    setEnviando(true)
    setErro(null)
    try {
      const resposta = await concluirEntrega(cdEncomenda)
      aoConcluir(resposta)
    } catch (falha) {
      setErro(mensagemDeErro(falha))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {erro && <Aviso tipo="erro">{erro}</Aviso>}
      <Botao
        variante="sucesso"
        tamanho="lg"
        className="w-full"
        carregando={enviando}
        icone={<IconeCheck className="h-6 w-6" />}
        onClick={confirmar}
      >
        {enviando ? 'Confirmando…' : 'Entregue'}
      </Botao>
    </div>
  )
}
