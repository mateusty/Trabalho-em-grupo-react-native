import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    botaoCategoria:{
        padding: 10,
        borderRadius: 10,
        width: '31%',
        height: 70,
        justifyContent: 'center',
        flexGrow: 1,
        borderColor: 'rgba(160, 160, 160, 0.42)',
        borderWidth: 1
    },
    labelBotao:{
        textAlign: 'center',
        color: '#494949'
    },
    iconBotao:{
        textAlign: 'center'
    },
    botaoSelecionado:{
        backgroundColor: '#EAF1F8',
        borderWidth: 2,
        borderColor: '#D4E1EF',
        opacity: 1
    }
})