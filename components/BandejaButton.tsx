import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { globalStyles, theme } from "../styles/globals";


export default function BandejaButton({ navigate, identificador, id, updatedAt }) {

    const _updatedAt = updatedAt.slice(2, 10).split('-')
    const formatedUpdatedAt = `${_updatedAt[2]}/${_updatedAt[1]}/${_updatedAt[0]}`

    return (
        <>
            <TouchableOpacity onPress={() => navigate("Bandeja", { bandejaId: id })} style={[styles.bandejaButton, globalStyles.row]}>
                {/* <Text style={{color:'white', fontFamily: 'inter-med', fontSize:12, opacity: 0.7}}>#{id}</Text> */}
                <View style={styles.icon}>
                    <Ionicons name="leaf-outline" size={25} color={theme.primary} />
                </View>
                <View style={[globalStyles.row, { justifyContent: 'space-between', flex: 1 }]}>
                    <View style={globalStyles.row} >
                        <Text style={[styles.text, { color: theme.foreground }]}>{identificador}</Text>
                        <Text style={[styles.text, { color: 'black', opacity: 0.6, fontFamily: 'inter', fontSize: 12, marginLeft: 10 }]}>
                            Actualizado {formatedUpdatedAt}
                        </Text>
                    </View>
                    <Ionicons name='chevron-forward' color='#aaa' size={20} />
                </View>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    bandejaButton: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#f5f5f5',
        borderColor: '#aaa',
    },
    text: {
        color: theme.onDimmed,
        fontSize: 16,
        fontFamily: 'inter-bold'
    },
    icon: {
        backgroundColor: theme.dimmed,
        marginRight: 10,
        borderRadius: 5,
        padding: 10,
        borderColor: theme.primary,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})