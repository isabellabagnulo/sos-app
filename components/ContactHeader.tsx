import { FC, useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import Checkbox from "expo-checkbox"
import { useDispatch, useSelector } from "react-redux"

import Header from "./Header"
import Inputbox from "./ui/InputBox"

import i18n from "../assets/translations/i18n"

import {
  setListContacts,
  filterListContacts,
} from "../redux/ducks/listContactsDuck"

import commonStyles from "../styles/commonStyles"
import contact from "../styles/components/contact"

interface ContactHeaderProps {
  goBack: Function
  goToHome: Function
}

const ContactHeader: FC<ContactHeaderProps> = (props) => {
  let searchText: string = ""

  const listContacts: Array<any> = useSelector(
    (state: any) => state.listContactsDuck.listContacts
  )
  const dispatch: any = useDispatch()

  const filterContact = (e: any): void => {
    searchText = e.toLowerCase()

    const filteredContact = listContacts.filter((contact: any) => {
      if (contact.firstName !== undefined) {
        return contact.firstName.toLowerCase().includes(searchText)
      } else return console.log("nome non trovato")
    })

    dispatch(filterListContacts({ filteredContacts: filteredContact }))
  }

  return (
    <>
      <Header
        callbackReturn={props.goBack}
        callbackGo={props.goToHome}
        buttonVisible={true}
        buttonLabel={i18n.t("ok")}
      >
        {i18n.t("contact")}
      </Header>

      <Inputbox
        placeholder={i18n.t("search")}
        type={"default"}
        callbackChange={filterContact}
      />
    </>
  )
}

export default ContactHeader
