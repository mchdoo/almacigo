import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useFonts } from "expo-font";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import Screens from "./nodes/Screens";
import Error from "./components/Error";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const client = new ApolloClient({
  uri: "http://192.168.1.20:1337/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    inter: require("./assets/fonts/Inter-Regular.ttf"),
    "inter-bold": require("./assets/fonts/Inter-Bold.ttf"),
    "inter-med": require("./assets/fonts/Inter-Medium.ttf"),
  });

  if (fontsLoaded)
    return (
      <ApolloProvider client={client}>
        <NavigationContainer theme={MyTheme}>
          <Screens />
          <StatusBar style="auto" />
        </NavigationContainer>
      </ApolloProvider>
    );
}
