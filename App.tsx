import { StatusBar } from "expo-status-bar"
import { FC, useCallback, useEffect } from "react"
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"

import RootNavigator from "./navigation/index"

const Stack = createNativeStackNavigator()

interface AppProps {
  navigation: any
}

const App: FC<AppProps> = (props) => {
  // const [fontsLoaded] = useFonts({
  //   "Mulish-Regular": require("./assets/fonts/Mulish-Regular.otf"),
  //   "Mulish-Bold": require("./assets/fonts/Mulish-Bold.otf"),
  // })

  // useEffect(() => {
  //   prepare()
  // }, [])

  // const prepare = async (): Promise<void> => {
  //   await SplashScreen.preventAutoHideAsync()
  // }

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync()
  //   }
  // }, [fontsLoaded])

  // if (!fontsLoaded) {
  //   return null
  // }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <View
          // onLayout={onLayoutRootView}
          style={{ minHeight: "100%" }}
        >
          <RootNavigator />
          <StatusBar style="auto" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default App
