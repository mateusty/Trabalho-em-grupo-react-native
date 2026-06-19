import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    botaoCategoria:{
        padding: 10,
        borderRadius: 10,
        width: '31%',
        height: 70,
        justifyContent: 'center',
        flexGrow: 1,
        backgroundColor: '#F8F9FA'
    },
    labelBotao:{
        textAlign: 'center',
        color: '#494949'
    },
    iconBotao:{
        textAlign: 'center'
    },
    botaoSelecionado:{
        backgroundColor: '#e2e2e2',
        borderWidth: 2,
        borderColor: '#f8f9fa'
    }
})