import { DisabilityType, ObstacleCategory } from "../types/obstacle"

export const formatarData = (data: string): string => {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
export const DisabilityTypeByCategory: Record<DisabilityType, ObstacleCategory[]> = {
  cadeirante: ['rampa_bloqueada', 'calcada_obstruida', 'elevador_quebrado', 'buraco'],
  mobilidade_reduzida: ['rampa_bloqueada', 'calcada_obstruida', 'elevador_quebrado', 'buraco'],
  visual: ['objeto_aereo', 'semaforo_quebrado', 'calcada_obstruida', 'buraco'],
  outro: ['falta_de_acessibilidade', 'outro'],
}