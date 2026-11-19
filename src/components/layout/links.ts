export type LinkNavegacao = {
  para: string
  rotulo: string
}

export const LINKS_INSTITUCIONAIS: LinkNavegacao[] = [
  { para: '/', rotulo: 'Início' },
  { para: '/sobre', rotulo: 'Sobre' },
  { para: '/integrantes', rotulo: 'Integrantes' },
  { para: '/faq', rotulo: 'FAQ' },
  { para: '/contato', rotulo: 'Contato' },
]

export const LINKS_SOLUCAO: LinkNavegacao[] = [
  { para: '/operador', rotulo: 'Operador do CD' },
  { para: '/entregador', rotulo: 'Entregador' },
  { para: '/rastreio', rotulo: 'Rastrear encomenda' },
]
