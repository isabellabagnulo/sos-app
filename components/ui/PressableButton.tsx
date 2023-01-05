import { FC } from "react"
import { Pressable, Text } from "react-native"

interface PressableButtonProps {
  children: any
  customStyle?: object
  callbackPress: Function
}

const PressableButton: FC<PressableButtonProps> = (props) => {
  const handlePress = (): void => {
    props.callbackPress()
  }

  return (
    <Pressable onPress={handlePress} style={props.customStyle}>
      {props.children}
    </Pressable>
  )
}

export default PressableButton
