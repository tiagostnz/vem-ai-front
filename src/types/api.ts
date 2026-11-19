// Tipos espelhando os DTOs da API Java (pacote br.com.fiap.vem_ai.dto).
// Datas chegam como string ISO (LocalDateTime serializado pelo Jackson).

export type StatusLote = 'MONTAGEM' | 'EM_ROTA' | 'CONCLUIDO'
export type StatusEncomenda = 'NO_CD' | 'EM_ROTA' | 'ENTREGUE' | 'FALHA'
export type TipoEvento = 'EM_ROTA' | 'AVISO_ENVIADO' | 'ENTREGUE' | 'FALHA'
export type TipoUsuario = 'ENTREGADOR' | 'CLIENTE'
export type StatusEntregador = 'DISPONIVEL' | 'INDISPONIVEL'

export type Coordenadas = {
  latitude: number
  longitude: number
}

export type Lote = {
  cdLote: number
  cdCentro: number
  cdEntregador: number
  codigoQr: string
  status: StatusLote
  dtCriacao: string
  dtInicioRota: string | null
  latitudeAtual: number | null
  longitudeAtual: number | null
}

export type LoteRequest = {
  cdCentro: number
  cdEntregador: number
}

export type Encomenda = {
  cdEncomenda: number
  cdCentro: number
  cdLote: number
  cdCliente: number
  codigoRastreio: string
  nrPosicaoRota: number | null
  status: StatusEncomenda
}

export type EncomendaRequest = {
  cdCentro: number
  cdCliente: number
}

/** Resposta do POST /encomendas: a API já escolhe o lote do entregador da região. */
export type EncomendaBipada = {
  cdEncomenda: number
  codigoRastreio: string
  status: StatusEncomenda
  cdLote: number
  cdEntregador: number
  nmEntregador: string
}

export type ClienteParada = {
  nmCliente: string
  dsEndereco: string
  latitude: number
  longitude: number
}

export type Parada = {
  cdEncomenda: number
  nrPosicaoRota: number | null
  cliente: ClienteParada
}

export type IniciarRotaRequest = {
  codigoQr: string
  cdEntregador: number
}

export type IniciarRotaResponse = {
  cdLote: number
  status: StatusLote
  encomendas: Parada[]
}

export type EntregaResponse = {
  cdEncomenda: number
  status: StatusEncomenda
  paradasRestantesNoLote: number
  /** ids das encomendas que receberam o aviso "faltam poucas paradas" agora */
  avisados: number[]
}

export type Rastreio = {
  codigoRastreio: string
  status: StatusEncomenda
  paradasRestantes: number | null
  /** só vira true quando faltam 3 paradas ou menos */
  exibirMapa: boolean
  posicaoEntregador: Coordenadas | null
  destino: Coordenadas | null
}

export type Evento = {
  cdEvento: number
  cdEncomenda: number
  tipo: TipoEvento
  dtEvento: string
}

export type LoginRequest = {
  tipo: TipoUsuario
  dsEmail: string
  senha: string
}

export type LoginResponse = {
  id: number
  tipo: TipoUsuario
  nome: string
}

export type Entregador = {
  cdEntregador: number
  nmEntregador: string
  dsEmail: string
  nrTelefone: string
  status: StatusEntregador
  regioes: number[]
}

export type Centro = {
  cdCentro: number
  nmCentro: string
  dsEndereco: string
  latitude: number
  longitude: number
}

export type Cliente = {
  cdCliente: number
  nmCliente: string
  dsEmail: string
  nrWhatsapp: string
  dsEndereco: string
  latitude: number
  longitude: number
  cdRegiao: number
}

/** Corpo padronizado de erro do @RestControllerAdvice da API. */
export type ErroApi = {
  status: number
  erro: string
  mensagem: string
  campos: Record<string, string> | null
}
