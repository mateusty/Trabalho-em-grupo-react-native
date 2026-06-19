import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E2E2E2'
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 70
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
        fontWeight: 'bold'
    },
    linha:{
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        paddingVertical: 5,
    }
})