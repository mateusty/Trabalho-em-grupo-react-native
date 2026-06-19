export type CategoriaNome = 'rampa_bloqueada' | 'elevador_quebrado' | 'calcada_irregular' | 'objeto_aereo' | 'outro';

export interface Categoria {
  nome: CategoriaNome;
  label: string;
  emoji: string;
}