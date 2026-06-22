import { Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, Share} from 'react-native'
import { styles } from './style';
import { CATEGORIAS } from '../../data/Categoria';
import { FlatList } from 'react-native';
import { CategoriaNome } from '../../data/Categoria/type';
import { useEffect, useRef, useState } from 'react';
import { CardCategoria } from '../../components/CardCategoria';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { converterCoordenadasEmEndereco, converterEnderecoEmCoordenadas, obterLocalizacao } from '../../services/localizacaoService';
import { Coordenadas } from '../../types/coordenadas';
import { KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { tirarFoto } from '../../services/fotoService';
import { escolherDaGaleria } from '../../services/fotoService';
import { criarObstaculo } from '../../services/obstaculoService';
import { DadosObstaculo } from '../../types/obstacle';
import { useAuth } from '../../context/AuthContext';
import { Botao } from '../../components/Botao';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';



export const Form = () => {
  // const {user} = useAuth();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaNome>('')

  const [localizacaoUsuario, setLocalizacaoUsuario] = useState<Coordenadas>({latitude: 0, longitude: 0});
  const [localizacaoSelecionada, setLocalizacaoSelecionada] = useState<Coordenadas>({latitude: 0, longitude: 0});
  const [carregandoGps, setCarregandoGps] = useState<boolean>(false);

  const [descricao, setDescricao] = useState<string>('');
  const [gravidade, setGravidade] = useState<string>('');

  const [fotos, setFotos] = useState<string[]>([]);

  const [enviando, setEnviando] = useState<boolean>(false);

  const [modalEnderecoVisivel, setModalEnderecoVisivel] = useState<boolean>(false);
  const [enderecoInput, setEnderecoInput] = useState<string>('');
  const [buscandoEndereco, setBuscandoEndereco] = useState<boolean>(false);
  const [enderecoConvertido, setEnderecoConvertido] = useState<string>('');
  
  const mapaRef = useRef<MapView | null>(null);
  const navigate = useNavigation();

  const converterCoordenadas = async () => {
    const enderecoConvertido = await converterCoordenadasEmEndereco(
      localizacaoSelecionada.latitude,
      localizacaoSelecionada.longitude);
    const enderecoFormatado = `${enderecoConvertido?.rua}, ${enderecoConvertido?.numero} - ${enderecoConvertido?.bairro}, ${enderecoConvertido?.cidade} `
    if(enderecoConvertido) setEnderecoConvertido(enderecoFormatado)
  }


  const carregarGps = async () => {
    setCarregandoGps(true)
    const coordenadas = await obterLocalizacao();

    if(coordenadas){
      setLocalizacaoUsuario(coordenadas);
      setLocalizacaoSelecionada(coordenadas);
      converterCoordenadas();

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
    converterCoordenadas();
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

  const buscaEndereco = async () => {
    if (enderecoInput.trim() === '') {
      Alert.alert('Campo vazio', 'Por favor, digite um endereço válido.');
      return;
    }

    setBuscandoEndereco(true);
    const coordenadas = await converterEnderecoEmCoordenadas(enderecoInput);

    if (coordenadas) {
      setLocalizacaoSelecionada(coordenadas);

      mapaRef.current?.animateToRegion({
        ...coordenadas,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);

      setEnderecoInput('');
      setModalEnderecoVisivel(false);
    } else {
      Alert.alert('Local não encontrado', 'Não conseguimos converter este endereço em coordenadas. Verifique os dados e tente novamente.');
    }
    
    setBuscandoEndereco(false);
  };

  const compartilharRelato = async () => {
    try {
      const mensagem = `*Novo Obstáculo Registrado!* 🚨\n\n` +
        `*Categoria:* ${categoriaSelecionada}\n` +
        `*Gravidade:* ${gravidade.toUpperCase()}\n` +
        `*Local:* ${enderecoConvertido}\n` +
        `*Descrição:* ${descricao}\n\n` +
        `Ajude a manter nossa cidade acessível! Enviado pelo ViaLivre.`;

      await Share.share({
        message: mensagem,
        title: 'Compartilhar Obstáculo'
      });

    } catch (error) {
      Alert.alert('Erro ao compartilhar', 'Não foi possível abrir as opções de compartilhamento do sistema.');
    }
  };

  const enviarObstaculo = async () =>{

    // if (!user) {
    //   Alert.alert('Erro de autenticação', 'Você precisa estar logado para registrar um obstáculo.');
    //   return;
    // }
    if (categoriaSelecionada === '') {
      Alert.alert('Categoria obrigatória', 'Por favor, selecione uma categoria para o obstáculo.');
      return;
    }
    if ((localizacaoSelecionada.latitude === 0) || (localizacaoSelecionada.longitude === 0)) {
      Alert.alert('Localização obrigatória', 'Por favor, selecione uma localização.');
      return;
    }
    if (descricao.trim() === '') {
      Alert.alert('Descrição obrigatória', 'Por favor, adicione uma descrição para o obstáculo.');
      return;
    }
    if (gravidade === '') {
      Alert.alert('Nível de gravidade obrigatório', 'Por favor, selecione o nível de gravidade.');
      return;
    }

    setEnviando(true)

    const dadosCriarObstaculo:DadosObstaculo = {
      profile_id: 'a9cdc393-c0f0-4480-b4a6-28b605592119',
      categoria: categoriaSelecionada,
      latitude: localizacaoSelecionada.latitude,
      longitude: localizacaoSelecionada.longitude,
      descricao: descricao,
      gravidade: gravidade,
      fotos: fotos
    }

    try {
      const resultado = await criarObstaculo(dadosCriarObstaculo);
      if (resultado.sucesso) {
        Alert.alert(
          'Sucesso!', 
          'Obstáculo registrado com sucesso no mapa.',
          [
            {
              text: 'Concluir',
              onPress: () => navigate.navigate('TabsHome'),
            },
            {
              text: 'Compartilhar',
              onPress: async () => {
                await compartilharRelato();
                navigate.navigate('TabsHome');
              },
            }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('Erro ao salvar', 'Não foi possível enviar o relatório. Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado ao conectar com o servidor.');
    }finally{
      setEnviando(false)
      limparFormulario()
    }
  }

  const limparFormulario = () => {
    setCategoriaSelecionada('');
    setDescricao('');
    setGravidade('');
    setFotos([]);
    setEnderecoInput('');
    setEnderecoConvertido('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3B75B0' }} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }} 
        behavior={'height'}
      >
        <View style={styles.headerRegistro} accessibilityRole="header">
            <Text style={styles.tituloHeader}>
              REGISTRAR OBSTÁCULO
            </Text>
        </View>
        <ScrollView 
          style={styles.container} 
          contentContainerStyle={styles.content}>
          

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
              O mapa abaixo já mostra sua posição. Se o obstáculo for em outro lugar da rua, basta tocar no mapa para mudar o marcador ou escrever o endereço clicando em "Digitar endereço".
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

              
            </View>
            <Botao 
              title="Localização Atual"
              variante="primary"
              padding={10}
              fontSize={12}
              carregando={carregandoGps}
              onPress={carregarGps}
              accessibilityLabel="Centralizar mapa na minha localização atual"
              icon={<MaterialIcons name='location-searching' size={20} color={'#ffffff'}/>}
            />

            <Botao 
              title="Digitar endereço"
              variante="secondary"
              padding={10}
              fontSize={12}
              style={{ marginTop: 5 }}
              carregando={buscandoEndereco}
              onPress={() => setModalEnderecoVisivel(true)} 
              accessibilityLabel="Digitar endereço manualmente"
            />

            {localizacaoSelecionada && (
              <Text 
                style={styles.labelCoordenadas} 
                accessibilityLiveRegion="polite"
                accessibilityLabel="Endereço marcado com sucesso."
              >
                {enderecoConvertido}
                {/* Coordenadas marcadas: {localizacaoSelecionada.latitude.toFixed(5)}, {localizacaoSelecionada.longitude.toFixed(5)} */}
              </Text>
            )}
          </View>

          
          
          {/* CONTAINER DE IMAGEM */}
          <View style={styles.subContainer}>
            <Text style={styles.titulo}>
              ADICIONAR FOTO
            </Text>
            <View style={{flexDirection: 'row', gap: 5}}>
            <TouchableOpacity style={styles.botaoFoto} onPress={fotoCamera} disabled={fotos.length >= 3}>
                <MaterialIcons name='photo-camera' size={35} color={'#3B75B0'}/>
                <Text style={[styles.subTitulo, {paddingTop: 5}]}>Tirar foto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoFoto} onPress={fotoGaleria} disabled={fotos.length >= 3}>
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


          {/* CONTAINER DE DESCRIÇÃO */}
          <View style={styles.subContainer}>
            <Text style={styles.titulo}>Descrição</Text>
            <TextInput style={styles.inputDescricao} 
              placeholder='Descreva o problema com detalhes e pontos de referência (Ex: Carro estacionado na rampa ao lado da farmácia, buraco profundo na calçada, galho caído...)' 
              placeholderTextColor={'#9c9c9c'} 
              onChangeText={setDescricao}
              value={descricao}
              multiline={true}
              maxLength={250}
              accessibilityLabel="Campo de texto para descrição detalhada do obstáculo"
              accessibilityHint="Digite aqui detalhes como pontos de referência ou o tamanho do problema para ajudar outras pessoas."
            >
            </TextInput>
          </View>
                
          <Botao 
            title="Enviar relato"
            variante="primary"
            padding={20}
            fontSize={16}
            carregando={enviando}
            onPress={enviarObstaculo}
            accessibilityLabel="Enviar formulário de relato"
          />    
        </ScrollView>
        {/* MODAL DE DIGITAR ENDEREÇO */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalEnderecoVisivel}
          onRequestClose={() => setModalEnderecoVisivel(false)}
          aria-modal={true}
        >
          <View style={styles.modalOverlay}>
            <View 
              style={styles.modalContent}
              accessibilityRole="none"
            >
              {/* TÍTULO DO MODAL */}
              <Text 
                style={styles.modalTitulo} 
                accessibilityRole="header"
              >
                Digitar Endereço
              </Text>

              <Text style={styles.modalSubTitulo}>
                Insira o nome da rua, número e cidade para localizar o obstáculo no mapa.
              </Text>

              <TextInput
                style={styles.modalInput}
                placeholder="Exemplo: Av. Alberto Braune, 100 - Centro, Nova Friburgo"
                placeholderTextColor="#9c9c9c"
                value={enderecoInput}
                onChangeText={setEnderecoInput}
                autoFocus={true}
                accessibilityLabel="Campo de texto para digitação do endereço completo"
                accessibilityHint="Digite o local do obstáculo com rua, número, bairro e cidade."
              />

              
              <View style={styles.modalContainerBotoes}>
                <View style={{ flex: 1 }}>
                  <Botao
                    title="Cancelar"
                    variante="secondary"
                    padding={12}
                    fontSize={14}
                    onPress={() => {
                      setEnderecoInput('');
                      setModalEnderecoVisivel(false);
                    }}
                    accessibilityLabel="Cancelar busca e fechar janela"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Botao
                    title="Buscar"
                    variante="primary"
                    padding={12}
                    fontSize={14}
                    carregando={buscandoEndereco}
                    onPress={buscaEndereco}
                    accessibilityLabel="Confirmar endereço digitado e pesquisar no mapa"
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
