import React from 'react'
import { SafeAreaView, Image, FlatList, View, Text, RefreshControl } from 'react-native'
import { globalStyles } from '../styles/globals'

/* @ts-ignore: Error con imágenes */
import logo from '../assets/logo_small.png'
import AnimatedLottieView from 'lottie-react-native'

import SectionTitle from '../components/SectionTitle';
import { AddBandeja, TitledBandejaButton } from '../components/BandejaButton'
import Error from '../components/Error'
import IconButton from '../components/IconButton'
import useFetch from '../hooks/useFetch';
import useRefresh from '../hooks/useRefresh'
import LastChanges from '../components/LastChanges'
import type { Bandeja } from '../models'


export default function HomeScreen({ navigation }) {

    // const [bandejas, setBandejas] = React.useState([])
    // const [error, setError] = React.useState()
    const {refreshing, handleRefresh} = useRefresh()

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    <IconButton icon="leaf-outline" style={{ marginRight: 10 }} />
                    <IconButton icon="settings-outline" style={{ marginRight: 10 }} />
                </>
            ),
            headerLeft: () => (
                // <Ionicons name='home' size={25}/>
                <Image source={logo} style={{ width: 40, aspectRatio: 1 }} />
            )
        })
    }, [navigation])

    const { data, error, isLoading } = useFetch('', refreshing)
    const bandejas: Array<Bandeja> = data 

    return (
        <SafeAreaView style={globalStyles.container}>
            {isLoading && <AnimatedLottieView source={require('../assets/animations/loading.json')} autoPlay style={{height: 40, alignSelf: 'center'}} />}
            <View>
                <SectionTitle title="Bandejas registradas" onRefresh={() => handleRefresh} />
                {error && <Error error={error} />}
                {bandejas && <View>
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                        data={bandejas}
                        renderItem={(item) =>
                            <TitledBandejaButton
                                id={bandejas[item.index].id}
                                identificador={bandejas[item.index].identificador}
                                columnas={bandejas[item.index].columnas}
                                filas={bandejas[item.index].filas}
                                navigate={navigation.navigate}
                            />}
                    />
                    <AddBandeja error={error} navigate={navigation.navigate} />
                </View>}
            </View>
            <LastChanges>
                <Text>No hiciste nada todavia.</Text>
            </LastChanges>
        </SafeAreaView>
    )
}