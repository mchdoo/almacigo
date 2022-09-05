import { View, Text, StyleSheet, Modal } from 'react-native'
import React from 'react'
import IconButton from './IconButton'
import { globalStyles } from '../styles/globals'
import Input from './Input'

const AltaSemilla = ({close, visible}) => {
  return (
    <Modal animationType='slide' transparent visible={visible}>
        <View style={styles.modalContainer}>
            <IconButton onPress={close} icon='close'/>
            {/* <Input placeholder='Nombre de la semilla' value={0}/> */}
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        padding: 10,
    }
})

export default AltaSemilla