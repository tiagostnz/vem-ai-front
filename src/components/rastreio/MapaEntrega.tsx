import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import type { Coordenadas } from '../../types/api'

type MapaEntregaProps = {
  destino: Coordenadas
  /** null enquanto o celular do entregador ainda não mandou a posição */
  entregador: Coordenadas | null
}

// Marcadores feitos com HTML + Tailwind (divIcon): evita o bug dos ícones
// padrão do Leaflet, que somem quando o projeto é empacotado pelo Vite.
function criarIcone(emoji: string, cor: string) {
  return L.divIcon({
    className: '',
    html: `<span class="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white text-lg shadow-lg ${cor}">${emoji}</span>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })
}

const ICONE_CASA = criarIcone('🏠', 'bg-marca-700')
const ICONE_ENTREGADOR = criarIcone('🛵', 'bg-asfalto-900')

/** Mapa do OpenStreetMap com a casa do cidadão e, quando houver, o entregador. */
export function MapaEntrega({ destino, entregador }: MapaEntregaProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const mapaRef = useRef<L.Map | null>(null)
  const entregadorRef = useRef<L.Marker | null>(null)

  // cria o mapa uma única vez, quando a div aparece na tela
  useEffect(() => {
    if (!divRef.current || mapaRef.current) return

    const mapa = L.map(divRef.current, { scrollWheelZoom: false }).setView([destino.latitude, destino.longitude], 16)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    }).addTo(mapa)
    L.marker([destino.latitude, destino.longitude], { icon: ICONE_CASA, title: 'Seu endereço' }).addTo(mapa)
    mapaRef.current = mapa

    return () => {
      mapa.remove()
      mapaRef.current = null
      entregadorRef.current = null
    }
  }, [destino.latitude, destino.longitude])

  // a cada atualização da API, move o entregador e enquadra os dois pontos
  useEffect(() => {
    const mapa = mapaRef.current
    if (!mapa || !entregador) return

    const posicao: L.LatLngTuple = [entregador.latitude, entregador.longitude]
    if (entregadorRef.current) {
      entregadorRef.current.setLatLng(posicao)
    } else {
      entregadorRef.current = L.marker(posicao, { icon: ICONE_ENTREGADOR, title: 'Entregador' }).addTo(mapa)
    }
    mapa.fitBounds([posicao, [destino.latitude, destino.longitude]], { padding: [48, 48], maxZoom: 17 })
  }, [entregador, destino.latitude, destino.longitude])

  return (
    <div
      ref={divRef}
      role="img"
      aria-label={
        entregador
          ? 'Mapa mostrando a posição do entregador e o seu endereço'
          : 'Mapa mostrando o seu endereço. A posição do entregador aparece assim que ele compartilhar o GPS.'
      }
      className="relative z-0 h-72 w-full overflow-hidden rounded-2xl ring-1 ring-asfalto-200 md:h-96"
    />
  )
}
