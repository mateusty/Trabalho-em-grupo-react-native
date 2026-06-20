import { FlatList, Text, View } from "react-native"
import ObstacleFlatlist from "../../components/ObstacleFlatlist"
import { styles } from "./style"
import { SafeAreaView } from "react-native-safe-area-context"
import SwitchButton from "../../components/SwitchButton"
import { useState } from "react"
import { DisabilityType } from "../../types/obstacle"

export const Obstacles = () => {

const [filtro, setFiltro] = useState<DisabilityType | null>(null)


  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.wrapper}>

        <FlatList
          data={[]}
          renderItem={() => null}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={styles.warning}>

                <Text>avisos</Text>
              
              </View>

              <View style={styles.filtersWrapper}>
                <Text>Filtrar por: </Text>
                <SwitchButton isActive={filtro === 'visual'} onPress={()=> setFiltro(filtro === 'visual' ? null : 'visual')}>Visual</SwitchButton>
                <SwitchButton isActive={filtro === 'cadeirante'} onPress={()=> setFiltro(filtro === 'cadeirante' ? null : 'cadeirante')}>Cadeirante</SwitchButton>
                <SwitchButton isActive={filtro === 'mobilidade_reduzida'} onPress={()=> setFiltro(filtro === 'mobilidade_reduzida' ? null : 'mobilidade_reduzida')}>Mobilidade reduzida</SwitchButton>
                <SwitchButton isActive={filtro === 'outro'} onPress={()=> setFiltro(filtro === 'outro' ? null : 'outro')}>Outro</SwitchButton>

              </View>

              <View style={styles.obstacles}>

                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>
                <ObstacleFlatlist></ObstacleFlatlist>

              </View>

            </>
          }
        />
      </View>
    </SafeAreaView>
  )
}
