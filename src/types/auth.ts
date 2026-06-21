export interface UserProfile {
  id: string;
  nome: string;
  email: string;
  foto_url: string | null;
  tipo_deficiencia?: string | null;
  data_criacao: string; 
}
