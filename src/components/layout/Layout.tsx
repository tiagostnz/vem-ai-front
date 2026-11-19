import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'

export function Layout() {
  const { pathname } = useLocation()

  // ao trocar de página, volta ao topo (SPA não faz isso sozinho)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold"
      >
        Pular para o conteúdo
      </a>
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
