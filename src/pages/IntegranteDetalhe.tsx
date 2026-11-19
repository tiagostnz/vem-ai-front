import { Link, useParams } from 'react-router'
import { IconeGithub, IconeLinkedin } from '../components/icones'
import { CardIntegrante } from '../components/integrantes/CardIntegrante'
import { Container } from '../components/ui/Container'
import { INTEGRANTES } from '../data/integrantes'
import { useTitulo } from '../hooks/useTitulo'
import { NaoEncontrada } from './NaoEncontrada'

export function IntegranteDetalhe() {
  const { slug } = useParams<{ slug: string }>()
  const integrante = INTEGRANTES.find((item) => item.slug === slug)
  useTitulo(integrante?.nome ?? 'Integrante não encontrado')

  if (!integrante) return <NaoEncontrada />

  const outros = INTEGRANTES.filter((item) => item.slug !== integrante.slug)

  return (
    <Container className="py-12 md:py-16">
      <Link to="/integrantes" className="inline-block rounded text-sm font-semibold text-marca-700 hover:underline">
        ← Voltar para a equipe
      </Link>

      <article className="mt-6 grid animate-surgir gap-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-asfalto-200 md:grid-cols-[280px_1fr] md:p-10">
        <img
          src={integrante.foto}
          alt={`Foto de ${integrante.nome}`}
          className={`aspect-square w-full max-w-[280px] rounded-2xl bg-marca-100 object-cover ${integrante.posicaoFoto ?? 'object-top'}`}
        />
        <div>
          <h1 className="text-3xl font-extrabold md:text-4xl">{integrante.nome}</h1>
          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-asfalto-700">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-asfalto-500">RM</dt>
              <dd className="text-lg font-semibold">{integrante.rm}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-asfalto-500">Turma</dt>
              <dd className="text-lg font-semibold">{integrante.turma}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={integrante.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-asfalto-900 px-5 font-semibold text-white hover:bg-asfalto-700"
            >
              <IconeGithub className="h-5 w-5" />
              GitHub
            </a>
            <a
              href={integrante.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0a66c2] px-5 font-semibold text-white hover:brightness-110"
            >
              <IconeLinkedin className="h-5 w-5" />
              LinkedIn
            </a>
          </div>
        </div>
      </article>

      <h2 className="mt-14 text-2xl font-extrabold">Outros integrantes</h2>
      <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {outros.map((item) => (
          <li key={item.slug} className="flex">
            <CardIntegrante integrante={item} compacto />
          </li>
        ))}
      </ul>
    </Container>
  )
}
