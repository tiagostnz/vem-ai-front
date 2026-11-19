import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { mensagemDeErro } from '../../services/api'
import { criarLote } from '../../services/loteService'
import type { Centro, Entregador, Lote } from '../../types/api'
import { Aviso } from '../ui/Aviso'
import { Botao } from '../ui/Botao'
import { CampoSelecao } from '../ui/CampoSelecao'

type FormularioNovoLoteProps = {
  centros: Centro[]
  entregadores: Entregador[]
  aoCriar: (lote: Lote) => void
}

type Erros = { centro?: string; entregador?: string }

export function FormularioNovoLote({ centros, entregadores, aoCriar }: FormularioNovoLoteProps) {
  const [centro, setCentro] = useState('')
  const [entregador, setEntregador] = useState('')
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)
  const [erroApi, setErroApi] = useState<string | null>(null)
  const [criado, setCriado] = useState<Lote | null>(null)

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    const novosErros: Erros = {}
    if (!centro) novosErros.centro = 'Escolha o centro de distribuição.'
    if (!entregador) novosErros.entregador = 'Escolha o entregador do lote.'
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    setEnviando(true)
    setErroApi(null)
    setCriado(null)
    try {
      const lote = await criarLote({ cdCentro: Number(centro), cdEntregador: Number(entregador) })
      setCriado(lote)
      setCentro('')
      setEntregador('')
      aoCriar(lote)
    } catch (falha) {
      setErroApi(mensagemDeErro(falha))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-4">
      <h3 className="text-xl font-bold">Novo pacotão</h3>

      {criado && (
        <Aviso tipo="sucesso">
          Lote <strong className="font-mono">{criado.codigoQr}</strong> criado.{' '}
          <Link to={`/operador/lotes/${criado.cdLote}`} className="font-semibold underline">
            Abrir lote
          </Link>
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
        rotulo="Entregador"
        value={entregador}
        onChange={(e) => setEntregador(e.target.value)}
        erro={erros.entregador}
        opcoes={entregadores.map((e) => ({
          valor: String(e.cdEntregador),
          rotulo: e.status === 'DISPONIVEL' ? e.nmEntregador : `${e.nmEntregador} (indisponível)`,
        }))}
        required
      />

      <Botao type="submit" carregando={enviando}>
        {enviando ? 'Criando lote…' : 'Criar lote'}
      </Botao>
    </form>
  )
}
