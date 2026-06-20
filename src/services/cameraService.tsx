import * as FotoGerenciador from 'expo-image-picker';
import { Alert } from 'react-native';

export const tirarFoto = async ():Promise<string | undefined> => {

  const { status } = await FotoGerenciador.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera para tirar a foto.');
    return;
  }

  const resultado = await FotoGerenciador.launchCameraAsync({
    mediaTypes: ['images'],
    allowsEditing: true, 
    aspect: [4, 3],     
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
    aspect: [4, 3],
    quality: 0.7,
  });

  if (!resultado.canceled) {
    return resultado.assets[0].uri;
  }

  return undefined;
};