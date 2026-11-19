export type AssuntoContato = 'duvida' | 'entrega' | 'parceria' | 'acessibilidade'

export type ContatoForm = {
  nome: string
  email: string
  telefone: string
  assunto: AssuntoContato | ''
  mensagem: string
}

export type ErrosContato = Partial<Record<keyof ContatoForm, string>>
