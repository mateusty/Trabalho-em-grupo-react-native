export type ObstacleCategory =
  | 'buraco'
  | 'rampa_bloqueada'
  | 'elevador_quebrado'
  | 'objeto_aereo'
  | 'calcada_obstruida'
  | 'semaforo_quebrado'  
  | 'falta_de_acessibilidade' 
  | 'outro';

export type GravityLevel = 'resolvido' | 'intermediario' | 'inacessivel'

export type DisabilityType =
  | 'visual'  
  | 'cadeirante'
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
export type ObstacleCardType = Omit<Obstacle, 'profile_id' | 'latitude' | 'longitude' | 'foto_url'>