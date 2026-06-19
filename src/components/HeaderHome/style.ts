import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        height: 64,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ECECF3',
    },

    logoBox: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#ECECF3',
        borderRadius: 6,
    },

    logoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#121114',
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