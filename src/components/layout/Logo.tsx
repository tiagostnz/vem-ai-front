import { Link } from 'react-router'

type LogoProps = {
  claro?: boolean
}

export function Logo({ claro = false }: LogoProps) {
  return (
    <Link to="/" className="flex items-center gap-2.5 rounded-lg" aria-label="Vem Aí, página inicial">
      <img src="/img/logo.jpeg" alt="" className="h-10 w-10 rounded-xl" />
      <span
        className={`font-display text-2xl font-extrabold tracking-tight ${claro ? 'text-white' : 'text-asfalto-900'}`}
      >
        Vem <span className={claro ? 'text-marca-500' : 'text-marca-700'}>Aí</span>
      </span>
    </Link>
  )
}
