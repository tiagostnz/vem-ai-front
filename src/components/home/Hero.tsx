import { Link } from 'react-router'
import { IconePin, IconeRelogio, IconeSeta, IconeWhatsapp } from '../icones'
import { Container } from '../ui/Container'
import { LinhaParadas } from './LinhaParadas'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* brilho laranja decorativo no canto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-marca-200/60 blur-3xl"
      />

      <Container className="relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div className="animate-surgir">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-marca-50 px-4 py-1.5 text-sm font-semibold text-marca-800">
            <IconeRelogio className="h-4 w-4" />
            Seu dia de volta
          </p>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl">
            Pare de esperar a entrega <span className="text-marca-700">o dia inteiro.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-asfalto-500">
            “Em rota de entrega” desde as 8h e o pacote só chega à noite? Com o Vem Aí, você recebe um link no
            WhatsApp quando o entregador está a <strong className="text-asfalto-900">2 ou 3 paradas</strong> da sua
            casa. Sem instalar nada.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/rastreio"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-marca-700 px-6 font-semibold text-white transition-colors hover:bg-marca-800"
            >
              <IconePin className="h-5 w-5" />
              Rastrear minha encomenda
            </Link>
            <Link
              to="/sobre"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border-2 border-asfalto-900 px-6 font-semibold transition-colors hover:bg-asfalto-100"
            >
              Entender a ideia
              <IconeSeta className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* prévia de como o cidadão vê a entrega no celular */}
        <div className="mx-auto w-full max-w-sm animate-surgir [animation-delay:150ms]" aria-hidden="true">
          <div className="rounded-[2.5rem] border-8 border-asfalto-900 bg-asfalto-50 p-5 shadow-2xl">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                <IconeWhatsapp className="h-5 w-5" />
              </span>
              <div className="text-sm">
                <p className="font-semibold">Vem Aí</p>
                <p className="text-asfalto-500">Seu pedido está chegando! 🛵</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-asfalto-500">Encomenda PC-3BBHQV</p>
              <p className="mt-2 font-display text-5xl font-extrabold text-marca-700">2</p>
              <p className="font-semibold">paradas até você</p>
              <p className="mb-5 text-sm text-asfalto-500">Cerca de 20 minutos</p>
              <LinhaParadas total={6} concluidas={3} posicaoCliente={6} />
            </div>

            <div className="mt-4 grid h-28 place-items-center rounded-2xl bg-[radial-gradient(circle_at_30%_40%,var(--color-marca-100),transparent_60%),repeating-linear-gradient(45deg,var(--color-asfalto-100)_0_2px,transparent_2px_14px)] bg-white">
              <IconePin className="h-9 w-9 text-marca-700" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
