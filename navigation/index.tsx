import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"

import HomeStackNavigator from "./HomeStack"
import store from "../redux/store"

const RootNavigator = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default RootNavigator
