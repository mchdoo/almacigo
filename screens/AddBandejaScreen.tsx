import React, { useState } from 'react'
import { StyleSheet, Text, KeyboardAvoidingView, View, StatusBar, Dimensions, Platform, Pressable } from 'react-native'
import { globalStyles, theme } from '../styles/globals'
import { Formik } from 'formik'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import * as yup from 'yup'
import { BlurView } from 'expo-blur'

import Button from '../components/Button'
import Input from '../components/Input'
import Error from '../components/Error'
import BottomSheetModal from '../components/BottomSheetModal'

function Spacer({ space = 10 }) {
  return <View style={{ width: space, aspectRatio: 1 }} />
}

const { width } = Dimensions.get('screen')

const bandejaSchema = yup.object({
  identificador: yup.string()
    .required('Campo requerido')
    .min(4, 'El minimo son 4 letras'),
  filas: yup.string().max(3, 'No más de 3 digitos!').min(1, 'Mínimo un numero!'),
  columnas: yup.string().max(3, 'No más de 3 digitos!').min(1, 'Mínimo un numero!'),
})

const AddBandejaScreen = ({ navigation }) => {

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = useState()

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.row}>
        <Ionicons name='file-tray-stacked-outline' size={35} color={theme.primary} />
        <Spacer />
        <Text style={globalStyles.title}>Añadir Bandeja</Text>
      </View>
      <Spacer />
      <Formik
        initialValues={{ identificador: '', filas: 8, columnas: 16, capac_maceta: 6 }}
        validationSchema={bandejaSchema}
        onSubmit={(values, actions) => {
          setLoading(true)
          actions.resetForm()
          axios
            .post('http://192.168.1.20:1337/bandejas', {
              identificador: values.identificador.toUpperCase(),
              filas: values.filas,
              columnas: values.columnas,
              capac_maceta: values.capac_maceta
            })
            .then((res) => {
              setLoading(false)
              navigation.goBack()
            })
            .catch(err => {
              setLoading(false)
              setError(err.message)
            })
        }}>

        {(props) => (
          <View>
            <Input required error={props.errors.identificador} label='Identificador' placeholder='Ej: PM-C' onChangeText={props.handleChange('identificador')} value={props.values.identificador} />
            <Spacer />
            <View style={styles.flex}>
              <View style={styles.item}>
                <Input numeric error={props.errors.columnas} label='Columnas' placeholder='Por defecto: 16' onChangeText={props.handleChange('columnas')} value={props.values.columnas} />
              </View>
              <Spacer />
              <View style={styles.item}>
                <Input numeric error={props.errors.filas} label='Filas' placeholder='Por defecto: 8' onChangeText={props.handleChange('filas')} value={props.values.filas} />
              </View>
            </View>
            <Spacer />
            <Input numeric label='Capacidad de maceta' placeholder='Por defecto: 6' onChangeText={props.handleChange('capac_maceta')} value={props.values.capac_maceta} />
            <Spacer space={20} />
            <View>
              <Button color={theme.primary} text='Añadir' icon='arrow-forward' onPress={props.handleSubmit} iconSize={20} loading={loading} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  )

}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  item: {
    width: (width - 50) / 2,
  }
})

export default AddBandejaScreen