import { linkRastreio } from '../../utils/rastreio'
import { IconeWhatsapp } from '../icones'

type BotaoWhatsappProps = {
  /** número do cliente como vem da API, ex.: 11988880001 */
  telefone: string
  nomeCliente: string
  codigoRastreio: string
}

/** Monta o link wa.me com DDI 55 (Brasil) e a mensagem já escrita. */
function montarLinkWhatsapp(telefone: string, mensagem: string): string {
  let numero = telefone.replace(/\D/g, '')
  if (!numero.startsWith('55')) numero = `55${numero}`
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
}

/**
 * Simula o aviso automático: abre o WhatsApp com a mensagem pronta.
 * A integração real (API do WhatsApp Business) fica como evolução do projeto.
 */
export function BotaoWhatsapp({ telefone, nomeCliente, codigoRastreio }: BotaoWhatsappProps) {
  const primeiroNome = nomeCliente.split(' ')[0]
  const mensagem =
    `Olá, ${primeiroNome}! Sua encomenda ${codigoRastreio} está chegando 🛵\n` +
    `Acompanhe o entregador ao vivo, sem instalar nada: ${linkRastreio(codigoRastreio)}`

  return (
    <a
      href={montarLinkWhatsapp(telefone, mensagem)}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-green-700 px-3 text-sm font-semibold text-white hover:bg-green-800"
    >
      <IconeWhatsapp className="h-4 w-4" />
      Avisar no WhatsApp
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  )
}
