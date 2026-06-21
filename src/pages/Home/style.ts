import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },

    listContent: {
        flexGrow: 1,
        paddingBottom: 24,
    },

    statsRow: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#777777',
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 8,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyContainer: {
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingTop: 48,
        paddingBottom: 32,
    },

    emptyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        marginTop: 12,
        marginBottom: 4,
        textAlign:'center',
    },

    emptyText: {
        fontSize: 14,
        color: '#777777',
        textAlign: 'center',
        lineHeight: 20,
    },
})