import { View, Text } from 'react-native'
import { styles } from './style'

interface StatsCardProps {
    value: number
    label: string
    variant: 'blue' | 'dark'
}

export const StatsCard = ({ value, label, variant }: StatsCardProps) => {
    return (
        <View 
            style={[styles.card, 
            variant === 'blue' ? styles.cardBlue : styles.cardDark]}
            accessible={true}
            accessibilityLabel={`${label}: ${value}`}
        >
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.label}>{label}</Text>
        </View>
    )
}