import { View, Text, Pressable, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './style'

interface HeaderHomeProps {
    fotoUrl?: string | null
    onAvatarPress?: () => void
}

export const HeaderHome = ({ fotoUrl, onAvatarPress }: HeaderHomeProps ) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                <Text style={styles.logoText}>LOGO</Text>
            </View>

            <Pressable onPress={onAvatarPress} style={styles.avatarButton}>
                {fotoUrl ? (
                    <Image source={{ uri: fotoUrl }} style={styles.avatarImage} />
                ) : (
                    <Ionicons name="person-circle-outline" size={36} color="#717171" />
                )}
            </Pressable>
        </View>
    )
}