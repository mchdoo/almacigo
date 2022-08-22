import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globals'
import {Ionicons} from '@expo/vector-icons'
import useRefresh from '../hooks/useRefresh'

const Error = ({error}) => {

  const {refreshing, handleRefresh} = useRefresh()

  return error != 'Network Error' ? (
    <>
      <View style={styles.errorContainer} >
        <Ionicons name='sad-outline' size={25} color='red' />
        <Text style={styles.error}>Ocurrió un error! [{error}]</Text>
      </View>
    </>
  ) : (
    <View style={styles.errorContainer} >
      <Ionicons name="cloud-offline-outline" size={25} color='red' />
      <Text style={styles.error}>Error de red.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    errorContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 10,
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#ff000012',
      borderColor: 'red',
      borderWidth: 1,
    },
    error: {
      fontFamily: 'inter',
      fontSize: 14,
      marginLeft: 5,
      color:'red'
    },
})
export default Error