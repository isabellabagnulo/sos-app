import { FC, useState } from "react"
import { Button, Modal, Pressable, Text, View } from "react-native"

import OpacityButton from "./ui/OpacityButton"

import i18n from "../assets/translations/i18n"

import buttons from "../styles/components/ui/buttons"
import commonStyles from "../styles/commonStyles"
import modal from "../styles/components/modal"
import tutorial from "../styles/components/tutorial"

interface TutorialProps {
  isVisible: boolean
  callback: Function
}

interface State {
  modalVisible: boolean
}

const initialState = {
  modalVisible: false,
}

const Tutorial: FC<TutorialProps> = (props) => {
  const [state, setState] = useState<State>(initialState)

  function setModal() {
    setState({
      ...state,
      modalVisible: props.isVisible,
    })
  }

  const press = (): void => {
    if (!!props.callback) {
      props.callback()
    }
  }

  return (
    <View>
      <Modal
        transparent={true}
        visible={props.isVisible}
        onRequestClose={setModal}
      >
        <View style={[modal.centeredView, tutorial.centeredViewTutorial]}>
          <View style={[modal.modalView, tutorial.modalViewTutorial]}>
            <Text style={commonStyles.title}>{i18n.t("tutorial")}</Text>
            <View style={tutorial.list}>
              <Text style={commonStyles.paragraph}>
                {i18n.t("press")} {i18n.t("addContact")}
              </Text>
              <Text style={commonStyles.paragraph}>
                {i18n.t("errorMessage")}
              </Text>
              <Text style={commonStyles.paragraph}>
                {i18n.t("press")} "{i18n.t("sendSOS")}" {"askHelp"}
              </Text>
            </View>
            <OpacityButton
              customStyle={[
                buttons.largeButton,
                buttons.confirmButton,
                modal.modalButton,
              ]}
              callback={press}
            >
              <Text style={[buttons.buttonLabel, buttons.largeButtonLabel]}>
                {i18n.t("skip")}
              </Text>
            </OpacityButton>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Tutorial
