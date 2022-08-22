import React, {useState} from "react";
import { RefreshControl }  from "react-native";

export default function useRefresh() {

    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = React.useCallback(() => {
      setRefreshing(true)
      new Promise(resolve => setTimeout(resolve, 200)).then(() => setRefreshing(false))
    }, [])

    return {refreshing, handleRefresh}
}