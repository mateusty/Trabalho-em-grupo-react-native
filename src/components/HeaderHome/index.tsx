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
            <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
            <Pressable onPress={onAvatarPress} style={styles.avatarButton}>
                {fotoUrl ? (
                    <Image source={{ uri: fotoUrl }} style={styles.avatarImage} />
                ) : (
                    <Ionicons name="person-circle-outline" size={36} color="#FFFFFF" />
                )}
            </Pressable>
        </View>
    )
}