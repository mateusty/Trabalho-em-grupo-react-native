import { Pressable, Text } from 'react-native'
import { styles } from './style'

interface MapButtonProps {
    onPress: () => void
}

export const MapButton = ({ onPress }: MapButtonProps) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Ver mapa de obstáculos</Text>
        </Pressable>
    )
}