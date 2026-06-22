import { FlatList, Text, View } from "react-native"
import ObstacleFlatlist from "../../components/ObstacleFlatlist"
import { styles } from "./style"
import { SafeAreaView } from "react-native-safe-area-context"
import SwitchButton from "../../components/SwitchButton"
import { useState } from "react"
import { DisabilityType } from "../../types/obstacle"

export const Obstacles = () => {

  const [disabilityFilter, setDisabilityFilter] = useState<DisabilityType | null>(null)
  const [showFixed, setShowFixed] = useState(false)

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.wrapper}>

        <FlatList
          data={[]}
          renderItem={() => null}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={styles.warning} accessible={true}>

                <Text accessibilityRole="header">Avisos</Text>

              </View>

              <View 
                style={styles.filtersWrapper}
                accessibilityRole="tablist"
                accessibilityLabel="Filtros de ocorrências"
              >

                <SwitchButton
                  isActive={showFixed}
                  onPress={() => setShowFixed(!showFixed)}
                >
                  Mostrar ocorrencias resolvidas
                </SwitchButton>

                <Text 
                  accessibilityRole="header"
                  aria-level={2}
                >
                  Filtrar por: 
                </Text>

                <SwitchButton
                  isActive={disabilityFilter === 'visual'}
                  onPress={() => setDisabilityFilter(disabilityFilter === 'visual' ? null : 'visual')}
                >
                  Visual
                </SwitchButton>

                <SwitchButton
                  isActive={disabilityFilter === 'cadeirante'}
                  onPress={() => setDisabilityFilter(disabilityFilter === 'cadeirante' ? null : 'cadeirante')}
                >
                  Cadeirante
                </SwitchButton>

                <SwitchButton
                  isActive={disabilityFilter === 'mobilidade_reduzida'}
                  onPress={() => setDisabilityFilter(disabilityFilter === 'mobilidade_reduzida' ? null : 'mobilidade_reduzida')}
                >
                  Mobilidade reduzida
                </SwitchButton>

                <SwitchButton
                  isActive={disabilityFilter === 'outro'}
                  onPress={() => setDisabilityFilter(disabilityFilter === 'outro' ? null : 'outro')}
                >
                  Outro
                </SwitchButton>



              </View>

              <View 
                style={styles.obstacles}
                accessibilityLabel="Lista de obstáculos relatados"
              >

                <ObstacleFlatlist showFixed={showFixed} filter={disabilityFilter}></ObstacleFlatlist>

              </View>
            </>
          }
        />
      </View>
    </SafeAreaView>
  )
}
