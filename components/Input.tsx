import { TextInput, Text, StyleSheet, Keyboard, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyles, theme } from '../styles/globals'

export default function Input({
    placeholder, 
    label, 
    error  = null, 
    onChangeText={}, 
    value,
    required = false,
    numeric = false,
}) {

    const [isFocused, setIsFocused] = useState(false)

    return (
        <>
            <View style={globalStyles.row}>
                <Text style={[globalStyles.label, {marginVertical: 5}]}>{label}</Text>
                {required && <Text style={{fontSize: 10, color: 'red', marginLeft: 5}}>(obligatorio)</Text>}
            </View>
            {/*@ts-ignore*/}
            <TextInput keyboardType={numeric ? 'decimal-pad' : 'default'} onFocus={() => setIsFocused(true)} onBlur={()=> setIsFocused(false)} placeholder={placeholder} onChangeText={onChangeText} value={value} style={[globalStyles.input, {borderColor: error ? 'red' : !isFocused?'transparent':theme.primary, backgroundColor: isFocused?'#fafafa':'#eee'}]} />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </>
    )
}

const styles = StyleSheet.create({ 
    errorText: {
        color: 'red',
        fontFamily: 'inter',
        fontSize: 12,
        marginTop: 5,
    }
})