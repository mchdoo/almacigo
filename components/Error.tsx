import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { globalStyles } from '../styles/globals'
import { Ionicons } from '@expo/vector-icons'
import IconButton from './IconButton'
import * as Haptics from 'expo-haptics'

const Error = ({ error, onRefresh = () => { } }) => {

  useEffect(() => {
    if (!!onRefresh) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    }
  }, [onRefresh])

  return (
    <View style={styles.navContainer} >
      <View style={globalStyles.row}>
        <Ionicons name="sad-outline" size={20} color='red' />
        <Text style={[styles.error, { margin: 0 }]}>{error}</Text>
      </View>
      <IconButton icon='refresh' onPress={() => onRefresh()} color='red' size={20} />
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
    color: 'red'
  },
  navContainer: {
    backgroundColor: '#ff000012',
    padding: 10,
    paddingHorizontal: 20,
    borderColor: '#ff000020',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: -5,
    marginHorizontal: -20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})
export default Error