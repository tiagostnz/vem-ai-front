export type PerguntaFaq = {
  id: string
  pergunta: string
  resposta: string
}

export const PERGUNTAS: PerguntaFaq[] = [
  {
    id: 'precisa-app',
    pergunta: 'Preciso instalar algum aplicativo?',
    resposta:
      'Não. Você recebe um link pelo WhatsApp e ele abre no navegador do celular. Funciona até em aparelhos simples e com internet fraca.',
  },
  {
    id: 'quando-aviso',
    pergunta: 'Quando eu recebo o aviso?',
    resposta:
      'Quando o entregador está a 3 paradas ou menos da sua casa, o que costuma dar entre 20 e 30 minutos. Antes disso, o rastreio mostra só quantas paradas faltam.',
  },
  {
    id: 'mapa',
    pergunta: 'Por que o mapa não aparece logo?',
    resposta:
      'Por privacidade do entregador. A posição dele só é mostrada para quem está perto de receber, ou seja, com 3 paradas ou menos.',
  },
  {
    id: 'codigo',
    pergunta: 'Onde encontro o código de rastreio?',
    resposta:
      'Ele vem na mensagem do WhatsApp e no comprovante da loja. Tem o formato PC-XXXXXX. Você pode digitá-lo na página Rastrear.',
  },
  {
    id: 'pacotao',
    pergunta: 'O que é o “pacotão”?',
    resposta:
      'É o lote de até 20 encomendas da mesma região que o centro de distribuição monta. Ele tem um QR code: quando o entregador lê, todas as encomendas saem para a rota de uma vez.',
  },
  {
    id: 'ordem',
    pergunta: 'Como a ordem das paradas é definida?',
    resposta:
      'O sistema parte do centro de distribuição e sempre escolhe o endereço mais próximo ainda não visitado. A cada entrega concluída, as paradas restantes de cada cliente são recalculadas.',
  },
  {
    id: 'custo',
    pergunta: 'Quanto custa para quem recebe?',
    resposta: 'Nada. Quem contrata o Vem Aí é a transportadora ou a loja. Para o cidadão, o serviço é gratuito.',
  },
]
