import React from "react"
import {View, Text, StyleSheet, Dimensions, RefreshControl, TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import useFetch from "../hooks/useFetch"
import { globalStyles, theme } from "../styles/globals"
import Error from "../components/Error"
import AnimatedLottieView from "lottie-react-native";
import IconButton from "../components/IconButton"
import axios from 'axios'
import useRefresh from "../hooks/useRefresh"
import {FlatGrid} from 'react-native-super-grid'
import type { Bandeja } from "../models"


export default function BandejaScreen({navigation, route}) {

    const {bandejaId} = route.params

    const [deleteError, setDeleteError] = React.useState()
    const {refreshing, handleRefresh} = useRefresh()

    const {data, error, isLoading} = useFetch(`/${bandejaId}`, refreshing)
    const bandeja: Bandeja = data

    function handleDelete() {
        axios.delete(`http://192.168.1.20:1337/bandejas/${bandejaId}`).then(navigation.goBack()).catch(err => setDeleteError(error))
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    <IconButton icon="options-outline" style={{marginRight: 10}} size={25} />
                    <IconButton icon="trash-outline" size={25} color='red' onPress={handleDelete} />
                </>
            )
        })
    }, [navigation])

    const length = bandeja?.filas * bandeja?.columnas

    const range = Array.from({length: length}, (_, v) => v)

    return !isLoading ? (
        <View /*refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}*/ style={globalStyles.container}>
            {error && <Error error={error} />}
            {deleteError && <Error error={deleteError}/>}
            {bandeja && (
                <>
                    <View style={globalStyles.row}>
                        <Ionicons color={theme.primary} name="cube" size={40} />
                        <Text style={[globalStyles.title, {marginHorizontal: 5}]}>{bandeja.identificador} </Text>
                    </View>
                    <View style={[globalStyles.row, {marginBottom: 10, padding: 2.5, marginLeft: -5}]}>
                        <Text style={styles.info}>Creada el {bandeja.created_at.slice(0, 10)}</Text>
                        <Text style={styles.info}>{bandeja.columnas} columnas</Text>
                        <Text style={styles.info}>{bandeja.filas} filas</Text>
                    </View>

                    <FlatGrid
                        data={range}
                        style={{backgroundColor: theme.dimmed, borderRadius: 5, marginBottom: 20}}
                        itemDimension={60}
                        showsVerticalScrollIndicator={false}
                        spacing={5}
                        renderItem={({item}) => (
                            <TouchableOpacity>
                                <Text style={{backgroundColor: theme.primary, aspectRatio: 1, padding: 10, color: 'white', borderRadius: 5,fontFamily: 'inter-bold'}}>/{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </>
            )}
        </View>
    ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <AnimatedLottieView source={require('../assets/animations/loading.json')} autoPlay style={{width: 50, height: 50}} />
        </View>
    )
}

const styles = StyleSheet.create({
    info: {
        backgroundColor: theme.dimmed,
        // paddingHorizontal: 8,
        // paddingVertical: 2,
        // paddingTop: 3.5,
        padding: 5,
        paddingHorizontal: 10,
        margin: 2.5,
        borderRadius: 20,
        // borderWidth: 1,
        borderColor:theme.primary,
        color: theme.onDimmed,
    },
    grid: {
        width: Dimensions.get('window').width,
        backgroundColor: '#eee',
        // borderRadius: 5,
        marginLeft: -20,
    }
})