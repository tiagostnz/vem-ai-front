import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { IconePin } from '../icones'
import { Botao } from '../ui/Botao'
import { Campo } from '../ui/Campo'

// mesmo formato que a API gera para o código de rastreio: PC- + 6 letras/números
const FORMATO_CODIGO = /^PC-[A-Z0-9]{6}$/

type FormularioRastreioProps = {
  /** código já preenchido, por exemplo ao voltar de uma busca */
  codigoInicial?: string
}

/** O cidadão digita o código e vai para a página pública /rastreio/:codigo. */
export function FormularioRastreio({ codigoInicial = '' }: FormularioRastreioProps) {
  const navigate = useNavigate()
  const [codigo, setCodigo] = useState(codigoInicial)
  const [erro, setErro] = useState<string | undefined>()

  function enviar(evento: FormEvent) {
    evento.preventDefault()
    // aceita com ou sem o "PC-" e com letras minúsculas
    let limpo = codigo.trim().toUpperCase().replace(/\s/g, '')
    if (!limpo.startsWith('PC-')) limpo = `PC-${limpo.replace(/^PC/, '')}`

    if (!FORMATO_CODIGO.test(limpo)) {
      setErro('Confira o código. Ele tem o formato PC-XXXXXX e vem na mensagem do WhatsApp.')
      return
    }
    setErro(undefined)
    navigate(`/rastreio/${limpo}`)
  }

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div className="flex-1">
        <Campo
          rotulo="Código de rastreio"
          placeholder="PC-XXXXXX"
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.toUpperCase())}
          erro={erro}
          className="font-mono text-lg tracking-wider"
          required
        />
      </div>
      <Botao type="submit" tamanho="lg" icone={<IconePin className="h-5 w-5" />} className="sm:mt-7">
        Rastrear
      </Botao>
    </form>
  )
}
