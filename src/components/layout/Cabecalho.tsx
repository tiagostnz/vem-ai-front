import { useCallback, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { IconeMenu, IconePin } from '../icones'
import { LINKS_INSTITUCIONAIS, LINKS_SOLUCAO } from './links'
import { Logo } from './Logo'
import { MenuMobile } from './MenuMobile'

const classeLink = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-[15px] font-medium transition-colors ${
    isActive ? 'text-marca-700' : 'text-asfalto-700 hover:text-asfalto-900'
  }`

export function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)
  const fecharMenu = useCallback(() => setMenuAberto(false), [])

  // o menu fica fora do <header>: o backdrop-blur dele prenderia o position fixed
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-asfalto-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center">
              {[...LINKS_INSTITUCIONAIS, ...LINKS_SOLUCAO.slice(0, 2)].map((link) => (
                <li key={link.para}>
                  <NavLink to={link.para} end={link.para === '/'} className={classeLink}>
                    {link.rotulo}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            to="/rastreio"
            className="hidden items-center gap-2 rounded-full bg-marca-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-marca-800 lg:inline-flex"
          >
            <IconePin className="h-4 w-4" />
            Rastrear
          </Link>

          <button
            type="button"
            onClick={() => setMenuAberto(true)}
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
            className="flex h-12 w-12 items-center justify-center rounded-xl text-asfalto-900 hover:bg-asfalto-100 lg:hidden"
          >
            <IconeMenu className="h-7 w-7" />
          </button>
        </div>
      </header>
      <MenuMobile aberto={menuAberto} aoFechar={fecharMenu} />
    </>
  )
}
