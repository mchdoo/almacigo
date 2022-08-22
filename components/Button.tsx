import { StyleSheet, Text, Pressable, Dimensions, View } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import { globalStyles } from '../styles/globals'
import AnimatedLottieView from 'lottie-react-native'

const Button = ({
    onPress = () => {}, 
    color = 'black', 
    text = 'Click', 
    drop = false, 
    icon = null, 
    iconSize=20, 
    loading = false, 
    size = 60,
    textButton = false
}) => {

    const {width, height} = Dimensions.get('screen')

    const styles = StyleSheet.create({
        buttonBg: {
            backgroundColor: !textButton ? color : '#eee',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            position: drop ? 'absolute' : 'relative',
            width: '100%',
            height: size,
            bottom: 0,
            margin: drop ? 20 : 0,

        },
        buttonText: {
            color: !textButton ? 'white' : color,
            fontFamily: size > 50 ? 'inter-bold' : 'inter-med',
            marginRight: icon ? 5 : 0,
            fontSize: size > 50 ? 16 : 12,
        },
        loading: {
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            height: size,
            backgroundColor: 'lightgray',
        }
    })

    if (loading) return (
        <View style={styles.loading}>
            <AnimatedLottieView source={require('../assets/animations/loading.json')} autoPlay style={{ width: 40, aspectRatio: 1 }} />
        </View>
    )
    return (
        <Pressable style={styles.buttonBg} onPress={onPress}>
            <View style={globalStyles.row}>
                <Text style={styles.buttonText} >{text}</Text>
                {icon && <Ionicons name={icon} size={iconSize} color='white' />}
            </View>
        </Pressable>
    )
}

export default Button