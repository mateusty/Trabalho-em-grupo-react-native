import * as Location from 'expo-location'
import { Coordenadas } from '../types/coordenadas';




export const obterLocalizacao = async (): Promise<Coordenadas | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de localização foi negada. Você ainda pode selecionar o ponto tocando no mapa.');
        return null;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      alert('Erro ao obter a localização do GPS.')
      return null
  }
};