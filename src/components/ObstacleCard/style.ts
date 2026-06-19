import { Dimensions, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderRadius: 15,
        borderBottomColor: '#777',
        padding: 15,

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
        fontSize: 20,
        borderRadius: 25,
        padding: 10,
        alignSelf: 'flex-start',
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