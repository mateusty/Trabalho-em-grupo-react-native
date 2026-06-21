import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SwitchButton from '../../components/SwitchButton';
import { useEffect, useRef, useState } from 'react';
import { obterObstaculos } from '../../services/obstaculoService';
import { Obstacle } from '../../types/obstacle';
import { Coordenadas } from '../../types/coordenadas';
import { obterLocalizacao } from '../../services/localizacaoService';

export const Map = () => {

  const [obstaculos, setObstaculos] = useState<Obstacle[]>([]);
  const [localizacaoUsuario, setLocalizacaoUsuario] = useState<Coordenadas>({latitude: 0, longitude: 0});
  const [carregandoGps, setCarregandoGps] = useState<boolean>(false);
  const [botaoAtivo, setBotaoAtivo] = useState<string>('');

    const mapaRef = useRef<MapView | null>(null);
    const navigate = useNavigation();

  const carregarGps = async () => {
    setCarregandoGps(true)
    const coordenadas = await obterLocalizacao();

    if(coordenadas){
      setLocalizacaoUsuario(coordenadas);

      mapaRef.current?.animateToRegion({
        ...coordenadas,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
    }
    setCarregandoGps(false)
  }

  const tirarPrintMapa = async () => {
    if (!mapaRef.current) return;

    try {
      const uri = await mapaRef.current.takeSnapshot({
        width: 800,
        height: 800,
        format: 'png',
        quality: 1,
        result: 'file',
      });

      console.log(uri);
    } catch (error) {
      alert('Houve um erro ao tirar print do mapa');
    }
  };
  
  useEffect(() => {
    const carregarObstaculo = async () => {
      const data = await obterObstaculos();
      setObstaculos(data.data || [])
    }
    carregarObstaculo()
    carregarGps();
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mapa</Text>
      <Text style={styles.subTitle}>Mapa visual</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.filterSubTitle}>Filtre pelos tipos de obstáculos:</Text>
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterButtonContainer}
        >
        <SwitchButton onPress={() => setBotaoAtivo('Cadeirante')} isActive={botaoAtivo === 'Cadeirante'}>Cadeirante</SwitchButton> 
        <SwitchButton onPress={() => setBotaoAtivo('Visual')} isActive={botaoAtivo === 'Visual'}>Visual</SwitchButton>
        <SwitchButton onPress={() => setBotaoAtivo('MobLimitada')} isActive={botaoAtivo === 'MobLimitada'}>Mobilidade Limitada</SwitchButton>
        <SwitchButton onPress={() => setBotaoAtivo('Outros')} isActive={botaoAtivo === 'Outros'}>Outros</SwitchButton>
        </ScrollView>
        <View style={styles.mapContainer}>
          <MapView 
          ref={mapaRef}
          style={styles.map}
          initialRegion={{
                latitude: localizacaoUsuario?.latitude || -22.2855, 
                longitude: localizacaoUsuario?.longitude || -42.5342,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
          >
            {
              obstaculos.length !== 0 && obstaculos.map((obs) => (
                <Marker 
                coordinate={{latitude: obs.latitude, longitude: obs.longitude}} 
                pinColor={obs.gravidade === 'inacessivel' ? '#D83025' : obs.gravidade === 'intermediario' ? '#FABD03' : '#109D57'}
                title={obs.categoria}
                description={obs.descricao}
                >

                </Marker>
              ))
            }
            {/* <Marker coordinate={{latitude: localizacaoUsuario.latitude, longitude: localizacaoUsuario.longitude}}></Marker> */}
          </MapView>
          <TouchableOpacity style={styles.cameraButton} onPress={tirarPrintMapa}>
            <Ionicons name='camera' size={26} color='#F8F9FA'></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.accessibilityLevelCaption}>
          <View style={styles.captionTextWrapper}><Ionicons name='ellipse' size={18} color='#109D57'/><Text style={styles.captionText}>Resolvido</Text></View>
          <View style={styles.captionTextWrapper}><Ionicons name='ellipse' size={18} color='#FABD03'/><Text style={styles.captionText}>Intermediário</Text></View>
          <View style={styles.captionTextWrapper}><Ionicons name='ellipse' size={18} color='#D83025'/><Text style={styles.captionText}>Inacessível</Text></View>
        </View>
      </View>
        <TouchableOpacity style={styles.accessibleMapButton} onPress={() => navigate.navigate('TabsObstaculos')}><Ionicons name='list' size={26} color='#F8F9FA'/><Text style={styles.accessibleMapButtonText}>Modo de lista para baixa visão</Text></TouchableOpacity>
    </ScrollView>
  )
}

