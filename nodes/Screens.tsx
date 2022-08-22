import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from "../screens/HomeScreen"
import BandejaScreen from "../screens/BandejaScreen"
import AddBandejaScreen from "../screens/AddBandejaScreen"
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type StackParams = {
  Home: undefined,
  Bandeja: {
    bandejaId: number
  }
  AddBandeja: undefined
}

const Stack = createNativeStackNavigator<StackParams>()

export default function Screens() {

  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{
      headerShadowVisible: false,
      headerTitleStyle: {
        fontFamily: 'inter-med',
        fontSize: 16
      },
      animation: 'slide_from_right',
      animationDuration: 10,
    }}>

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: null
        }}
      />

      <Stack.Screen
        name="Bandeja"
        component={BandejaScreen}
        options={({ route }) => (
          {
            // @ts-ignore
            title: `Bandeja # ${route.params.bandejaId}`,
          }
        )}
      />

      <Stack.Screen
        name='AddBandeja'
        component={AddBandejaScreen}
        options={
          {
            title: null,
            presentation: 'fullScreenModal',
            animation: 'slide_from_bottom',
            headerShown: false,
          }
        }
      />

    </Stack.Navigator>
  )
}
