import React from "react";
import { View, Text } from "react-native";
import SectionTitle from "./SectionTitle";
import {Ionicons} from '@expo/vector-icons'
import { globalStyles } from "../styles/globals";

export default function LastChanges({children = null}) {

    const iconSize = 25

    return (
        <View>
            <SectionTitle icon='list-outline' top={10}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Ionicons name='time-outline' size={iconSize} />
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'inter-med',
                        marginLeft: 5
                    }}>Ultimos movimientos</Text>
                </View>
            </SectionTitle>
            <View style={[globalStyles.row, {opacity: 0.5}]}>
                <Ionicons name='return-down-forward-sharp' size={iconSize} style={{marginRight: 5, transform: [{scale: 0.7}]}} />
                {children}
            </View>
        </View>
    );
}