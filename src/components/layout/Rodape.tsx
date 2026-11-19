import { Link } from 'react-router'
import { INTEGRANTES } from '../../data/integrantes'
import { LINKS_INSTITUCIONAIS, LINKS_SOLUCAO } from './links'
import { IconeGithub } from '../icones'
import { Logo } from './Logo'

// links que o avaliador procura: código do front e a API Java publicada
const LINKS_PROJETO = [
  { href: 'https://github.com/tiagostnz/vem-ai-front', rotulo: 'Código no GitHub' },
  { href: 'https://vem-ai-gs.onrender.com/lotes', rotulo: 'API Java (Render)' },
]

const classeLink = 'rounded text-sm text-asfalto-200 transition-colors hover:text-white'

export function Rodape() {
  return (
    <footer className="bg-asfalto-900 text-white">
      {/* faixa tracejada lembrando a pista de uma rua */}
      <div
        aria-hidden="true"
        className="h-1.5 bg-[repeating-linear-gradient(90deg,var(--color-marca-500)_0_28px,transparent_28px_48px)]"
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo claro />
          <p className="mt-4 text-sm leading-relaxed text-asfalto-200">
            Você só é avisado quando o entregador está a poucas paradas. Sem app, sem ficar preso em casa o dia inteiro.
          </p>
        </div>

        <nav aria-label="Solução">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider text-marca-500">Na prática</h2>
          <ul className="flex flex-col gap-2.5">
            {LINKS_SOLUCAO.map((link) => (
              <li key={link.para}>
                <Link to={link.para} className={classeLink}>
                  {link.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Institucional">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider text-marca-500">
            Institucional
          </h2>
          <ul className="flex flex-col gap-2.5">
            {LINKS_INSTITUCIONAIS.map((link) => (
              <li key={link.para}>
                <Link to={link.para} className={classeLink}>
                  {link.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider text-marca-500">Equipe</h2>
          <ul className="flex flex-col gap-2.5">
            {INTEGRANTES.map((integrante) => (
              <li key={integrante.slug}>
                <Link to={`/integrantes/${integrante.slug}`} className={classeLink}>
                  {integrante.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-xs text-asfalto-200 sm:flex-row sm:justify-between sm:px-6">
          <p>Vem Aí · Global Solution 2026 · CitizenTech</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {LINKS_PROJETO.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded hover:text-white"
                >
                  {link.href.includes('github.com') && <IconeGithub className="h-3.5 w-3.5" />}
                  {link.rotulo}
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
          <p>FIAP · Turma 1TDSPJ</p>
        </div>
      </div>
    </footer>
  )
}
