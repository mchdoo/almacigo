import { KeyboardAvoidingView, Pressable, StyleSheet, Text, View, Platform, StatusBar, Animated } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { globalStyles } from '../styles/globals'

function BottomSheetModal({ children, navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
        })
    }, [navigation])

    return (
        <>
            <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: '100%', height: '200%' }} />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[globalStyles.container, { marginTop: StatusBar.currentHeight, position: 'absolute', bottom: 0, paddingBottom: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10 }]}>
                <Pressable onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignItems: 'center', height: 40, width: '100%' }}>
                    <Ionicons color='gray' size={25} name='close' />
                </Pressable>
                {children}
            </KeyboardAvoidingView>
        </>
    )
}

export default BottomSheetModal

const styles = StyleSheet.create({})