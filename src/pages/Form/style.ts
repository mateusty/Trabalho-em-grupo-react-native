import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E2E2E2'
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 70,
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1A1A1A'
    },
    subTitulo: {
        fontSize: 20,
        color: '#494949',
        paddingTop: 15,
        fontWeight: 'bold',

    },
    linha:{
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    containerMapa: {
        width: '100%',
        height: 300,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#E2E2E2',
        marginTop: 10,
        position: 'relative', 
    },
    mapa: {
        width: '100%',
        height: '100%',
    },
    botaoGps: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: '#E2E2E2',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#1A1A1A',
        elevation: 3, 
    },
    textoBotaoGps: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    labelCoordenadas:{
        fontSize: 11, 
        color: '#888', 
        marginTop: 5, 
        fontStyle: 'italic' 
    },
    inputDescricao: {
        backgroundColor: "#F8F9FA",
        height: 150,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical: 10,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
        fontSize: 15
    }
})