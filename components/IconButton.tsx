import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../styles/globals'

const IconButton = ({ icon, size = 25, color = theme.foreground, style = {}, onPress = () => { }, filled = false }) => {

  const styles = {
    fill: {
      backgroundColor: color,
      padding: 10,
      borderRadius: 5,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  }

  return (
    /* @ts-ignore */
    <TouchableOpacity style={[filled ? styles.fill : {}, style]} onPress={onPress}>
      <Ionicons name={icon} size={size} color={filled ? 'white' : color} />
    </TouchableOpacity>
  )
}

export default IconButton