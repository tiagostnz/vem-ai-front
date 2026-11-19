import QRCode from 'qrcode'
import { useEffect, useState } from 'react'

type QrLoteProps = {
  codigo: string
}

/** Gera o QR do pacotão no próprio navegador (SVG), sem chamar serviço externo. */
export function QrLote({ codigo }: QrLoteProps) {
  const [svg, setSvg] = useState<string | null>(null)

  useEffect(() => {
    let ativo = true
    QRCode.toString(codigo, { type: 'svg', margin: 1, color: { dark: '#161a22', light: '#ffffff' } })
      .then((resultado) => {
        if (ativo) setSvg(resultado)
      })
      .catch(() => {
        if (ativo) setSvg(null)
      })
    return () => {
      ativo = false
    }
  }, [codigo])

  return (
    <figure className="rounded-2xl bg-white p-4 text-asfalto-900">
      {svg ? (
        // o SVG vem da biblioteca a partir do nosso próprio código de lote
        <div
          role="img"
          aria-label={`QR code do lote ${codigo}`}
          className="mx-auto aspect-square w-full max-w-[220px] [&>svg]:h-full [&>svg]:w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="mx-auto aspect-square w-full max-w-[220px] animate-pulse rounded-xl bg-asfalto-100" />
      )}
      <figcaption className="mt-3 text-center text-sm">
        O entregador escaneia este código para iniciar a rota.
      </figcaption>
      <button
        type="button"
        onClick={() => window.print()}
        className="mt-3 w-full rounded-xl border-2 border-asfalto-900 py-2.5 text-sm font-semibold hover:bg-asfalto-100 print:hidden"
      >
        Imprimir etiqueta
      </button>
    </figure>
  )
}
