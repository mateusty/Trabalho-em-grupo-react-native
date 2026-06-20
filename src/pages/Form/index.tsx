import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native'
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
import { MaterialIcons } from '@expo/vector-icons';
import { tirarFoto } from '../../services/cameraService';
import { escolherDaGaleria } from '../../services/cameraService';



export const Form = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaNome | null>(null)

  const [localizacaoUsuario, setLocalizacaoUsuario] = useState<Coordenadas | null>(null);
  const [localizacaoSelecionada, setLocalizacaoSelecionada] = useState<Coordenadas | null>(null);
  const [carregandoGps, setCarregandoGps] = useState<boolean>(false);

  const [descricao, setDescricao] = useState<string>('');
  const [gravidade, setGravidade] = useState<string>('');

  const [fotos, setFotos] = useState<string[]>([]);

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

  const fotoCamera = async () =>{
    if(fotos.length >= 3){
      Alert.alert("Você não pode adicionar mais do que 3 fotos")
      return
    }
    const uri = await tirarFoto();
    if(uri){
      setFotos([...fotos, uri]);
    }
  }

  const fotoGaleria = async () => {
    if(fotos.length >= 3){
      Alert.alert("Você não pode adicionar mais do que 3 fotos")
      return
    }
    const uri = await escolherDaGaleria();
    if(uri){
      setFotos([...fotos, uri])
    }
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: 'red' }} 
      behavior={'height'}
    >
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.content}>
        {/* <Text style={styles.titulo} accessibilityRole="header">
          REGISTRAR OBSTÁCULO
        </Text> */}

        {/* CONTAINER DE CATEGORIAS */}
        <View style={styles.subContainer}>
          <Text style={styles.titulo}>
            CATEGORIAS
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
          <Text style={styles.subTitulo}>Gravidade</Text>
          <View 
            style={styles.contGravidade}
            accessibilityRole="radiogroup" 
            accessibilityLabel="Nível de gravidade do obstáculo"
          >
            <TouchableOpacity 
              style={[styles.botaoGravidade, {backgroundColor:"#D83025"}, gravidade === 'inacessivel'? styles.gravidadeClicada : null]}
              onPress={() => setGravidade('inacessivel')}
              accessibilityRole="radio"
              accessibilityState={{ selected: gravidade === 'inacessivel' }}
              accessibilityLabel="Gravidade: Crítico"
              accessibilityHint="Selecione se o obstáculo impede totalmente a passagem ou o acesso."
            > 
              <Text 
                style={styles.labelGravidade}>Crítico
              </Text> 
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.botaoGravidade, {backgroundColor:"#FABD03"}, gravidade === 'intermediario'? styles.gravidadeClicada : null]}
              onPress={() => setGravidade('intermediario')}
              accessibilityRole="radio"
              accessibilityState={{ selected: gravidade === 'intermediario' }}
              accessibilityLabel="Gravidade: Médio"
              accessibilityHint="Selecione se o obstáculo dificulta a passagem, mas não a bloqueia por completo."
            >
              <Text style={styles.labelGravidade}>
                Médio
              </Text> 
            </TouchableOpacity>
          </View>
        </View>

        {/* CONTAINER DO MAPA */}
        <View style={styles.subContainer}>
          <Text style={styles.titulo}>Local</Text>
          <Text style={[styles.subTitulo, {paddingTop: 0}]}>
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
        </View>

        {/* CONTAINER DE DESCRIÇÃO */}
        <View style={styles.subContainer}>
          <Text style={styles.titulo}>Descrição</Text>
          <TextInput style={styles.inputDescricao} 
            placeholder='Descreva o problema com detalhes e pontos de referência (Ex: Carro estacionado na rampa ao lado da farmácia, buraco profundo na calçada, galho caído...)' 
            placeholderTextColor={'#9c9c9c'} 
            onChangeText={setDescricao}
            multiline={true}
            maxLength={250}
            accessibilityLabel="Campo de texto para descrição detalhada do obstáculo"
            accessibilityHint="Digite aqui detalhes como pontos de referência ou o tamanho do problema para ajudar outras pessoas."
          >
          </TextInput>
        </View>
        
        {/* CONTAINER DE IMAGEM */}
        <View style={styles.subContainer}>
          <Text style={styles.titulo}>
            ADICIONAR FOTO
          </Text>
          <View style={{flexDirection: 'row', gap: 5}}>
          <TouchableOpacity style={styles.botaoFoto} onPress={fotoCamera}>
              <MaterialIcons name='photo-camera' size={35} color={'#3B75B0'}/>
              <Text style={[styles.subTitulo, {paddingTop: 5}]}>Tirar foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoFoto} onPress={fotoGaleria}>
            <MaterialIcons name='photo' size={35} color={'#3B75B0'}/>
            <Text style={[styles.subTitulo, {paddingTop: 5}]}>Galeria</Text>
          </TouchableOpacity>
          </View>
          
          {/* CONTAINER DE MINIATURAS DAS IMAGENS SELECIONADAS */}
          <FlatList
            data={fotos}
            keyExtractor={(index) => index.toString()}
            horizontal={true}                               
            showsHorizontalScrollIndicator={false}          
            contentContainerStyle={{ gap: 10 }}             
            renderItem={({ item: uri, index }) => (
              <View style={styles.containerMiniatura}>
                <Image source={{ uri }} style={styles.miniatura} />
                
                <TouchableOpacity 
                  style={styles.botaoRemoverFoto}
                  onPress={() => setFotos(fotos.filter((_, i) => i !== index))}
                >
                  <Text style={styles.textBotaoRemover}>X</Text>
                </TouchableOpacity>
              </View>
              )}
          />
        </View>
      

      </ScrollView>
    </KeyboardAvoidingView>
  )
}
