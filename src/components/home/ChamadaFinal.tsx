import { Link } from 'react-router'
import { IconePin, IconeSeta } from '../icones'
import { Container } from '../ui/Container'

/** Último bloco da Home: convida a testar o rastreio ou entender a solução. */
export function ChamadaFinal() {
  return (
    <section aria-labelledby="chamada-final" className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-marca-700 px-6 py-14 text-center text-white md:px-16">
          {/* círculos decorativos no fundo */}
          <span aria-hidden="true" className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10" />
          <span aria-hidden="true" className="absolute -right-16 -bottom-28 h-72 w-72 rounded-full bg-marca-800/60" />

          <div className="relative">
            <h2 id="chamada-final" className="mx-auto max-w-2xl text-3xl font-extrabold text-balance md:text-5xl">
              Saia de casa. A gente avisa quando estiver chegando.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-marca-50">
              Tem um código de rastreio? Veja agora quantas paradas faltam até você.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/rastreio"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-marca-800 transition-colors hover:bg-marca-50"
              >
                <IconePin className="h-5 w-5" />
                Rastrear encomenda
              </Link>
              <Link
                to="/faq"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border-2 border-white px-6 font-semibold transition-colors hover:bg-white/10"
              >
                Tirar dúvidas
                <IconeSeta className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
