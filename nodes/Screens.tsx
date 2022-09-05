import React from "react"
import { createNativeStackNavigator, } from '@react-navigation/native-stack'
import HomeScreen from "../screens/HomeScreen"
import BandejaScreen from "../screens/BandejaScreen"
import AddBandejaScreen from "../screens/AddBandejaScreen"
import { enableFreeze } from "react-native-screens"
import { theme } from '../styles/globals'

enableFreeze(true)

type StackParams = {
  Home: undefined,
  Bandeja: {
    bandejaId: number
  }
  AddBandeja: undefined
}

const MainStack = createNativeStackNavigator<StackParams>()

export default function Screens() {

  return (
    <MainStack.Navigator initialRouteName='Home' screenOptions={{
      headerShadowVisible: false,
      headerBlurEffect: "dark",
      headerTitleStyle: {
        fontFamily: 'inter-med',
        fontSize: 16,
        color: theme.foreground,
      },
    }}>
      <MainStack.Group screenOptions={{
        animation: 'slide_from_right',
        animationDuration: 10,
      }}>
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Inicio'
          }}
        />

        <MainStack.Screen
          name="Bandeja"
          component={BandejaScreen}
          options={({ route }) => (
            {
              // @ts-ignore
              title: null,
            }
          )}
        />
        <MainStack.Screen
          name='AddBandeja'
          component={AddBandejaScreen}
          options={
            {
              animation: 'slide_from_bottom',
              title: null,
            }
          }
        />

      </MainStack.Group>

      <MainStack.Group screenOptions={{ headerShown: false, gestureEnabled: true, presentation: 'transparentModal' }}>
      </MainStack.Group>

    </MainStack.Navigator>
  )
}
