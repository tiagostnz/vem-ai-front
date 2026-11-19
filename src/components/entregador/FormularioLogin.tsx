import { useState, type FormEvent } from 'react'
import { mensagemDeErro } from '../../services/api'
import { login } from '../../services/authService'
import type { LoginResponse } from '../../types/api'
import { EMAIL_REGEX } from '../../utils/validacao'
import { Aviso } from '../ui/Aviso'
import { Botao } from '../ui/Botao'
import { Campo } from '../ui/Campo'

type FormularioLoginProps = {
  aoEntrar: (entregador: LoginResponse) => void
}

type Erros = { email?: string; senha?: string }

export function FormularioLogin({ aoEntrar }: FormularioLoginProps) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)
  const [erroApi, setErroApi] = useState<string | null>(null)

  async function enviar(evento: FormEvent) {
    evento.preventDefault()
    const novosErros: Erros = {}
    if (!EMAIL_REGEX.test(email.trim())) novosErros.email = 'Digite um e-mail válido.'
    if (senha.length < 6) novosErros.senha = 'A senha tem pelo menos 6 caracteres.'
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    setEnviando(true)
    setErroApi(null)
    try {
      const resposta = await login({ tipo: 'ENTREGADOR', dsEmail: email.trim(), senha })
      aoEntrar(resposta)
    } catch (falha) {
      setErroApi(mensagemDeErro(falha))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-5">
      {erroApi && <Aviso tipo="erro">{erroApi}</Aviso>}
      <Campo
        rotulo="E-mail"
        type="email"
        inputMode="email"
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        erro={erros.email}
        required
      />
      <Campo
        rotulo="Senha"
        type="password"
        autoComplete="current-password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        erro={erros.senha}
        required
      />
      <Botao type="submit" tamanho="lg" carregando={enviando}>
        {enviando ? 'Entrando…' : 'Entrar'}
      </Botao>
    </form>
  )
}
