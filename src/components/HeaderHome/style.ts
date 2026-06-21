import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#3B75B0',
    },

    container: {
        height: 80,
        paddingTop: 32,
        marginBottom: 2,
        paddingHorizontal: 16,
        backgroundColor: '#3B75B0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    logoImage: {
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },

    avatarButton: {
        padding: 4,
    },

    avatarImage: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
})