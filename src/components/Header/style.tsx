import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 28,
        paddingHorizontal: 16,
        height: 96,
        backgroundColor: '#F8F9FA',
        borderBottomColor: '#E2E2E2',
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
        fontFamily: 'Montserrat-Bold',
        color: '#494949'
    },

    drawerButton: {
        marginLeft: 'auto'
    }
});