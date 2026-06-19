import { FlatList, Text, TouchableOpacity, View } from "react-native"
import ObstacleFlatlist from "../../components/ObstacleFlatlist"
import { styles } from "./style"
import { SafeAreaView } from "react-native-safe-area-context"

export const Obstacles = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <FlatList
          data={[]}
          renderItem={() => null}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <>
              <View style={styles.warning}>
                <Text>avisos</Text>
              </View>
              <View style={styles.filtersWrapper}>
                <TouchableOpacity style={styles.filtersButton}><Text>Botões de filtro</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filtersButton}><Text>Botões de filtro</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filtersButton}><Text>Botões de filtro</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filtersButton}><Text>Botões de filtro</Text></TouchableOpacity>
              </View>
              <View style={styles.obstacles}>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
              </View>
            </>

          )}
        />
      </View>
    </SafeAreaView>
  )
}
