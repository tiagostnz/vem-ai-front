export type Integrante = {
  slug: string
  nome: string
  rm: string
  turma: string
  foto: string
  /** ajuste do enquadramento da foto (classe object-position do Tailwind) */
  posicaoFoto?: string
  github: string
  linkedin: string
}
