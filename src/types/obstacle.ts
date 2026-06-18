export type ObstacleCategory =
  | 'buraco'
  | 'rampa_bloqueada'
  | 'elevador_quebrado'
  | 'semaforo_sonoro'
  | 'objeto_aereo'

export type GravityLevel = 'baixa' | 'media' | 'alta'

export type DisabilityType =
  | 'cadeirante'
  | 'visual'
  | 'mobilidade_reduzida'
  | 'outro'


export interface Obstacle {
  id: number
  data_criacao: string
  profile_id: string
  categoria: ObstacleCategory
  gravidade: GravityLevel
  descricao: string
  latitude: number
  longitude: number
  foto_url: string | null
}


export type NewObstacle = Omit<Obstacle, 'id' | 'data_criacao'>