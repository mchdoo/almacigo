import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export const theme = {
    primary: '#96AE00',
    onDimmed: '#809401',
    get dimmed(){ return `${this.primary}5e`},
}

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 5,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 30,
        fontFamily: 'inter-bold'
    },
    sectionTitle: {
        fontSize: 25,
        fontFamily: 'inter-bold'
    },
    primary: {
        color: theme.primary,
    },
    bgPrimary: {
        backgroundColor: theme.primary
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.primary,
        flexGrow: 1
    },
    label: {
        fontFamily: 'inter-med',
        fontSize: 16,
    },
})

