import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { ContatoForm, ErrosContato } from '../../types/contato'
import { EMAIL_REGEX, mascararTelefone, telefoneValido } from '../../utils/validacao'
import { Aviso } from '../ui/Aviso'
import { Botao } from '../ui/Botao'
import { Campo } from '../ui/Campo'
import { CampoSelecao, type Opcao } from '../ui/CampoSelecao'
import { CampoTexto } from '../ui/CampoTexto'

const VAZIO: ContatoForm = { nome: '', email: '', telefone: '', assunto: '', mensagem: '' }

const ASSUNTOS: Opcao[] = [
  { valor: 'duvida', rotulo: 'Dúvida sobre o serviço' },
  { valor: 'entrega', rotulo: 'Problema com uma entrega' },
  { valor: 'parceria', rotulo: 'Quero usar na minha transportadora ou loja' },
  { valor: 'acessibilidade', rotulo: 'Acessibilidade' },
]

function validar(dados: ContatoForm): ErrosContato {
  const erros: ErrosContato = {}
  if (dados.nome.trim().length < 3) erros.nome = 'Digite seu nome (pelo menos 3 letras).'
  if (!dados.email.trim()) erros.email = 'Digite seu e-mail.'
  else if (!EMAIL_REGEX.test(dados.email.trim())) erros.email = 'E-mail inválido. Exemplo: nome@email.com'
  // telefone é opcional, mas se vier precisa estar certo
  if (dados.telefone && !telefoneValido(dados.telefone)) erros.telefone = 'Telefone incompleto. Use DDD + número.'
  if (!dados.assunto) erros.assunto = 'Escolha um assunto.'
  if (dados.mensagem.trim().length < 20) erros.mensagem = 'Escreva pelo menos 20 caracteres.'
  return erros
}

export function FormularioContato() {
  const [dados, setDados] = useState<ContatoForm>(VAZIO)
  const [erros, setErros] = useState<ErrosContato>({})
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  function atualizar(evento: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = evento.target
    const valor = name === 'telefone' ? mascararTelefone(value) : value
    setDados((atual) => ({ ...atual, [name]: valor }))
    // some com o erro do campo assim que a pessoa começa a corrigir
    if (erros[name as keyof ContatoForm]) {
      setErros((atual) => ({ ...atual, [name]: undefined }))
    }
    setEnviado(false)
  }

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const novosErros = validar(dados)
    setErros(novosErros)

    const primeiroErro = Object.keys(novosErros)[0]
    if (primeiroErro) {
      // leva o foco para o primeiro campo errado
      evento.currentTarget.querySelector<HTMLElement>(`[name="${primeiroErro}"]`)?.focus()
      return
    }

    setEnviando(true)
    // a API Java não tem endpoint de contato; simulamos o envio
    await new Promise((resolver) => setTimeout(resolver, 900))
    setEnviando(false)
    setEnviado(true)
    setDados(VAZIO)
  }

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-asfalto-200 md:p-8"
    >
      {enviado && (
        <Aviso tipo="sucesso">
          <strong>Mensagem enviada!</strong> Respondemos em até 2 dias úteis no e-mail informado.
        </Aviso>
      )}

      <Campo
        rotulo="Nome completo"
        name="nome"
        value={dados.nome}
        onChange={atualizar}
        erro={erros.nome}
        autoComplete="name"
        required
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Campo
          rotulo="E-mail"
          name="email"
          type="email"
          value={dados.email}
          onChange={atualizar}
          erro={erros.email}
          autoComplete="email"
          required
        />
        <Campo
          rotulo="WhatsApp"
          name="telefone"
          type="tel"
          inputMode="numeric"
          placeholder="(11) 91234-5678"
          dica="Opcional"
          value={dados.telefone}
          onChange={atualizar}
          erro={erros.telefone}
          autoComplete="tel"
        />
      </div>
      <CampoSelecao
        rotulo="Assunto"
        name="assunto"
        opcoes={ASSUNTOS}
        value={dados.assunto}
        onChange={atualizar}
        erro={erros.assunto}
        required
      />
      <CampoTexto
        rotulo="Mensagem"
        name="mensagem"
        maxLength={500}
        value={dados.mensagem}
        onChange={atualizar}
        erro={erros.mensagem}
        required
      />

      <Botao type="submit" tamanho="lg" carregando={enviando} className="sm:self-start">
        {enviando ? 'Enviando…' : 'Enviar mensagem'}
      </Botao>
    </form>
  )
}
