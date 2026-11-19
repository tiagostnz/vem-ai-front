import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variante = 'primario' | 'secundario' | 'fantasma' | 'sucesso'
type Tamanho = 'md' | 'lg'

type BotaoProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: Variante
  tamanho?: Tamanho
  carregando?: boolean
  icone?: ReactNode
}

const VARIANTES: Record<Variante, string> = {
  primario: 'bg-marca-700 text-white hover:bg-marca-800',
  secundario: 'border-2 border-asfalto-900 bg-white text-asfalto-900 hover:bg-asfalto-100',
  fantasma: 'text-asfalto-700 hover:bg-asfalto-100',
  sucesso: 'bg-sucesso text-white hover:brightness-110',
}

// "lg" é o tamanho da tela do entregador: alvo de toque bem maior que 44px
const TAMANHOS: Record<Tamanho, string> = {
  md: 'min-h-11 px-5 text-[15px]',
  lg: 'min-h-14 px-6 text-lg',
}

export function Botao({
  variante = 'primario',
  tamanho = 'md',
  carregando = false,
  icone,
  disabled,
  className = '',
  children,
  type = 'button',
  ...props
}: BotaoProps) {
  return (
    <button
      type={type}
      disabled={disabled || carregando}
      aria-busy={carregando}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTES[variante]} ${TAMANHOS[tamanho]} ${className}`}
      {...props}
    >
      {carregando ? (
        <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        icone
      )}
      {children}
    </button>
  )
}
