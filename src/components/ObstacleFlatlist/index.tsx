import { View, Text, FlatList } from 'react-native'
import ObstacleCard from '../ObstacleCard'

export default function ObstacleFlatlist() {
  return (
    <FlatList
        data={data}
        keyExtractor={data.id}
        renderItem={({item})=>{<ObstacleCard categoria={item.categoria} gravidade={item.gravidade} descricao={item.descricao} data_criacao={item.data_criacao} />}}
    ></FlatList>
  )
}