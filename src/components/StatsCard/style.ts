import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create ({
    card: {
        flex: 1,
        borderRadius: 12,
        padding: 16,
        minHeight: 90,
        justifyContent: 'space-between',
    },

    cardBlue: {
        backgroundColor: '#1565C0',
    },

    cardDark: {
        backgroundColor: '#121114',
    },

    value: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    label: {
        fontSize: 13, 
        color: '#FFFFFF',
        opacity: 0.85,
    },
})