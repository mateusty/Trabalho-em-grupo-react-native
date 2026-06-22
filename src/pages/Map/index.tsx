import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SwitchButton from '../../components/SwitchButton';
import { useEffect, useRef, useState } from 'react';
import { obterObstaculos } from '../../services/obstaculoService';
import { DisabilityType, Obstacle } from '../../types/obstacle';
import { Coordenadas } from '../../types/coordenadas';
import { obterLocalizacao } from '../../services/localizacaoService';
import { HeaderHome } from '../../components/HeaderHome';
import { DisabilityTypeByCategory } from '../../utils/util';

export const Map = () => {

  const [obstaculos, setObstaculos] = useState<Obstacle[]>([]);
  const [obstaculosFiltrados, setObstaculosFiltrados] = useState<Obstacle[]>([]);
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

  const filtrarPins = (tipo: DisabilityType | null) => {
    setBotaoAtivo(tipo || '');
    setObstaculosFiltrados(
      obstaculos.filter((obs) => !tipo || DisabilityTypeByCategory[tipo].includes(obs.categoria))
    )
  } 
  
  useEffect(() => {
    const carregarObstaculo = async () => {
      const data = await obterObstaculos();
      setObstaculos(data.data || [])
      setObstaculosFiltrados(data.data || []);
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
        <SwitchButton onPress={() => filtrarPins(null)} isActive={botaoAtivo === ''}>Todos</SwitchButton> 
        <SwitchButton onPress={() => filtrarPins('cadeirante')} isActive={botaoAtivo === 'cadeirante'}>Cadeirante</SwitchButton> 
        <SwitchButton onPress={() => filtrarPins('visual')} isActive={botaoAtivo === 'visual'}>Visual</SwitchButton>
        <SwitchButton onPress={() => filtrarPins('mobilidade_reduzida')} isActive={botaoAtivo === 'mobilidade_reduzida'}>Mobilidade Limitada</SwitchButton>
        <SwitchButton onPress={() => filtrarPins('outro')} isActive={botaoAtivo === 'outro'}>Outros</SwitchButton>
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
              obstaculosFiltrados.length !== 0 && obstaculosFiltrados.map((obs) => (
                <Marker
                key={obs.id}
                coordinate={{latitude: obs.latitude, longitude: obs.longitude}} 
                pinColor={obs.gravidade === 'inacessivel' ? '#D83025' : obs.gravidade === 'intermediario' ? '#FABD03' : '#109D57'}
                title={obs.categoria}
                description={obs.descricao}
                
                accessible={true}
                accessibilityLabel={`Obstáculo: ${obs.categoria}. ${obs.gravidade}. Descrição: ${obs.descricao}`}
                >
                </Marker>
              ))
            }
            {/* <Marker coordinate={{latitude: localizacaoUsuario.latitude, longitude: localizacaoUsuario.longitude}}></Marker> */}
          </MapView>
          <TouchableOpacity 
            style={styles.cameraButton} 
            onPress={tirarPrintMapa}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Capturar imagem do mapa"
            accessibilityHint="Gera um arquivo de imagem com a visão atual do mapa de obstáculos"
          >
            <Ionicons name='camera' size={26} color='#F8F9FA' importantForAccessibility="no"></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.accessibilityLevelCaption} accessibilityRole="none">
          <View style={styles.captionTextWrapper} accessible={true} accessibilityLabel="Legenda: Cor verde significa Resolvido">
            <Ionicons name='ellipse' size={18} color='#109D57' importantForAccessibility="no"/>
            <Text style={styles.captionText} importantForAccessibility="no">Resolvido</Text>
          </View>
          <View style={styles.captionTextWrapper} accessible={true} accessibilityLabel="Legenda: Cor amarela significa Intermediário">
            <Ionicons name='ellipse' size={18} color='#FABD03' importantForAccessibility="no"/>
            <Text style={styles.captionText} importantForAccessibility="no">Intermediário</Text>
          </View>
          <View style={styles.captionTextWrapper} accessible={true} accessibilityLabel="Legenda: Cor vermelha significa Inacessível">
            <Ionicons name='ellipse' size={18} color='#D83025' importantForAccessibility="no"/>
            <Text style={styles.captionText} importantForAccessibility="no">Inacessível</Text>
          </View>
        </View>
      </View>
        <TouchableOpacity 
          style={styles.accessibleMapButton} 
          onPress={() => navigate.navigate('TabsObstaculos')}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Alternar para modo de lista para baixa visão"
          accessibilityHint="Navega para a tela contendo os mesmos obstáculos listados em formato de texto acessível"
        >
            <Ionicons name='list' size={26} color='#F8F9FA' importantForAccessibility="no"/>
            <Text style={styles.accessibleMapButtonText} importantForAccessibility="no">Modo de lista para baixa visão</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

