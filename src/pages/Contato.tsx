import { FormularioContato } from '../components/contato/FormularioContato'
import { IconeRelogio, IconeWhatsapp } from '../components/icones'
import { CabecalhoPagina } from '../components/ui/CabecalhoPagina'
import { Container } from '../components/ui/Container'
import { useTitulo } from '../hooks/useTitulo'

export function Contato() {
  useTitulo('Contato')

  return (
    <>
      <CabecalhoPagina
        etiqueta="Contato"
        titulo="Fale com a gente"
        descricao="Dúvidas, problemas com uma entrega ou interesse em levar o Vem Aí para a sua operação."
      />
      <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_320px]">
        <FormularioContato />

        <aside className="flex flex-col gap-4">
          <div className="rounded-3xl bg-asfalto-900 p-6 text-white">
            <IconeWhatsapp className="h-8 w-8 text-marca-500" />
            <h2 className="mt-4 text-xl font-bold">Atendimento</h2>
            <p className="mt-2 text-asfalto-200">contato@vemai.com.br</p>
          </div>
          <div className="rounded-3xl bg-marca-50 p-6">
            <IconeRelogio className="h-8 w-8 text-marca-700" />
            <h2 className="mt-4 text-xl font-bold">Horário</h2>
            <p className="mt-2 text-asfalto-700">Segunda a sábado, das 8h às 20h, o mesmo horário das entregas.</p>
          </div>
        </aside>
      </Container>
    </>
  )
}
