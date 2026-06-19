import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import { styles } from './style';
import { CATEGORIAS } from '../../data/Categoria';
import { FlatList } from 'react-native';
import { CategoriaNome } from '../../data/Categoria/type';
import { useEffect, useRef, useState } from 'react';
import { CardCategoria } from '../../components/CardCategoria';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { obterLocalizacao } from '../../services/localizacaoService';
import { Coordenadas } from '../../types/coordenadas';
import { KeyboardAvoidingView } from 'react-native';



export const Form = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaNome | null>(null)

  const [localizacaoUsuario, setLocalizacaoUsuario] = useState<Coordenadas | null>(null);
  const [localizacaoSelecionada, setLocalizacaoSelecionada] = useState<Coordenadas | null>(null);
  const [carregandoGps, setCarregandoGps] = useState<boolean>(false);

  const[descricao, setDescricao] = useState<string>('');

  const mapaRef = useRef<MapView | null>(null);

  const carregarGps = async () => {
    setCarregandoGps(true)
    const coordenadas = await obterLocalizacao();

    if(coordenadas){
      setLocalizacaoUsuario(coordenadas);
      setLocalizacaoSelecionada(coordenadas);

      mapaRef.current?.animateToRegion({
        ...coordenadas,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
    }
    setCarregandoGps(false)
  }

  useEffect(() => {
    carregarGps();
  }, []);

  const cliqueNoMapa = (event: MapPressEvent) => {
    const coordenadas = event.nativeEvent.coordinate;
    setLocalizacaoSelecionada(coordenadas);
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: 'red' }} 
      behavior={'height'}
    >
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.content}>
        <Text style={styles.titulo} accessibilityRole="header">
          REGISTRAR OBSTÁCULO
        </Text>
        <Text style={styles.subTitulo}>
          Selecionar categoria
        </Text>

        {/* BOTÕES DE CATEGORIA */}
        <FlatList
          data={CATEGORIAS} 
          renderItem={({ item }) => (
            <CardCategoria 
              item={item}
              selecionado={categoriaSelecionada === item.nome}
              onPress={() => setCategoriaSelecionada(item.nome)}
            /> )}
          keyExtractor={(item) => item.nome} 
          numColumns={3}
          columnWrapperStyle={styles.linha} 
          scrollEnabled={false}
        />

        
        <Text style={styles.subTitulo}>Local do obstáculo</Text>
        <Text style={{ fontSize: 13, color: '#666', marginBottom: 10 }}>
          O mapa abaixo já mostra sua posição. Se o obstáculo for em outro lugar da rua, basta tocar no mapa para mudar o marcador.
        </Text>

        <View 
          style={styles.containerMapa}
          accessibilityLabel="Mapa interativo"
          accessibilityHint="Toque no mapa para marcar o local exato do obstáculo se ele não for na sua posição atual"
        >
          <MapView
            ref={mapaRef}
            style={styles.mapa}
            initialRegion={{
              latitude: localizacaoUsuario?.latitude || -22.2855, 
              longitude: localizacaoUsuario?.longitude || -42.5342,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={cliqueNoMapa}
            showsUserLocation={true}
            showsMyLocationButton={false}
          >
            {localizacaoSelecionada && (
              <Marker 
                coordinate={localizacaoSelecionada} 
                title="Local do Obstáculo"
                description="O problema está acontecendo aqui"
              />
            )}
          </MapView>

          <TouchableOpacity 
            style={styles.botaoGps} 
            onPress={carregarGps}
            disabled={carregandoGps}
            accessibilityRole="button"
            accessibilityLabel="Centralizar mapa na minha localização atual"
          >
            {carregandoGps ? (
              <ActivityIndicator color="#1A1A1A" />
            ) : (
              <Text style={styles.textoBotaoGps}>Localização Atual</Text>
            )}
          </TouchableOpacity>
        </View>

        {localizacaoSelecionada && (
          <Text 
            style={styles.labelCoordenadas} 
            accessibilityLiveRegion="polite"
            accessibilityLabel={`Coordenadas marcadas com sucesso.`}
          >
            Coordenadas marcadas: {localizacaoSelecionada.latitude.toFixed(5)}, {localizacaoSelecionada.longitude.toFixed(5)}
          </Text>
        )}
        <Text style={styles.subTitulo}>Descrição do obstáculo</Text>
        <TextInput style={styles.inputDescricao} 
          placeholder='Descreva o problema com detalhes e pontos de referência (Ex: Carro estacionado na rampa ao lado da farmácia, buraco profundo na calçada, galho caído...)' 
          placeholderTextColor={'gray'} 
          onChangeText={setDescricao}
          multiline={true}
          maxLength={250}
          accessibilityLabel="Campo de texto para descrição detalhada do obstáculo"
          accessibilityHint="Digite aqui detalhes como pontos de referência ou o tamanho do problema para ajudar outras pessoas."
        >
        </TextInput>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}
