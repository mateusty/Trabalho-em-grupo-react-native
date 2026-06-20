import * as FotoGerenciador from 'expo-image-picker';
import { Alert } from 'react-native';
import { supabase } from './supabaseClient';
import * as base64JS from 'base64-js';
import { File } from 'expo-file-system';

export const tirarFoto = async ():Promise<string | undefined> => {

  const { status } = await FotoGerenciador.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera para tirar a foto.');
    return;
  }

  const resultado = await FotoGerenciador.launchCameraAsync({
    mediaTypes: ['images'],
    allowsEditing: true, 
    aspect: [5, 10],     
    quality: 0.7,      
  });

  if (!resultado.canceled) {
    return resultado.assets[0].uri;
  }
  
  return undefined;
};


export const escolherDaGaleria = async ():Promise<string | undefined>  => {
  
  const { status } = await FotoGerenciador.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria para selecionar as fotos.');
    return;
  }

  const resultado = await FotoGerenciador.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [5, 10],
    quality: 0.7,
  });

  if (!resultado.canceled) {
    return resultado.assets[0].uri;
  }

  return undefined;
};

export const fazerUploadFoto = async (uriLocal: string): Promise<string | null> => {
  try {
    const arquivo = new File(uriLocal);

    const extensaoArquivo = uriLocal.split('.').pop() ?? 'jpg';
    const nomeArquivo = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extensaoArquivo}`;
    const caminhoArquivo = `fotos/${nomeArquivo}`;

    const { data, error } = await supabase.storage
      .from('obstaculos') 
      .upload(caminhoArquivo, arquivo, {
        contentType: `image/${extensaoArquivo}`,
        upsert: false
      });

    if (error) {
      console.error('Erro no upload do Supabase Storage:', error.message);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('obstaculos')
      .getPublicUrl(caminhoArquivo);

    return urlData.publicUrl;

  } catch (erro) {
    console.error('Erro no upload:', erro);
    return null;
  }
};