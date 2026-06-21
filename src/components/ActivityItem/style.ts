import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ECECF3',
        backgroundColor: '#FFFFFF',
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 12,
    },

    info: {
        flex: 1,
    },

    title: {
        fontSize: 14,
        fontWeight: '500',
        color: '#121114',
        marginBottom: 2,
    },

    status: {
        fontSize: 12,
        color: '#717171',
        textTransform: 'capitalize',
    },

    time: {
        fontSize: 12,
        color: '#717171',
        marginLeft: 8,
    },
})