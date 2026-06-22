import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    wrapper: {
        width: width * 0.9,
        flexDirection: 'column',
    },
    filtersWrapper: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderRadius: 15,
        marginBottom: 30,
        gap: 7,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: width * 0.85,
        backgroundColor: '#FFF',
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333'
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    btnStatus: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    btnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 17,
    },
    btnCancelar: {
        marginTop: 10,
        padding: 10,
    },
    btnCancelarText: {
        color: '#777',
        fontSize: 16,
        fontWeight: '600'
    }
})