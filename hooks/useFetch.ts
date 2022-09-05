import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const URL = "http://192.168.1.20:1337/bandejas";

export default function useFetch(suffix: string = "", refreshing = false) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState<number>();

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      axios
        .get(URL + suffix)
        .then(({ data }) => {
          setData(data);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
      axios
        .get(URL + "/count")
        .then(({ data }) => setCount(data))
        .catch((err) => setError(err.message));
    }, [refreshing])
  );

  return { data, error, isLoading };
}
