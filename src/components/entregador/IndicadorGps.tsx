import type { EstadoGps } from '../../hooks/useLocalizacao'
import { IconePin } from '../icones'

type IndicadorGpsProps = {
  estado: EstadoGps
  ultimoEnvio: Date | null
  falhaEnvio: boolean
}

// texto + cor para cada estado: a informação nunca depende só da cor
const ESTADOS: Record<EstadoGps, { titulo: string; texto: string; classe: string }> = {
  desligado: {
    titulo: 'GPS desligado',
    texto: 'A localização é compartilhada só durante a rota.',
    classe: 'bg-asfalto-100 text-asfalto-700',
  },
  aguardando: {
    titulo: 'Procurando sinal de GPS…',
    texto: 'Se o navegador perguntar, toque em Permitir.',
    classe: 'bg-marca-50 text-marca-800',
  },
  ativo: {
    titulo: 'Localização compartilhada',
    texto: 'Os clientes próximos veem você no mapa.',
    classe: 'bg-green-50 text-green-900',
  },
  negado: {
    titulo: 'Permissão de localização negada',
    texto: 'Libere a localização nas configurações do navegador para os clientes verem você chegando.',
    classe: 'bg-red-50 text-red-900',
  },
  indisponivel: {
    titulo: 'GPS indisponível',
    texto: 'Este aparelho não informou a localização. A rota continua funcionando normalmente.',
    classe: 'bg-red-50 text-red-900',
  },
}

export function IndicadorGps({ estado, ultimoEnvio, falhaEnvio }: IndicadorGpsProps) {
  const { titulo, texto, classe } = ESTADOS[estado]

  return (
    <div role="status" className={`flex items-start gap-3 rounded-2xl p-4 ${classe}`}>
      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        {estado === 'ativo' && (
          <span aria-hidden="true" className="absolute inset-0 animate-pulso rounded-full bg-green-500/40" />
        )}
        <IconePin className="relative h-5 w-5" />
      </span>
      <div className="text-sm">
        <p className="font-semibold">{titulo}</p>
        <p>{texto}</p>
        {estado === 'ativo' && ultimoEnvio && !falhaEnvio && (
          <p className="mt-1 text-xs">Última posição enviada às {ultimoEnvio.toLocaleTimeString('pt-BR')}</p>
        )}
        {estado === 'ativo' && falhaEnvio && (
          <p className="mt-1 text-xs font-semibold">Sem sinal de internet agora. Tentando de novo em 30 s.</p>
        )}
      </div>
    </div>
  )
}
