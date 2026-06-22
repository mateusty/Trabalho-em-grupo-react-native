import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
        backgroundColor: '#E2E2E2',
        gap: 15
    },
    subContainer:{
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingTop: 8,
        paddingBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(160, 160, 160, 0.42)'
    },
    titulo: {
        fontSize: 20,
        color: '#494949',
        paddingVertical: 5,
        fontFamily: 'Montserrat-Bold',
        textTransform: 'uppercase',
        paddingLeft: 5
    },
    subTitulo:{
        fontSize: 15, 
        fontWeight:'bold', 
        color:'rgb(160, 160, 160)',
        paddingLeft: 5,
        paddingTop: 15
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
    },
    mapa: {
        width: '100%',
        height: '100%',
    },
    botaoGps: {
        backgroundColor: '#3B75B0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    textoBotaoGps: {
        fontSize: 12,
        fontFamily: 'Montserrat-Bold',
        color: 'white',
    },
    labelCoordenadas:{
        fontSize: 11, 
        color: '#888', 
        marginTop: 5, 
        fontStyle: 'italic' 
    },
    inputDescricao: {
        backgroundColor: "#F8F9FA",
        height: 120,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(160, 160, 160, 0.42)',
        paddingHorizontal: 10,
        textAlignVertical: 'top',
        fontSize: 15,
    },
    contGravidade: {
        flexDirection: 'row',
        gap: 5,
        position: 'relative'
    },
    botaoGravidade: {
        width: '30%',
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        padding: 20,
        marginBottom: 30,
        marginTop: 5
    },
    labelGravidade: {
        fontWeight: 'bold',
        position: 'absolute',
        top: 45,
    },
    gravidadeClicada:{
        borderWidth: 2,
    },
    botaoFoto:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
        width: '49%',
        borderRadius: 12,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: 'rgba(160, 160, 160, 0.51)',
        paddingVertical: 10 
    },
    containerListaMiniatura: {
        flexDirection: 'row', 
        gap: 10, 
    },
    containerMiniatura: {
        position: 'relative', 
        width: 80,
        height: 80,
        borderRadius: 8,
        marginTop: 10
        },
    miniatura: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        backgroundColor: '#E0E0E0', 
        },
    botaoRemoverFoto: {
        position: 'absolute', 
        top: -6,              
        right: -6,            
        backgroundColor: '#E65E2A', 
        width: 20,
        height: 20,
        borderRadius: 10,     
        alignItems: 'center',
        justifyContent: 'center',
        },
    textBotaoRemover: {
         color: 'white', 
         fontSize: 10, 
         fontWeight: 'bold' 
    },
    botaoEnviar:{
        backgroundColor: '#3B75B0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 12
    },
    textoBotaoEnviar:{
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 16
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        shadowColor: '#000',
        elevation: 5, 
    },
    modalTitulo: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: '#333333',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalSubTitulo: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 16,
        textAlign: 'center',
        lineHeight: 20,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: '#333333',
        marginBottom: 20,
        backgroundColor: '#fafafa',
    },
    modalContainerBotoes: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    headerRegistro:{
        backgroundColor: '#3B75B0'
    },
    tituloHeader:{
        fontFamily: 'Montserrat-Bold',
        color: 'white',
        padding: 20,
        fontSize: 20
    }
})