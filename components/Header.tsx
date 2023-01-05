import { FC, useEffect, useState } from "react"
import { Button, Image, Text, TouchableOpacity, View } from "react-native"

import header from "../styles/components/header"

interface HeaderProps {
  children: string | null
  buttonVisible: boolean
  buttonLabel?: string
  callbackReturn?: Function
  callbackGo?: Function
}

interface State {
  buttonVisible: boolean
}

const initialState = {
  buttonVisible: false,
}

const Header: FC<HeaderProps> = (props) => {
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    setState({
      ...state,
      buttonVisible: props.buttonVisible,
    })
  }, [])

  const pressGoBack = (): void => {
    if (!!props.callbackReturn) {
      props.callbackReturn()
    }
  }

  const pressGo = (): void => {
    if (!!props.callbackGo) {
      props.callbackGo()
    }
  }

  return (
    <View style={header.headerContainer}>
      <View style={header.headerTitle}>
        <TouchableOpacity onPress={pressGoBack} style={header.headerIcon}>
          <Image source={require("../assets/images/goback.png")}></Image>
        </TouchableOpacity>
        <Text style={header.headerTitleLabel}>{props.children}</Text>
      </View>
      {state.buttonVisible && <Button title={"ok"} onPress={pressGo} />}
    </View>
  )
}

export default Header
