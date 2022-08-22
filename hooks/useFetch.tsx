import React, {useEffect, useState} from "react";
import axios from 'axios'


export default function useFetch(suffix: string = '', refreshing =  false) {

    const [data, setData] = useState()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        setIsLoading(true)
        axios
            .get('http://192.168.1.20:1337/bandejas' + suffix)
            .then(({data}) => {
                setData(data)
                setIsLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setIsLoading(false)
            })
    }, [refreshing])

    return { data, error, isLoading }
}
