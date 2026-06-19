import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 24,
        paddingHorizontal: 16,
        height: 96,
        backgroundColor: '#E2E2E2',
        borderBottomColor: '#777777',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    headerSubContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },

    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#494949'
    },

    drawerButton: {
        marginLeft: 'auto'
    }
});