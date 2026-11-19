import { useEffect } from 'react'
import { NavLink } from 'react-router'
import { IconeFechar } from '../icones'
import { LINKS_INSTITUCIONAIS, LINKS_SOLUCAO, type LinkNavegacao } from './links'

type MenuMobileProps = {
  aberto: boolean
  aoFechar: () => void
}

function ListaLinks({ titulo, links, aoFechar }: { titulo: string; links: LinkNavegacao[]; aoFechar: () => void }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-asfalto-500">{titulo}</p>
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.para}>
            <NavLink
              to={link.para}
              end={link.para === '/'}
              onClick={aoFechar}
              className={({ isActive }) =>
                `block rounded-xl px-3 py-3 text-lg font-medium ${
                  isActive ? 'bg-marca-50 text-marca-700' : 'text-asfalto-900 hover:bg-asfalto-100'
                }`
              }
            >
              {link.rotulo}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MenuMobile({ aberto, aoFechar }: MenuMobileProps) {
  // trava o scroll da página e fecha com Esc enquanto o menu está aberto
  useEffect(() => {
    if (!aberto) return

    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === 'Escape') aoFechar()
    }
    document.addEventListener('keydown', aoTeclar)

    return () => {
      document.body.style.overflow = overflowAnterior
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [aberto, aoFechar])

  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu de navegação">
      <button
        type="button"
        aria-label="Fechar menu"
        onClick={aoFechar}
        className="absolute inset-0 bg-asfalto-900/60 backdrop-blur-sm"
      />
      <nav className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm animate-surgir flex-col gap-6 overflow-y-auto bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={aoFechar}
          aria-label="Fechar menu"
          className="flex h-12 w-12 items-center justify-center self-end rounded-xl text-asfalto-700 hover:bg-asfalto-100"
        >
          <IconeFechar className="h-6 w-6" />
        </button>
        <ListaLinks titulo="Na prática" links={LINKS_SOLUCAO} aoFechar={aoFechar} />
        <ListaLinks titulo="Institucional" links={LINKS_INSTITUCIONAIS} aoFechar={aoFechar} />
      </nav>
    </div>
  )
}
