import { supabase } from './supabaseClient';
import { fazerUploadFoto } from './fotoService';
import { DadosObstaculo } from '../types/obstacle';


export const criarObstaculo = async (dados: DadosObstaculo) => {
  try {
    const urls: string[] = [];

    for (const fotoUri of dados.fotos) {
      const url = await fazerUploadFoto(fotoUri);
      if (url) {
        urls.push(url);
      }
    }

    const { data, error } = await supabase
      .from('obstaculos') 
      .insert([
        { 
         profile_id: dados.profile_id,
         categoria: dados.categoria,
         latitude: dados.latitude,
         longitude: dados.longitude,
         descricao: dados.descricao,
         gravidade: dados.gravidade,
         fotos_urls: urls, 
        },
      ])
      .select();

    if (error) throw error;

    return { sucesso: true, data };

  } catch (error: any) {
    console.error('Erro ao salvar obstáculo no banco:', error.message);
    return { sucesso: false, erro: error.message };
  }
};

export const obterObstaculos = async () => {
  try {
    const { data, error } = await supabase
      .from('obstaculos')
      .select('*')
      .order('data_criacao', { ascending: false });

    if (error) throw error;

    return { sucesso: true, data };

  } catch (error: any) {
    console.error('Erro ao buscar obstáculos no banco:', error.message);
    return { sucesso: false, erro: error.message };
  }
};

export const atualizarObstaculo = async (id: string | number, dadosParaAtualizar: Partial<DadosObstaculo>) => {
  try {
    const { data, error } = await supabase
      .from('obstaculos')
      .update({
        categoria: dadosParaAtualizar.categoria,
        descricao: dadosParaAtualizar.descricao,
        gravidade: dadosParaAtualizar.gravidade,
        latitude: dadosParaAtualizar.latitude,
        longitude: dadosParaAtualizar.longitude,
      })
      .eq('id', id)
      .select();

    if (error) throw error;

    return { sucesso: true, data };

  } catch (error: any) {
    console.error('Erro ao atualizar obstáculo no banco:', error.message);
    return { sucesso: false, erro: error.message };
  }
};

export const deletarObstaculo = async (id: string | number) => {
  try {
    const { error } = await supabase
      .from('obstaculos')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { sucesso: true };

  } catch (error: any) {
    console.error('Erro ao deletar obstáculo no banco:', error.message);
    return { sucesso: false, erro: error.message };
  }
};

