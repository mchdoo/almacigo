import React, { useEffect } from 'react'
import { SafeAreaView, Image, FlatList, View, Text, RefreshControl } from 'react-native'
import { globalStyles, theme } from '../styles/globals'

/* @ts-ignore: Error con imágenes */
import logo from '../assets/simplified-logo.png'

import Loader from '../components/Loader'
import SectionTitle from '../components/SectionTitle';
import BandejaButton from '../components/BandejaButton'
import Error from '../components/Error'
import IconButton from '../components/IconButton'
import useFetch from '../hooks/useFetch';
import useRefresh from '../hooks/useRefresh'
import LastChanges from '../components/LastChanges'
import type { Bandeja } from '../models'
import { Skeleton } from 'moti/skeleton'
import { useQuery, gql } from '@apollo/client'
import { useFocusEffect } from "@react-navigation/native";

const BANDEJAS = gql`
    query getBandejas {
        bandejas {
            id,
            identificador,
            updated_at
        }
    }
`

export default function HomeScreen({ navigation }) {

    // const [bandejas, setBandejas] = React.useState([])
    // const [error, setError] = React.useState()

    const { loading, error, data, refetch } = useQuery(BANDEJAS)

    const { refreshing, handleRefresh } = useRefresh()

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    <IconButton icon="settings-outline" />
                </>
            ),
            headerLeft: () => (
                // <Ionicons name='home' size={25}/>
                <IconButton style={{ marginRight: 10 }} icon='menu' />
            ),
        })
    }, [navigation])
    // const { data, error, isLoading } = useFetch('', refreshing)
    // const bandejas: Array<Bandeja> = data

    return (
        <SafeAreaView style={globalStyles.container}>
            <Loader visible={loading} />
            {error && <Error error={error} onRefresh={() => handleRefresh()} />}
            <View>
                <SectionTitle sideIcon='add' onSideIconPress={() => navigation.navigate('AddBandeja')} title="Bandejas" />
                {!data && loading &&
                    <>
                        <Skeleton show width='100%' height={70} colorMode='light' />
                        <View style={{ height: 10 }} />
                    </>
                }
                {data &&
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                        data={data?.bandejas}
                        renderItem={(item) => (
                            <BandejaButton
                                id={data?.bandejas[item.index].id}
                                identificador={data?.bandejas[item.index].identificador}
                                updatedAt={data?.bandejas[item.index].updated_at}
                                navigate={navigation.navigate}
                            />
                        )}
                    />
                }
                {!data && !loading &&
                    <Text style={{ fontFamily: 'inter-med', fontSize: 14, color: 'darkgray', alignSelf: 'center', marginBottom: 10 }}>No hay nada que mostrar.</Text>
                }
                {/* {bandejas && !isLoading && (
                    <AddBandeja error={error} navigate={navigation.navigate} />
                )} */}
                <LastChanges>
                    <Text>No hiciste nada todavía.</Text>
                </LastChanges>
            </View>
        </SafeAreaView>
    )
}