import { FlatList, Text, TouchableOpacity, View } from "react-native"
import ObstacleFlatlist from "../../components/ObstacleFlatlist"
import { styles } from "./style"
import { SafeAreaView } from "react-native-safe-area-context"
import SwitchButton from "../../components/SwitchButton"

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

                <SwitchButton >Botões de filtro</SwitchButton>
                <SwitchButton >Botões de filtro</SwitchButton>
                <SwitchButton >Botões de filtro</SwitchButton>
                <SwitchButton >Botões de filtro</SwitchButton>
                <SwitchButton >Botões de filtro</SwitchButton>

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
