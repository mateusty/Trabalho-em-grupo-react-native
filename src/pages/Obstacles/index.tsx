import { SafeAreaView } from "react-native-safe-area-context"
import { styles } from "./style"
import { ActivityIndicator, FlatList, Text, View, Modal, TouchableOpacity, Alert } from "react-native"
import ObstacleCard from "../../components/ObstacleCard"
import { DisabilityTypeByCategory } from "../../utils/util"
import { useEffect, useState } from "react"
import { obterObstaculos, atualizarObstaculo } from "../../services/obstaculoService"
import { DisabilityType, GravityLevel, Obstacle } from "../../types/obstacle"
import SwitchButton from "../../components/SwitchButton"
import { Header } from "../../components/Header"
import { HeaderHome } from "../../components/HeaderHome"

export const Obstacles = () => {
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [disabilityFilter, setDisabilityFilter] = useState<DisabilityType | null>(null)
  const [showFixed, setShowFixed] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedObstacle, setSelectedObstacle] = useState<Obstacle | null>(null)

  const buscar = async () => {
    const response = await obterObstaculos()
    if (response.sucesso) setObstacles(response.data ?? [])
  }

  useEffect(() => {
    buscar().finally(() => setLoading(false))
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await buscar()
    setRefreshing(false)
  }

  const handleOpenModal = (obstacle: Obstacle) => {
    setSelectedObstacle(obstacle)
    setModalVisible(true)
  }

  const handleAtualizarStatus = async (novaGravidade: GravityLevel) => {
    if (!selectedObstacle) return
    const response = await atualizarObstaculo(selectedObstacle.id, {
      gravidade: novaGravidade
    })

    if (response.sucesso) {
      setObstacles(prev =>
        prev.map(o => o.id === selectedObstacle.id ? { ...o, gravidade: novaGravidade } : o)
      )

      setModalVisible(false)
      setSelectedObstacle(null)
    } else {
      Alert.alert("Não foi possível atualizar")
    }
  }

  const filteredObstacles = obstacles
    .filter(o => showFixed || o.gravidade !== 'resolvido')
    .filter(o => !disabilityFilter || DisabilityTypeByCategory[disabilityFilter].includes(o.categoria))

  if (loading) return <ActivityIndicator />

  return (<>
    <HeaderHome />
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FlatList
          data={filteredObstacles}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOpenModal(item)}>
              <ObstacleCard {...item} />
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <>
              <SwitchButton
                label="Mostrar ocorrencias já resolvidas"
                style={{ width: '100%' }}
                isActive={showFixed}
                onPress={() => setShowFixed(!showFixed)}
              >
                Mostrar ocorrencias resolvidas
              </SwitchButton>

              <Text style={{ marginVertical: 15, fontSize: 17 }}>Filtrar por deficiência:</Text>

              <View style={styles.filtersWrapper}>
                <SwitchButton label="Visual" style={{ width: '48%' }} isActive={disabilityFilter === 'visual'} onPress={() => setDisabilityFilter(disabilityFilter === 'visual' ? null : 'visual')}>Visual</SwitchButton>
                <SwitchButton label="Cadeirante" style={{ width: '48%' }} isActive={disabilityFilter === 'cadeirante'} onPress={() => setDisabilityFilter(disabilityFilter === 'cadeirante' ? null : 'cadeirante')}>Cadeirante</SwitchButton>
                <SwitchButton label="Mobilidade reduzida" style={{ width: '48%' }} isActive={disabilityFilter === 'mobilidade_reduzida'} onPress={() => setDisabilityFilter(disabilityFilter === 'mobilidade_reduzida' ? null : 'mobilidade_reduzida')}>Mobilidade reduzida</SwitchButton>
                <SwitchButton label="Outros" style={{ width: '48%' }} isActive={disabilityFilter === 'outro'} onPress={() => setDisabilityFilter(disabilityFilter === 'outro' ? null : 'outro')}>Outro</SwitchButton>
              </View>
            </>
          }
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Atualizar Ocorrência</Text>
            <Text style={styles.modalSubtitle}>Selecione a situação atual do obstáculo:</Text>

            <TouchableOpacity
              style={[styles.btnStatus, { backgroundColor: '#109D57' }]}
              onPress={() => handleAtualizarStatus('resolvido')}
            >
              <Text style={styles.btnText}>Resolvido</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnStatus, { backgroundColor: '#FFC107' }]}
              onPress={() => handleAtualizarStatus('intermediario')}
            >
              <Text style={styles.btnText}>Intermediário</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnStatus, { backgroundColor: '#DB3025' }]}
              onPress={() => handleAtualizarStatus('inacessivel')}
            >
              <Text style={styles.btnText}>Inacessível</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.btnCancelarText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  </>
  )
}