import { View, Text } from 'react-native'
import React from 'react'
import { Obstacle } from '../../types/obstacle'

export default function ObstacleCard({categoria,gravidade,descricao,data_criacao}:Obstacle) {
    return (
        <View>
            <Text>{categoria}</Text>
            <Text>{gravidade}</Text>
            <Text>{descricao}</Text>
            <Text>{data_criacao}</Text>
        </View>
    )
}