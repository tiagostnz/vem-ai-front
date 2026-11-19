import { IconeAcessivel, IconeCheck, IconeQr, IconeRelogio, IconeWhatsapp } from '../components/icones'
import { CabecalhoPagina } from '../components/ui/CabecalhoPagina'
import { Container } from '../components/ui/Container'
import { useTitulo } from '../hooks/useTitulo'

const DIFERENCIAIS = [
  {
    titulo: 'Lote com QR',
    texto: 'Um único QR muda o status de até 20 encomendas e já define a ordem da rota.',
    icone: IconeQr,
  },
  {
    titulo: 'Aviso só quando falta pouco',
    texto: 'Nada de “em rota” às 8h. O cidadão é avisado com 2 ou 3 paradas de antecedência.',
    icone: IconeRelogio,
  },
  {
    titulo: 'Sem instalar app',
    texto: 'O link chega pelo WhatsApp e abre no navegador, inclusive em celulares simples.',
    icone: IconeWhatsapp,
  },
  {
    titulo: 'Acessível de verdade',
    texto: 'Contraste AA, foco visível, textos simples e botões grandes na tela do entregador.',
    icone: IconeAcessivel,
  },
]

// o que foi feito na interface para incluir mais pessoas (requisitos não funcionais)
const ACESSIBILIDADE = [
  'Contraste mínimo AA (WCAG) em textos e botões',
  'Foco bem visível para quem navega pelo teclado',
  'Botões da tela do entregador com mais de 44 × 44 px, fáceis de tocar na rua',
  'Rótulos, mensagens de erro e status lidos pelo leitor de tela',
  'Animações desligadas para quem pede menos movimento no sistema',
  'Textos curtos e palavras simples, pensados também para pessoas idosas',
]

const CONCORRENTES = [
  { nome: 'Amazon Map Tracking', limite: 'Só aparece com menos de 10 paradas e exige o app da loja.' },
  { nome: 'Correios', limite: 'Link em tempo real, mas sem aviso proativo de quando está perto.' },
  { nome: 'Loggi', limite: 'Acompanhamento no app, focado no lojista e não em quem recebe.' },
]

export function Sobre() {
  useTitulo('Sobre')

  return (
    <>
      <CabecalhoPagina
        etiqueta="Sobre o projeto"
        titulo="Quem espera uma encomenda não deveria perder o dia"
        descricao="O Vem Aí nasceu de uma dor comum: o rastreio diz “saiu para entrega” cedo, a encomenda só chega à noite e a pessoa fica presa em casa com medo de perder."
      />

      <Container className="grid gap-14 py-16 lg:grid-cols-2">
        <section aria-labelledby="problema">
          <h2 id="problema" className="text-3xl font-extrabold">
            O problema
          </h2>
          <div className="mt-4 space-y-4 text-lg text-asfalto-700">
            <p>
              “Em rota de entrega” é uma informação vaga: pode significar 10 minutos ou 10 horas. Quem trabalha, cuida
              de alguém ou depende de transporte público acaba reorganizando o dia inteiro em torno de uma janela que
              ninguém informa.
            </p>
            <p>Para a transportadora, cliente ausente vira entrega frustrada, nova tentativa e ligação no SAC.</p>
          </div>
        </section>

        <section aria-labelledby="solucao">
          <h2 id="solucao" className="text-3xl font-extrabold">
            A solução
          </h2>
          <div className="mt-4 space-y-4 text-lg text-asfalto-700">
            <p>
              No centro de distribuição, as encomendas são agrupadas em <strong>pacotões por região</strong>. O
              entregador lê o QR do lote, o sistema ordena as paradas pela mais próxima e, a cada entrega, recalcula
              quantas faltam para cada cliente.
            </p>
            <p>
              Quando faltam <strong>3 paradas ou menos</strong>, o cliente recebe um link com o mapa e a posição do
              entregador ao vivo.
            </p>
          </div>
        </section>
      </Container>

      <section aria-labelledby="diferenciais" className="bg-white py-16">
        <Container>
          <h2 id="diferenciais" className="text-3xl font-extrabold">
            O que muda com o Vem Aí
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DIFERENCIAIS.map(({ titulo, texto, icone: Icone }) => (
              <li key={titulo} className="rounded-3xl bg-asfalto-50 p-6">
                <Icone className="h-8 w-8 text-marca-700" />
                <h3 className="mt-4 text-lg font-bold">{titulo}</h3>
                <p className="mt-2 text-asfalto-500">{texto}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="acessibilidade" className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <IconeAcessivel className="h-12 w-12 text-marca-700" />
            <h2 id="acessibilidade" className="mt-4 text-3xl font-extrabold">
              Acessibilidade não é extra
            </h2>
            <p className="mt-3 text-lg text-asfalto-500">
              Muitos apps de entrega esquecem de quem enxerga pouco, usa celular simples ou trabalha com pressa na rua.
              No Vem Aí, isso faz parte dos requisitos desde o começo.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {ACESSIBILIDADE.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-asfalto-200">
                <IconeCheck className="mt-0.5 h-5 w-5 shrink-0 text-sucesso" />
                <span className="text-asfalto-700">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="pb-16">
        <h2 className="text-3xl font-extrabold">O que já existe e onde para</h2>
        <p className="mt-3 max-w-2xl text-lg text-asfalto-500">
          Mapa de entregador não é novidade. O diferencial é juntar lote com QR, aviso na hora certa e acesso sem app.
        </p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-asfalto-200 bg-white">
          <table className="w-full text-left">
            <caption className="sr-only">Comparação com soluções existentes</caption>
            <thead className="bg-asfalto-900 text-sm text-white">
              <tr>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Solução
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Limitação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-asfalto-200">
              {CONCORRENTES.map((item) => (
                <tr key={item.nome}>
                  <th scope="row" className="px-5 py-4 align-top font-semibold">
                    {item.nome}
                  </th>
                  <td className="px-5 py-4 text-asfalto-700">{item.limite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  )
}
