import { StyleSheet, Text, TouchableOpacity, Dimensions, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { globalStyles } from '../styles/globals'
import AnimatedLottieView from 'lottie-react-native'
import * as Haptics from 'expo-haptics'

const Button = ({
    onPress = () => { },
    color = 'black',
    text = 'Click',
    drop = false,
    icon = null,
    iconSize = 20,
    loading = false,
    textButton = false,
    style = {}
}) => {

    const styles = StyleSheet.create({
        buttonBg: {
            backgroundColor: !textButton ? color : '#00000015',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            position: drop ? 'absolute' : 'relative',
            width: '100%',
            paddingVertical: 10,
            margin: drop ? 20 : 0,
        },
        buttonText: {
            color: !textButton ? 'white' : color,
            fontFamily: 'inter-med',
            marginRight: icon ? 5 : 0,
            fontSize: 14,
        },
        loading: {
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 1,
            backgroundColor: 'lightgray',
        }
    })

    if (loading) return (
        <View style={styles.loading}>
            <AnimatedLottieView source={require('../assets/animations/loading.json')} autoPlay style={{ width: 40, aspectRatio: 1 }} />
        </View>
    )
    return (
        <TouchableOpacity style={[styles.buttonBg, style]} onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            onPress()
        }}>
            <View style={globalStyles.row}>
                <Text style={styles.buttonText} >{text}</Text>
                {icon && <Ionicons name={icon} size={iconSize} color='white' />}
            </View>
        </TouchableOpacity>
    )
}

export default Button