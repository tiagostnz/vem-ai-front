import { useState, type FormEvent } from 'react'
import { mensagemDeErro } from '../../services/api'
import { iniciarRota } from '../../services/loteService'
import type { IniciarRotaResponse } from '../../types/api'
import { IconeQr } from '../icones'
import { Aviso } from '../ui/Aviso'
import { Botao } from '../ui/Botao'
import { Campo } from '../ui/Campo'

type FormularioIniciarRotaProps = {
  cdEntregador: number
  aoIniciar: (rota: IniciarRotaResponse) => void
}

// mesmo formato que a API gera: LOTE- + 6 letras/números
const FORMATO_QR = /^LOTE-[A-Z0-9]{6}$/

export function FormularioIniciarRota({ cdEntregador, aoIniciar }: FormularioIniciarRotaProps) {
  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState<string | undefined>()
  const [enviando, setEnviando] = useState(false)
  const [erroApi, setErroApi] = useState<string | null>(null)

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    const codigoLimpo = codigo.trim().toUpperCase()
    if (!FORMATO_QR.test(codigoLimpo)) {
      setErro('O código tem o formato LOTE-XXXXXX.')
      return
    }
    setErro(undefined)
    setEnviando(true)
    setErroApi(null)
    try {
      const rota = await iniciarRota({ codigoQr: codigoLimpo, cdEntregador })
      aoIniciar(rota)
    } catch (falha) {
      // 404 = QR inválido, 403 = lote de outro entregador, 409 = lote vazio ou já iniciado
      setErroApi(mensagemDeErro(falha))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-5">
      {erroApi && <Aviso tipo="erro">{erroApi}</Aviso>}
      <Campo
        rotulo="Código do QR do pacotão"
        placeholder="LOTE-XXXXXX"
        autoCapitalize="characters"
        autoComplete="off"
        spellCheck={false}
        dica="Está impresso embaixo do QR code na etiqueta do lote."
        value={codigo}
        onChange={(e) => setCodigo(e.target.value.toUpperCase())}
        erro={erro}
        className="font-mono text-lg tracking-wider"
        required
      />
      <Botao type="submit" tamanho="lg" carregando={enviando} icone={<IconeQr className="h-6 w-6" />}>
        {enviando ? 'Iniciando rota…' : 'Iniciar rota'}
      </Botao>
    </form>
  )
}
