import * as Location from 'expo-location'
import { Coordenadas } from '../types/coordenadas';
import { EnderecoFormatado } from '../types/endereco';

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



export const converterCoordenadasEmEndereco = async (
  latitude: number,longitude: number): 
  Promise<EnderecoFormatado | null> => {
  try {
    const resultado = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (resultado.length === 0) return null;

    const local = resultado[0];
    const endereco: EnderecoFormatado = {
      rua: local.street ?? 'Rua não encontrada',
      numero: local.streetNumber ?? 'S/N',
      bairro: local.district ?? 'Bairro não identificado',
      cidade: local.subregion ?? local.city ?? 'Cidade não identificada',
    };

    return endereco;

  } catch (error) {
    console.error('Erro ao converter coordenadas em endereço:', error);
    return null;
  }
};