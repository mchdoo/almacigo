import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import AnimatedLottieView from 'lottie-react-native'
import loader from '../assets/animations/loading.json'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { View } from 'moti'
import { globalStyles } from '../styles/globals'

interface LoaderProps {
    size?: number,
    visible: boolean,
    fullscreen?: boolean,
}

const Loader = ({ size = 40, visible, fullscreen = false }: LoaderProps) => {


    const height = useSharedValue(size)
    const translate = useSharedValue(0)
    const marginBottom = useSharedValue(0)

    useEffect(() => {
        translate.value = visible ? -5 : -size
        height.value = visible ? size + 20 : 0,
            marginBottom.value = visible ? 10 : 0
    }, [visible])

    const easing = Easing.inOut(Easing.exp)
    const duration = 500

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withTiming(translate.value, { duration: duration, easing: easing }) }],
            height: withTiming(height.value, { duration: duration, easing: easing }),
            marginBottom: withTiming(marginBottom.value, { duration: duration, easing: easing }),
        }
    })

    if (fullscreen == true) {
        return (<View style={[globalStyles.container, { backgroundColor: '#eee', justifyContent: 'center' }]}>
            <AnimatedLottieView style={{
                height: 50,
                alignSelf: 'center',
                justifyContent: 'center'
            }} source={loader} autoPlay />
        </View>)
    }
    return (visible ?
        <Animated.View style={[{
            backgroundColor: '#eee',
            borderColor: '#00000015',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            justifyContent: 'center',
            width: Dimensions.get('screen').width,
            marginLeft: -20,
        }, animatedStyle]}>
            <AnimatedLottieView style={{
                height: size,
                alignSelf: 'center',
                justifyContent: 'center'
            }} source={loader} autoPlay />
        </Animated.View>
        : null)
}

export default Loader