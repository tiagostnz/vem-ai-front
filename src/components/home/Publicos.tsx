import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { IconeCaixa, IconeMoto, IconePin, IconeSeta } from '../icones'
import { Container } from '../ui/Container'

type Publico = {
  quem: string
  titulo: string
  texto: string
  para: string
  acao: string
  icone: ReactNode
}

const PUBLICOS: Publico[] = [
  {
    quem: 'Cidadão',
    titulo: 'Sai de casa sem medo de perder a entrega',
    texto: 'Abre o link no navegador de qualquer celular, sem cadastro e sem baixar app.',
    para: '/rastreio',
    acao: 'Rastrear encomenda',
    icone: <IconePin className="h-6 w-6" />,
  },
  {
    quem: 'Operador do CD',
    titulo: 'Monta os pacotões por região',
    texto: 'Cria lotes, bipa encomendas e acompanha quais já saíram para a rua.',
    para: '/operador',
    acao: 'Abrir painel',
    icone: <IconeCaixa className="h-6 w-6" />,
  },
  {
    quem: 'Entregador',
    titulo: 'Rota pronta e botões grandes',
    texto: 'Lê o QR, segue a ordem das paradas e confirma cada entrega com um toque.',
    para: '/entregador',
    acao: 'Entrar como entregador',
    icone: <IconeMoto className="h-6 w-6" />,
  },
]

const ODS = [
  { numero: 9, nome: 'Indústria, inovação e infraestrutura', cor: 'bg-[#a8461b]' },
  { numero: 10, nome: 'Redução das desigualdades', cor: 'bg-[#b5134f]' },
  { numero: 11, nome: 'Cidades e comunidades sustentáveis', cor: 'bg-[#a35c00]' },
]

export function Publicos() {
  return (
    <section aria-labelledby="publicos" className="bg-asfalto-900 py-20 text-white">
      <Container>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-marca-500">Para quem</p>
        <h2 id="publicos" className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          Uma solução, três pessoas atendidas
        </h2>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {PUBLICOS.map((publico) => (
            <li key={publico.quem} className="flex flex-col rounded-3xl bg-asfalto-700/50 p-6 ring-1 ring-white/10">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-marca-700">
                {publico.icone}
              </span>
              <p className="mt-5 text-sm font-semibold text-marca-500">{publico.quem}</p>
              <h3 className="mt-1 text-xl font-bold">{publico.titulo}</h3>
              <p className="mt-2 flex-1 text-asfalto-200">{publico.texto}</p>
              <Link
                to={publico.para}
                className="mt-6 inline-flex items-center gap-2 self-start rounded-lg py-1 font-semibold text-white underline decoration-marca-500 decoration-2 underline-offset-4 hover:decoration-white"
              >
                {publico.acao}
                <IconeSeta className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 rounded-3xl bg-white p-6 text-asfalto-900 md:p-10">
          <h3 className="text-2xl font-extrabold">Conectado aos Objetivos de Desenvolvimento Sustentável</h3>
          <p className="mt-2 text-asfalto-500">
            Tempo devolvido ao cidadão e acesso sem app, inclusive para idosos e quem tem celular simples.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {ODS.map((ods) => (
              <li key={ods.numero} className={`flex items-center gap-3 rounded-2xl p-4 text-white ${ods.cor}`}>
                <span className="font-display text-4xl font-extrabold">{ods.numero}</span>
                <span className="text-sm font-semibold leading-tight">{ods.nome}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
