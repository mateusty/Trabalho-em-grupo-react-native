import { View, Text } from 'react-native'
import { styles } from './style'
import { Obstacle } from '../../types/obstacle'

interface ActivityItemProps {
    item: Obstacle
    timeAgo: string
}

const severityColor: Record<string, string> = {
  resolvido: '#109D57',
  intermediario: '#FABD03',
  inacessivel: '#DB3025',
}

export const ActivityItem = ({item, timeAgo }: ActivityItemProps) => {
    const dotColor = severityColor[item.gravidade] ?? '#717171'

    return (
        <View style={styles.container}>
            <View style={[styles.dot, {backgroundColor: dotColor}]} />
            <View style={styles.info}>
                <Text style={styles.title}>{item.descricao}</Text>
                <Text style={styles.status}>{item.gravidade}</Text>
            </View>
            <Text style={styles.time}>{timeAgo}</Text>
        </View>
    )
}