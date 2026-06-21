import { View, Text } from 'react-native'
import { styles } from './style'

interface WelcomeSectionProps {
    nome: string
}

export const WelcomeSection = ({nome}: WelcomeSectionProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Olá, {nome}</Text>
            <Text style={styles.subtitle}> Aqui está o que está acontecendo no seu bairro.</Text>
        </View>
    )
}