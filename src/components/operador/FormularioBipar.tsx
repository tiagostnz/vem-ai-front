import { useState, type FormEvent } from 'react'
import { mensagemDeErro } from '../../services/api'
import { biparEncomenda } from '../../services/encomendaService'
import type { Centro, Cliente, EncomendaBipada } from '../../types/api'
import { Aviso } from '../ui/Aviso'
import { Botao } from '../ui/Botao'
import { CampoSelecao } from '../ui/CampoSelecao'

type FormularioBiparProps = {
  centros: Centro[]
  clientes: Cliente[]
  aoBipar: (encomenda: EncomendaBipada) => void
}

type Erros = { centro?: string; cliente?: string }

/**
 * Bipar = registrar a encomenda no CD. A API escolhe sozinha o lote em montagem
 * do entregador que atende a região do cliente.
 */
export function FormularioBipar({ centros, clientes, aoBipar }: FormularioBiparProps) {
  const [centro, setCentro] = useState('')
  const [cliente, setCliente] = useState('')
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)
  const [erroApi, setErroApi] = useState<string | null>(null)
  const [bipada, setBipada] = useState<EncomendaBipada | null>(null)

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    const novosErros: Erros = {}
    if (!centro) novosErros.centro = 'Escolha o centro onde a encomenda está.'
    if (!cliente) novosErros.cliente = 'Escolha o destinatário.'
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    setEnviando(true)
    setErroApi(null)
    setBipada(null)
    try {
      const resposta = await biparEncomenda({ cdCentro: Number(centro), cdCliente: Number(cliente) })
      setBipada(resposta)
      setCliente('') // mantém o centro: o operador costuma bipar várias seguidas no mesmo CD
      aoBipar(resposta)
    } catch (falha) {
      setErroApi(mensagemDeErro(falha))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-4">
      <h3 className="text-xl font-bold">Bipar encomenda</h3>

      {bipada && (
        <Aviso tipo="sucesso">
          Encomenda <strong className="font-mono">{bipada.codigoRastreio}</strong> entrou no lote #{bipada.cdLote}, de{' '}
          {bipada.nmEntregador}.
        </Aviso>
      )}
      {erroApi && <Aviso tipo="erro">{erroApi}</Aviso>}

      <CampoSelecao
        rotulo="Centro de distribuição"
        value={centro}
        onChange={(e) => setCentro(e.target.value)}
        erro={erros.centro}
        opcoes={centros.map((c) => ({ valor: String(c.cdCentro), rotulo: c.nmCentro }))}
        required
      />
      <CampoSelecao
        rotulo="Destinatário"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        erro={erros.cliente}
        opcoes={clientes.map((c) => ({ valor: String(c.cdCliente), rotulo: `${c.nmCliente} · ${c.dsEndereco}` }))}
        required
      />

      <Botao type="submit" variante="secundario" carregando={enviando}>
        {enviando ? 'Bipando…' : 'Bipar encomenda'}
      </Botao>
    </form>
  )
}
