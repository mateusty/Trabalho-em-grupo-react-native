import { Dimensions, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ECECF3',
        padding: 15,
        backgroundColor: '#FFF',

    },
    leftBar: {
        width: 6,
        borderRadius: 20,
    },
    categoria: {
        fontSize: 30,
        alignSelf: 'flex-start',
    },
    descricao: {
        fontSize: 15,
        alignSelf: 'flex-start',
    },
    gravidade: {
        color: '#FFF',
        fontSize: 20,
        borderRadius: 25,
        padding: 10,
        alignSelf: 'flex-start',
        fontWeight: '500'
    },
    wrapper: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingLeft: 10,
        gap: 5
    },
    data: {

    }
})