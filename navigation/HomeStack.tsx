import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../screens/HomeScreen"
import ContactScreen from "../screens/ContactScreen"
import { HomeStackNavigatorParamList } from "./types"

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>()

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Contact" component={ContactScreen} />
    </HomeStack.Navigator>
  )
}

export default HomeStackNavigator
