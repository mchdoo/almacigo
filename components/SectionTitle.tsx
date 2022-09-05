import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { globalStyles, theme } from "../styles/globals";
import IconButton from "./IconButton";

interface Props {
    title?: string,
    children?,
    sideIcon?: string,
    top?: number,
    onSideIconPress: any
}

export default function SectionTitle({
    title = null,
    children = null,
    sideIcon = null,
    top = 0,
    onSideIconPress = () => { }
}: Props) {

    return (
        <View style={[styles.sectionTitle, { marginTop: top ? top : 0 }]}>
            {title && <Text style={globalStyles.sectionTitle}>{title}</Text>}
            {children ? children : null}
            <View style={globalStyles.row}>
                {/* @ts-ignore: Es solo un ícono. */}
                {sideIcon && <IconButton color={theme.primary} onPress={onSideIconPress} icon={sideIcon} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bodySmall: {
        fontSize: 14,
        color: '#B7C84F'
    },
    sectionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    vermas: {
        justifyContent: 'center'
    }
})