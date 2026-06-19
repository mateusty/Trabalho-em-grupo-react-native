import { View, Text } from 'react-native'
import { ObstacleCardType } from '../../types/obstacle'
import { styles } from './style'

export default function ObstacleCard({ categoria, gravidade, descricao, data_criacao }: ObstacleCardType) {
    function corGravidade(gravidade: string) {
        if (gravidade === 'baixa') return '#FABD03'
        if (gravidade === 'media') return '#E65E2A'
        if (gravidade === 'alta') return '#DB3025'
    }
    function tituloGravidade(gravidade: string) {
        if (gravidade === 'baixa') return 'Baixa'
        if (gravidade === 'media') return 'Média'
        if (gravidade === 'alta') return 'Crítica'
    }
    return (
        <View style={styles.container}>

            <View style={[styles.leftBar, { backgroundColor: corGravidade(gravidade) }]}>
            </View>

            <View style={styles.wrapper}>

                <Text style={styles.categoria}>
                    {categoria}
                </Text>
                <Text style={styles.descricao}>
                    {descricao}
                </Text>
                <Text style={[styles.gravidade, { backgroundColor: corGravidade(gravidade) }]}>
                    {tituloGravidade(gravidade)}
                </Text>
                <Text style={styles.data}>
                    {data_criacao}
                </Text>

            </View>

        </View>
    )
}