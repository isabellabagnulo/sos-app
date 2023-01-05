import { FC, useEffect, useState } from "react"
import { Button, Image, ScrollView, Text, View } from "react-native"
import * as Contacts from "expo-contacts"
import { useDispatch, useSelector } from "react-redux"
import * as SMS from "expo-sms"
import * as Location from "expo-location"
import AsyncStorage from "@react-native-async-storage/async-storage"

import ContactCircle from "../components/ContactCircle"
import Header from "../components/Header"
import MapComponent from "../components/MapComponent"
import ModalComponent from "../components/ModalComponent"
import OpacityButton from "../components/ui/OpacityButton"
import PressableButton from "../components/ui/PressableButton"
import Tutorial from "../components/Tutorial"

import { ContactType, LocationApiType } from "../types"

import i18n from "../assets/translations/i18n"

import {
  setListContacts,
  filterListContacts,
} from "../redux/ducks/listContactsDuck"
import { setSosContacts } from "../redux/ducks/sosContactsDuck"
import { setLanguage } from "../redux/ducks/languageDuck"

import commonStyles from "../styles/commonStyles"
import buttons from "../styles/components/ui/buttons"
import { LocationGeocodedAddress } from "expo-location"

interface HomeScreenProps {
  navigation: any
}

interface State {
  modalVisible: boolean
  modalErrorVisible: boolean
  tutorialIsVisible: boolean
  contatti: Array<ContactType>
  activeIt: boolean
  activeEn: boolean
}

