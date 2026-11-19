type CarregandoProps = {
  mensagem?: string
}

export function Carregando({ mensagem = 'Carregando…' }: CarregandoProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-14 text-asfalto-500">
      <span aria-hidden="true" className="h-9 w-9 animate-spin rounded-full border-4 border-marca-200 border-t-marca-700" />
      <p className="text-sm font-medium">{mensagem}</p>
      <p className="max-w-xs text-center text-xs">
        Se demorar, o servidor pode estar acordando. A primeira chamada leva até um minuto.
      </p>
    </div>
  )
}
