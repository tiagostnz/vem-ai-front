import { useNavigate } from 'react-router'
import { FormularioIniciarRota } from '../components/entregador/FormularioIniciarRota'
import { FormularioLogin } from '../components/entregador/FormularioLogin'
import { IconeMoto } from '../components/icones'
import { Botao } from '../components/ui/Botao'
import { Container } from '../components/ui/Container'
import { useSessaoEntregador } from '../hooks/useSessaoEntregador'
import { useTitulo } from '../hooks/useTitulo'

/** Tela pensada para o celular: uma coluna, textos grandes e botões altos. */
export function Entregador() {
  useTitulo('Entregador')
  const { entregador, entrar, sair } = useSessaoEntregador()
  const navigate = useNavigate()

  return (
    <Container className="max-w-lg py-10">
      <div className="mb-8 flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-asfalto-900 text-marca-500">
          <IconeMoto className="h-8 w-8" />
        </span>
        <div>
          <p className="text-sm font-semibold tracking-wider text-marca-700 uppercase">Área do entregador</p>
          <h1 className="text-3xl font-extrabold">
            {entregador ? `Olá, ${entregador.nome.split(' ')[0]}!` : 'Entrar'}
          </h1>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-asfalto-200">
        {entregador ? (
          <div className="flex flex-col gap-4">
            <p className="text-lg text-asfalto-700">Leia o QR do pacotão para começar a rota.</p>
            {/* a API já devolveu as paradas ordenadas: segue direto para a rota */}
            <FormularioIniciarRota
              cdEntregador={entregador.id}
              aoIniciar={(rota) => navigate(`/entregador/lotes/${rota.cdLote}`)}
            />
            <Botao variante="fantasma" onClick={sair}>
              Sair
            </Botao>
          </div>
        ) : (
          <FormularioLogin aoEntrar={entrar} />
        )}
      </div>
    </Container>
  )
}
