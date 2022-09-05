import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Modal, Switch } from 'react-native'
import React from 'react'
import { globalStyles, theme } from '../styles/globals'
import IconButton from './IconButton'
import { Ionicons } from '@expo/vector-icons'

interface Props {
    selectionMode?: boolean,
    columnas: number,
    onLongPress?: () => {},
    onPress?: () => {},
    index?: number
}

const { width } = Dimensions.get('screen')

const SemillaButton = ({ columnas, onLongPress = null, onPress = null, index }: Props) => {
    index += 1

    const [modalOpen, toggleModal] = React.useReducer((state) => !state, false)
    const [activated, toggleActivation] = React.useReducer((state) => !state, false)

    const color = activated ? theme.primary : 'darkgray'

    return (
        <>
            <TouchableOpacity
                style={[styles.seedButton, {
                    width: (width - 40 - (4 * columnas)) / columnas,
                    borderColor: activated ? 'transparent' : 'darkgray',
                    backgroundColor: activated ? color : 'transparent'
                }]}
                onPress={() => {
                    toggleModal()
                }}
            >
                <Text style={{ fontFamily: 'inter-med', color: activated ? 'white' : 'darkgray' }}>{index}</Text>
            </TouchableOpacity>
            <Modal onDismiss={() => alert('hola')} presentationStyle='overFullScreen' transparent animationType='slide' visible={modalOpen}>
                <View style={styles.seedModalContainer}>
                    <View style={[globalStyles.row, { justifyContent: 'space-between', }]}>
                        <View style={globalStyles.row}>
                            <Ionicons name='information' color={color} size={30} />
                            <Text style={{ fontFamily: 'inter-med', fontSize: 16, marginLeft: 5 }}>Semilla # {index}</Text>
                        </View>
                        <IconButton icon='chevron-down' onPress={toggleModal} />
                    </View>
                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.label, { color: 'gray' }]}>Ocupada</Text>
                        <Switch value={activated} onChange={toggleActivation} />
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default SemillaButton

const styles = StyleSheet.create({
    seedButton: {
        aspectRatio: 1,
        padding: 8,
        margin: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'darkgray',
        borderWidth: 1,
    },
    seedModalContainer: {
        position: 'absolute',
        bottom: 0,
        width: width,
        backgroundColor: 'white',
        padding: 20,
        elevation: 10
    }
})