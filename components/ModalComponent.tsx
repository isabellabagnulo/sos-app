import { FC, useState } from "react"
import { Modal, Pressable, Text, View } from "react-native"

import OpacityButton from "./ui/OpacityButton"

import i18n from "../assets/translations/i18n"

import buttons from "../styles/components/ui/buttons"
import modal from "../styles/components/modal"
import commonStyles from "../styles/commonStyles"

interface ModalComponentProps {
  label: string
  message: string
  additionalStyle?: object
  visible: boolean
  callback?: Function
}

const ModalComponent: FC<ModalComponentProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false)

  const press = (): void => {
    if (!!props.callback) {
      props.callback()
    }
  }

  function setModal() {
    setModalVisible(props.visible)
  }

  return (
    <View>
      <Modal
        transparent={true}
        visible={props.visible}
        onRequestClose={setModal}
      >
        <View style={modal.centeredView}>
          <View style={modal.modalView}>
            <Text style={modal.modalText}>{props.message}</Text>

            <OpacityButton
              customStyle={[
                buttons.largeButton,
                modal.modalButton,
                props.additionalStyle,
              ]}
              callback={press}
            >
              <Text style={[buttons.buttonLabel, buttons.largeButtonLabel]}>
                {props.label}
              </Text>
            </OpacityButton>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ModalComponent
