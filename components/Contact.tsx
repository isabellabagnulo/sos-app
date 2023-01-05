import { FC, useEffect, useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import Checkbox from "expo-checkbox"
import { useDispatch, useSelector } from "react-redux"

import i18n from "../assets/translations/i18n"

import commonStyles from "../styles/commonStyles"
import contact from "../styles/components/contact"

interface ContactProps {
  el: any
  callbackChange: Function
  disableCheck: boolean
  isChecked: boolean
}

interface State {
  isChecked: boolean
  disableCheck: boolean
  validNumber: boolean
}

const Contact: FC<ContactProps> = (props) => {
  const initialState: State = {
    isChecked: props.isChecked,
    disableCheck: false,
    validNumber: true,
  }
  const [state, setState] = useState<State>(initialState)

  const sosContacts: Array<any> = useSelector(
    (state: any) => state.sosContactsDuck.sosContacts
  )

  const handleCheckbox = (): void => {
    setState({
      ...state,
      isChecked: !state.isChecked,
    })

    props.callbackChange(props.el)
  }

  return (
    <View
      style={[
        contact.contactContainer,
        state.isChecked && { backgroundColor: "#DADADA" },
      ]}
    >
      <Text
        style={[
          commonStyles.paragraph,
          !props.disableCheck
            ? contact.contactLabel
            : contact.contactLabelDisable,
        ]}
      >
        {props.el.name}
      </Text>

      {state.disableCheck && (
        <View style={contact.errorContainer}>
          <Text style={contact.errorLabel}>{i18n.t("errorMessage")}</Text>
        </View>
      )}

      <Checkbox
        value={state.isChecked}
        onValueChange={handleCheckbox}
        color={state.isChecked ? "#FF4848" : undefined}
        disabled={props.disableCheck}
      />
    </View>
  )
}

export default Contact
