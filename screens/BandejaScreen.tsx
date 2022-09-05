import React from "react"
import { View, Text, StyleSheet, Dimensions, RefreshControl, TouchableOpacity, ScrollView, FlatList, Modal, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import useFetch from "../hooks/useFetch"
import { globalStyles, theme } from "../styles/globals"
import Error from "../components/Error"
import AnimatedLottieView from "lottie-react-native";
import IconButton from "../components/IconButton"
import axios from 'axios'
import useRefresh from "../hooks/useRefresh"
import type { Bandeja } from "../models"
import Loader from "../components/Loader"
import { Skeleton } from 'moti/skeleton'
import AltaSemilla from "../components/AltaSemilla"
import SemillaButton from "../components/SemillaButton"
import { useQuery, gql } from "@apollo/client"
import Button from "../components/Button"

const BANDEJA = gql`
        query getBandeja($id: ID!) {
            bandeja(id: $id) {
                id,
                identificador,
                filas,
                columnas,
                created_at,
                updated_at
            }
        }
    `


export default function BandejaScreen({ navigation, route }) {
    const { bandejaId } = route.params


    const { loading, error, data } = useQuery(BANDEJA, {
        variables: { id: bandejaId }
    })

    const [altaSemillaVisible, toggleAltaSemilla] = React.useState(false)
    const [selectionMode, setSelectionMode] = React.useState(false)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    <IconButton icon="ellipsis-vertical" style={{ marginRight: 10 }} size={25} />
                </>
            ),
        })
    }, [navigation])

    const length = data?.bandeja.filas * data?.bandeja.columnas

    const range = Array.from({ length: length }, (_, v) => v)

    const smallestDimesion = data?.bandeja.columnas < data?.bandeja.filas ? data?.bandeja.columnas : data?.bandeja.filas

    return (
        <SafeAreaView /*refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}*/ style={globalStyles.container}>
            {error && <Error error={error} />}
            <View style={[globalStyles.row, { marginBottom: 10 }]}>
                <Ionicons color={theme.primary} style={{ marginRight: 5 }} name="cube" size={40} />
                <Skeleton colorMode='light' height={40} width={100}>
                    {data ? <Text style={globalStyles.title}>{data.bandeja?.identificador}</Text> : null}
                </Skeleton>
            </View>
            <Skeleton colorMode="light" height={30} width='100%' >
                {data ?
                    <View style={[globalStyles.row, { flexWrap: 'wrap' }]}>
                        <Text style={styles.info}>Creada {data.bandeja.created_at.slice(2, 10)}</Text>
                        <Text style={styles.info}>Actualizada {data.bandeja.updated_at.slice(2, 10)}</Text>
                    </View> : null
                }
            </Skeleton>
            <Button text="Agregar semilla" style={{ marginTop: 15 }} />
            <View style={styles.grid}>
                <FlatList data={range} renderItem={(item) => <SemillaButton index={item.index} columnas={data?.bandeja.columnas} />} />
            </View>
            <AltaSemilla visible={altaSemillaVisible} close={() => toggleAltaSemilla(false)} />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    info: {
        backgroundColor: theme.dimmed,
        // paddingHorizontal: 8,
        paddingVertical: 5,
        // paddingTop: 3.5,
        fontFamily: 'inter-med',
        paddingHorizontal: 10,
        borderRadius: 10,

        // borderWidth: 1,
        color: theme.primary,
        marginRight: 5,
    },
    grid: {
        marginTop: 15,
        width: Dimensions.get('window').width,
        backgroundColor: '#eee',
        // borderRadius: 5,
        marginLeft: -20,
        height: '100%',
        borderTopWidth: 1,
        borderColor: '#00000015',
    },

})