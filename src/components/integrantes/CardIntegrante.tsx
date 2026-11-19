import { Link } from 'react-router'
import type { Integrante } from '../../types/integrante'

type CardIntegranteProps = {
  integrante: Integrante
  compacto?: boolean
}

export function CardIntegrante({ integrante, compacto = false }: CardIntegranteProps) {
  return (
    <Link
      to={`/integrantes/${integrante.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-asfalto-200 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`overflow-hidden bg-marca-100 ${compacto ? 'aspect-[4/3]' : 'aspect-square'}`}>
        <img
          src={integrante.foto}
          alt={`Foto de ${integrante.nome}`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className={`font-bold leading-tight ${compacto ? 'text-base' : 'text-xl'}`}>{integrante.nome}</h2>
        <p className="mt-2 text-sm text-asfalto-500">
          RM {integrante.rm} · {integrante.turma}
        </p>
      </div>
    </Link>
  )
}