const InitialState = {
  modalVisible: false,
  modalErrorVisible: false,
  tutorialIsVisible: false,
  contatti: [],
  activeIt: false,
  activeEn: true,
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [state, setState] = useState<State>(InitialState)

  const dispatch: Function = useDispatch()
  const dispatchFilter: Function = useDispatch()

  const sosContacts: Array<ContactType> = useSelector(
    (state: any) => state.sosContactsDuck.sosContacts
  )
  const location: LocationApiType = useSelector(
    (state: any) => state.locationDuck.location
  )

  let message: string = ""

  const dispatchLanguage: any = useDispatch()

  useEffect(() => {
    getContacts()
    getData()
  }, [])

  useEffect(() => {
    storeData(sosContacts)
  }, [sosContacts])

  const getContacts = async (): Promise<void> => {
    const { status } = await Contacts.requestPermissionsAsync()
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Image,
        ],
      })

      if (data.length > 0) {
        data.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
      }
      dispatch(setListContacts({ listContacts: data }))
      dispatchFilter(filterListContacts({ filteredContacts: data }))
    }
  }

  const storeData = async (value: any): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem("contacts", jsonValue)
    } catch (e) {
      console.log("set fallito")
    }
  }

  const getData = async (): Promise<void> => {
    try {
      const jsonValue = await AsyncStorage.getItem("contacts")

      if (jsonValue === null) {
        setState({
          ...state,
          tutorialIsVisible: true,
        })
        dispatch(setSosContacts({ sosContacts: [] }))
      } else {
        dispatch(setSosContacts({ sosContacts: JSON.parse(jsonValue) }))
      }
    } catch (e) {
      console.log("contatti vuoto")
    }
  }

  const removeValue = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("contacts")
      dispatch(setSosContacts({ sosContacts: [] }))
    } catch (e) {}
  }

  const goToContact = (): void => {
    navigation.navigate("Contact")
  }

  const goBack = (): void => {
    console.log("non ci sono altre pagine")
  }

  const closeModal = (): void => {
    setState({
      ...state,
      modalVisible: false,
      modalErrorVisible: false,
      tutorialIsVisible: false,
    })
  }

  const sosPress = async (): Promise<void> => {
    // push number to send message
    let numbers: Array<string> = []
    sosContacts.forEach((contact: ContactType) => {
      return numbers.push(contact.phoneNumbers[0].number)
    })

    let geocode: Array<LocationGeocodedAddress> =
      await Location.reverseGeocodeAsync(location.coords)

    message = i18n.t("message", {
      address: geocode[0].name,
      city: geocode[0].city,
    })

    let viewErrorModal: boolean = false
    let viewModal: boolean = false

    if (sosContacts.length <= 0) {
      viewErrorModal = true
      console.log("true", sosContacts)
    } else {
      console.log("false", sosContacts)
      const { result } = await SMS.sendSMSAsync(numbers, message)
      result === "cancelled" ? (viewModal = false) : (viewModal = true)
      viewErrorModal = false
    }

    setState({
      ...state,
      modalVisible: viewModal,
      modalErrorVisible: viewErrorModal,
    })
  }

  const changeLanguage = (): void => {
    let lang: string = ""
    if (i18n.locale === "it") {
      lang = "en"
      setState({
        ...state,
        activeIt: false,
        activeEn: true,
      })
    } else {
      lang = "it"
      setState({
        ...state,
        activeIt: true,
        activeEn: false,
      })
    }
    i18n.locale = lang

    dispatchLanguage(setLanguage({ language: i18n.locale }))
  }

  const mappingContactCircle = (
    contact: ContactType,
    key: number
  ): JSX.Element => {
    return <ContactCircle key={key} el={contact} />
  }

  return (
    <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
      <Header callbackReturn={goBack} buttonVisible={false}>
        {i18n.t("emergengy")}
      </Header>

      <View style={commonStyles.genericContainer}>
        <Text style={commonStyles.subtitle}>{i18n.t("position")}</Text>
        <MapComponent />

        <Text style={commonStyles.subtitle}>{i18n.t("emergencyContact")}</Text>
        <Text style={commonStyles.paragraph}>
          {i18n.t("addEmergencyContact")}
        </Text>

        <View style={commonStyles.contactsSection}>
          <PressableButton
            customStyle={buttons.addButton}
            callbackPress={goToContact}
          >
            <View>
              <Image source={require("../assets/images/add.png")} />
            </View>
            <Text style={[buttons.addButtonText, commonStyles.paragraph]}>
              {i18n.t("addContact")}
            </Text>
          </PressableButton>
          {sosContacts &&
            sosContacts.length > 0 &&
            sosContacts.map(mappingContactCircle)}
        </View>

        <View style={[commonStyles.centeredSection, { paddingVertical: 0 }]}>
          <Button title={i18n.t("removeContact")} onPress={removeValue} />
        </View>

        <View style={commonStyles.centeredSection}>
          <OpacityButton
            customStyle={[buttons.largeButton, buttons.sosButton]}
            callback={sosPress}
          >
            <Text style={[buttons.buttonLabel, buttons.largeButtonLabel]}>
              {i18n.t("sendSOS")}
            </Text>
          </OpacityButton>
          <Text style={[commonStyles.paragraph, commonStyles.paragraphRed]}>
            {i18n.t("infoButton")}
          </Text>
        </View>

        <View style={[commonStyles.centeredSection, buttons.languageButton]}>
          <OpacityButton
            customStyle={buttons.languageButtonLabel}
            callback={changeLanguage}
          >
            <Text
              style={
                state.activeIt
                  ? { fontWeight: "bold" }
                  : { fontWeight: "normal" }
              }
            >
              IT
            </Text>
          </OpacityButton>
          <Text> • </Text>
          <OpacityButton
            customStyle={buttons.languageButtonLabel}
            callback={changeLanguage}
          >
            <Text
              style={
                state.activeEn
                  ? { fontWeight: "bold" }
                  : { fontWeight: "normal" }
              }
            >
              EN
            </Text>
          </OpacityButton>
        </View>

        <Tutorial isVisible={state.tutorialIsVisible} callback={closeModal} />
        <ModalComponent
          label={i18n.t("confirm")}
          message={i18n.t("modalMessage")}
          additionalStyle={buttons.confirmButton}
          visible={state.modalVisible}
          callback={closeModal}
        />
        <ModalComponent
          label={i18n.t("ok")}
          message={i18n.t("modalErrorMessage")}
          additionalStyle={buttons.sosButton}
          visible={state.modalErrorVisible}
          callback={closeModal}
        />
      </View>
    </ScrollView>
  )
}

export default HomeScreen
