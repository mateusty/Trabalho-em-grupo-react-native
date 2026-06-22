import { Pressable, Text } from 'react-native'
import { styles } from './style'

interface MapButtonProps {
    onPress: () => void
}

export const MapButton = ({ onPress }: MapButtonProps) => {
    return (
        <Pressable 
            style={styles.button} 
            onPress={onPress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Ver mapa de obstáculos"
            accessibilityHint="Navega para a tela do mapa interativo com todos os relatos"
        >
            <Text style={styles.text}>Ver mapa de obstáculos</Text>
        </Pressable>
    )
}