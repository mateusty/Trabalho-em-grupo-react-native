import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import ObstacleCard from '../ObstacleCard'
import { obterObstaculos } from '../../services/obstaculoService'
import { useEffect, useState } from 'react'
import { DisabilityType, DisabilityTypeByCategory, Obstacle } from '../../types/obstacle'

type ObstacleFlatlistProps = {
  filter?: DisabilityType | null
  showFixed?: boolean
}

export default function ObstacleFlatlist({ filter, showFixed = false }: ObstacleFlatlistProps) {

  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const buscar = async () => {
      const response = await obterObstaculos()
      if (response.sucesso) setObstacles(response.data ?? [])
      setLoading(false)
    }
    buscar()
  }, [])

  const filteredObstacles = obstacles.filter(obstacle => showFixed || obstacle.gravidade !== 'resolvido')
    .filter(obstacle => !filter || DisabilityTypeByCategory[filter].includes(obstacle.categoria))


  if (loading) {
    return (
      <View 
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        accessible={true}
        accessibilityRole="progressbar" 
        accessibilityLabel="Carregando lista de obstáculos, por favor aguarde."
      >
        <ActivityIndicator size="large" color="#3B75B0" />
      </View>
    )
  }

  return (
    <>
      <FlatList
        data={filteredObstacles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ObstacleCard
            categoria={item.categoria}
            gravidade={item.gravidade}
            descricao={item.descricao}
            data_criacao={item.data_criacao}
            id={item.id}
          />
        )}
      />
    </>
  )
}