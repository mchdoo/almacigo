import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { theme } from "../styles/globals";


export function AddBandeja({error, navigate}) {
    return (
        <TouchableOpacity style={[styles.bandejaAddButton, {opacity: error ? 0.5 : 1}]} onPress={!error ? () => navigate('AddBandeja') : ()=>{}} >
            <Ionicons name="add" size={20} color={theme.primary} style={styles.icon} />
            <Text style={[styles.text, {fontFamily: 'inter-med', fontSize: 16}]}>Añadir Bandeja</Text>
        </TouchableOpacity>
    );
}


export function TitledBandejaButton({navigate, identificador, columnas, filas, id}) {


    return (
        <>
            <TouchableOpacity onPress={() => navigate("Bandeja", {bandejaId: id})} style={[styles.bandejaAddButton, styles.bandejaButton]}>
                {/* <Text style={{color:'white', fontFamily: 'inter-med', fontSize:12, opacity: 0.7}}>#{id}</Text> */}
                <Ionicons name="cube-outline" size={25} color="white" style={styles.icon} />
                <Text style={[styles.text, {color: 'white'}]}>{identificador}</Text>
                {(columnas && filas) &&
                    <Text style={[styles.text, {color: 'white', opacity: 0.6, fontFamily: 'inter-med'}]}> [{columnas} x {filas}]</Text>
                }
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    bandejaAddButton: {
        padding: 20,
        borderRadius: 10,
        borderColor: theme.primary,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#B7C84F2a'
    },
    bandejaButton: {
        backgroundColor: theme.primary
    },
    text: {
        color: theme.primary,
        fontSize: 16,
        fontFamily: 'inter-bold'
    },
    icon: {
        marginRight: 8,
    }
})