import { FC, useState, useEffect } from "react"
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"

import i18n from "../assets/translations/i18n"

import commonStyles from "../styles/commonStyles"
import contact from "../styles/components/contact"

interface ContactCircleProps {
  el: any
}

interface State {
  imgAvailable: boolean
}

const initialState = {
  imgAvailable: false,
}

const ContactCircle: FC<ContactCircleProps> = (props) => {
  const [state, setState] = useState<State>(initialState)

  const sosContacts: Array<any> = useSelector(
    (state: any) => state.sosContactsDuck.sosContacts
  )

  useEffect(() => {
    console.log("soscont", sosContacts)
  }, [])

  return (
    <View style={contact.contactCircleContainer}>
      {props.el.imageAvailable ? (
        <View style={contact.circleContainerImage}>
          <ImageBackground
            source={{ uri: props.el.image.uri }}
            resizeMode="cover"
            style={contact.imageBackground}
          />
        </View>
      ) : (
        <View style={contact.circleContainer}>
          <Image source={require("../assets/images/user.png")} />
        </View>
      )}
      <Text style={[commonStyles.paragraph, contact.contactCircleLabel]}>
        {props.el.name}
      </Text>
    </View>
  )
}

export default ContactCircle
