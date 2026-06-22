import { View, Pressable, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './style'
import Logo from '../../assets/logoViaLivre.png'

interface HeaderHomeProps {
    fotoUrl?: string | null
    onAvatarPress?: () => void
}

export const HeaderHome = ({ fotoUrl, onAvatarPress }: HeaderHomeProps ) => {
    return (
        <View style={styles.container}>
            <Image 
                source={Logo} 
                style={styles.logoImage} 
                resizeMode="contain" 
                accessible={false}
                importantForAccessibility="no"/>
            <Pressable 
                onPress={onAvatarPress} 
                style={styles.avatarButton}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Abrir menu de perfil e configurações"
            >
                {fotoUrl ? (
                    <Image source={{ uri: fotoUrl }} style={styles.avatarImage} accessibilityLabel="Foto do seu perfil"/>
                ) : (
                    <Ionicons name="person-circle-outline" size={36} color="#FFFFFF" importantForAccessibility="no" />
                )}
            </Pressable>
        </View>
    )
}