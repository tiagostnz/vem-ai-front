import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { FormularioIniciarRota } from '../components/entregador/FormularioIniciarRota'
import { FormularioLogin } from '../components/entregador/FormularioLogin'
import { IconeMoto, IconeSeta } from '../components/icones'
import { Botao } from '../components/ui/Botao'
import { Container } from '../components/ui/Container'
import { useSessaoEntregador } from '../hooks/useSessaoEntregador'
import { useTitulo } from '../hooks/useTitulo'
import { buscarRotaAtual } from '../services/loteService'
import type { IniciarRotaResponse } from '../types/api'

/** Tela pensada para o celular: uma coluna, textos grandes e botões altos. */
export function Entregador() {
  useTitulo('Entregador')
  const { entregador, entrar, sair } = useSessaoEntregador()
  const navigate = useNavigate()
  const [rotaAtual, setRotaAtual] = useState<IniciarRotaResponse | null>(null)
  const [verificando, setVerificando] = useState(false)

  // se o entregador fechou a aba no meio da rota, oferece continuar de onde parou
  useEffect(() => {
    if (!entregador) {
      setRotaAtual(null)
      return
    }
    let ativo = true
    setVerificando(true)
    buscarRotaAtual(entregador.id)
      .then((rota) => {
        if (ativo) setRotaAtual(rota)
      })
      .catch(() => {
        // 404 = sem rota em andamento: segue para o formulário do QR
        if (ativo) setRotaAtual(null)
      })
      .finally(() => {
        if (ativo) setVerificando(false)
      })
    return () => {
      ativo = false
    }
  }, [entregador])

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
            {verificando && <p className="text-asfalto-500">Verificando se você tem uma rota em andamento…</p>}

            {!verificando && rotaAtual && (
              <div className="rounded-2xl bg-marca-50 p-5">
                <p className="text-sm font-semibold text-marca-800">Rota em andamento</p>
                <p className="mt-1 text-lg">
                  Lote #{rotaAtual.cdLote} com <strong>{rotaAtual.encomendas.length} paradas</strong>.
                </p>
                <Link
                  to={`/entregador/lotes/${rotaAtual.cdLote}`}
                  className="mt-4 flex min-h-14 items-center justify-center gap-2 rounded-xl bg-marca-700 text-lg font-semibold text-white hover:bg-marca-800"
                >
                  Continuar rota
                  <IconeSeta className="h-5 w-5" />
                </Link>
              </div>
            )}

            {!verificando && !rotaAtual && (
              <>
                <p className="text-lg text-asfalto-700">Leia o QR do pacotão para começar a rota.</p>
                {/* a API já devolveu as paradas ordenadas: segue direto para a rota */}
                <FormularioIniciarRota
                  cdEntregador={entregador.id}
                  aoIniciar={(rota) => navigate(`/entregador/lotes/${rota.cdLote}`)}
                />
              </>
            )}
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
