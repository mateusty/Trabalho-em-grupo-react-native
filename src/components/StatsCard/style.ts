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
        backgroundColor: '#3B75B0',
    },

    cardDark: {
        backgroundColor: '#1A1A1A',
    },

    value: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#F8F9FA',
    },

    label: {
        fontSize: 13, 
        color: '#F8F9FA',
        opacity: 0.85,
    },
})