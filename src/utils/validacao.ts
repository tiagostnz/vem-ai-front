// Regras de validação reaproveitadas pelos formulários.

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Aceita (11) 91234-5678, 11912345678, +55 11 91234-5678... conta só os dígitos. */
export function telefoneValido(valor: string): boolean {
  const digitos = valor.replace(/\D/g, '')
  return digitos.length >= 10 && digitos.length <= 13
}

/** Formata enquanto a pessoa digita: (11) 91234-5678 */
export function mascararTelefone(valor: string): string {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}
