import { View, Text } from 'react-native'
import { ObstacleCardType } from '../../types/obstacle'
import { styles } from './style'
import { formatarData } from '../../utils/util'

export default function ObstacleCard({ categoria, gravidade, descricao, data_criacao }: ObstacleCardType) {
    function corGravidade(gravidade: string) {
        if (gravidade === 'resolvido') return '#109D57'
        if (gravidade === 'intermediario') return '#FABD03'
        if (gravidade === 'inacessivel') return '#DB3025'
    }

    function tituloCategoria(categoria: string) {
        if (categoria === 'buraco') return 'Buraco'
        if (categoria === 'rampa_bloqueada') return 'Rampa bloqueada' 
        if (categoria === 'elevador_quebrado') return 'Elevador quebrado'
        if (categoria === 'objeto_aereo') return 'Objeto aéreo'
        if (categoria === 'calcada_obstruida') return 'Calçada obstruida'
        if (categoria === 'semaforo_quebrado') return 'Semáfaro quebrado'
        if (categoria === 'falta_de_acessibilidade') return 'Falta de acessibilidade'
        if (categoria === 'outro') return 'Outro'
    }

    function tituloGravidade(gravidade: string) {
        if (gravidade === 'resolvido') return 'Resolvido'
        if (gravidade === 'intermediario') return 'Intermediário'
        if (gravidade === 'inacessivel') return 'Inacessível'
    }

    return (
        <View
        accessibilityLabel={`Obstáculo: ${tituloCategoria(categoria)}, gravidade ${tituloGravidade(gravidade)}, ${descricao}, registrado em ${formatarData(data_criacao)}`}
        accessible={true}
        style={styles.container}>

            <View style={[styles.leftBar, { backgroundColor: corGravidade(gravidade) }]}>
            </View>

            <View style={styles.wrapper}>

                <Text style={styles.categoria}>
                    {tituloCategoria(categoria)}
                </Text>
                <Text style={styles.descricao}>
                    {descricao}
                </Text>
                <Text style={[styles.gravidade, { backgroundColor: corGravidade(gravidade) }]}>
                    {tituloGravidade(gravidade)}
                </Text>
                <Text style={styles.data}>
                    {formatarData(data_criacao)}
                </Text>

            </View>

        </View>
    )
}