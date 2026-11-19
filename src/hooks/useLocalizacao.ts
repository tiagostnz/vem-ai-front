import { useEffect, useRef, useState } from 'react'
import { enviarLocalizacao } from '../services/loteService'
import type { Coordenadas } from '../types/api'

export type EstadoGps = 'desligado' | 'aguardando' | 'ativo' | 'negado' | 'indisponivel'

// a cada quanto tempo a posição vai para a API (30 s, como no plano da solução)
const INTERVALO_ENVIO = 30_000

/**
 * Lê o GPS do celular com a Geolocation API do navegador e envia a posição
 * do lote para a API Java (PUT /lotes/{id}/localizacao) a cada 30 segundos.
 */
export function useLocalizacao(idLote: number, ativo: boolean) {
  const [estado, setEstado] = useState<EstadoGps>('desligado')
  const [ultimoEnvio, setUltimoEnvio] = useState<Date | null>(null)
  const [falhaEnvio, setFalhaEnvio] = useState(false)
  // a posição mais recente fica num ref: muda o tempo todo e não precisa redesenhar a tela
  const posicaoRef = useRef<Coordenadas | null>(null)

  useEffect(() => {
    if (!ativo) {
      setEstado('desligado')
      return
    }
    if (!('geolocation' in navigator)) {
      setEstado('indisponivel')
      return
    }

    setEstado('aguardando')
    let primeiroEnvioFeito = false

    async function enviar() {
      if (!posicaoRef.current) return
      try {
        await enviarLocalizacao(idLote, posicaoRef.current)
        setUltimoEnvio(new Date())
        setFalhaEnvio(false)
      } catch {
        // sem sinal agora: tenta de novo no próximo ciclo, sem travar a tela
        setFalhaEnvio(true)
      }
    }

    // watchPosition avisa sempre que o celular se move
    const idObservador = navigator.geolocation.watchPosition(
      (posicao) => {
        posicaoRef.current = { latitude: posicao.coords.latitude, longitude: posicao.coords.longitude }
        setEstado('ativo')
        // manda logo a primeira posição, sem esperar 30 s
        if (!primeiroEnvioFeito) {
          primeiroEnvioFeito = true
          void enviar()
        }
      },
      (erro) => setEstado(erro.code === erro.PERMISSION_DENIED ? 'negado' : 'indisponivel'),
      { enableHighAccuracy: true, maximumAge: 10_000, timeout: 20_000 },
    )
    const idIntervalo = setInterval(enviar, INTERVALO_ENVIO)

    // ao sair da tela ou terminar a rota, para de usar o GPS (economiza bateria)
    return () => {
      navigator.geolocation.clearWatch(idObservador)
      clearInterval(idIntervalo)
    }
  }, [idLote, ativo])

  return { estado, ultimoEnvio, falhaEnvio }
}
