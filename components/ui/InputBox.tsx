import React, { FC, ChangeEvent } from "react"
import { Image, TextInput, View } from "react-native"

import input from "../../styles/components/ui/input"

interface InputProps {
  placeholder?: string
  value?: string | number
  type?: string
  callbackChange: Function
}

const Inputbox: FC<InputProps> = (props) => {
  const handleInput = (e: any): void => {
    props.callbackChange(e)
  }

  return (
    <View style={input.inputContainer}>
      <Image source={require("../../assets/images/search.png")} />
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        keyboardType={props.type}
        onChangeText={handleInput}
        style={input.input}
      />
    </View>
  )
}

export default Inputbox
