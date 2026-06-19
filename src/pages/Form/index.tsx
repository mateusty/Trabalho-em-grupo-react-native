import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './style';
import { CATEGORIAS } from '../../data/Categoria';
import { FlatList } from 'react-native';
import { CategoriaNome, Categoria } from '../../data/Categoria/type';
import { useState } from 'react';
import { CardCategoria } from '../../components/CardCategoria';

export const Form = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaNome | null>(null)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>
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

      
    </ScrollView>
  )
}
