import { FC, useState, useEffect } from "react"
import { Button, FlatList, ScrollView, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import ContactList from "../components/ContactList"
import Header from "../components/Header"
import Inputbox from "../components/ui/InputBox"

import { ContactType, NavigationType } from "../types"

import i18n from "../assets/translations/i18n"

import { filterListContacts } from "../redux/ducks/listContactsDuck"

import commonStyles from "../styles/commonStyles"

interface ContactScreenProps {
  navigation: NavigationType
}

const ContactScreen: FC<ContactScreenProps> = ({ navigation }) => {
  let searchText: string = ""

  const listContacts: Array<ContactType> = useSelector(
    (state: any) => state.listContactsDuck.listContacts
  )
  const dispatch: Function = useDispatch()

  const filterContact = (e: string): void => {
    searchText = e.toLowerCase()

    const filteredContact = listContacts.filter((contact: ContactType) => {
      if (contact.firstName !== undefined) {
        return contact.firstName.toLowerCase().includes(searchText)
      } else return console.log("nome non trovato")
    })

    dispatch(filterListContacts({ filteredContacts: filteredContact }))
  }

  const goBack = (): void => {
    navigation.goBack()
  }
  const goToHome = (): void => {
    navigation.navigate("Home")
  }

  return (
    <>
      <Header
        callbackReturn={goBack}
        callbackGo={goToHome}
        buttonVisible={true}
      >
        {i18n.t("contact")}
      </Header>

      <Inputbox
        placeholder={i18n.t("search")}
        type={"default"}
        callbackChange={filterContact}
      />
      <ContactList />
    </>
  )
}
export default ContactScreen
