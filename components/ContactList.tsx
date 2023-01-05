import { FC, useState, useEffect } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import Contact from "./Contact"

import { ContactType } from "expo-contacts"

import i18n from "../assets/translations/i18n"

import {
  filterListContacts,
  setListContacts,
} from "../redux/ducks/listContactsDuck"
import { setSosContacts } from "../redux/ducks/sosContactsDuck"

interface ContactListProps {}

let check: boolean = false

const ContactList: FC<ContactListProps> = (props) => {
  const filteredContacts: Array<ContactType> = useSelector(
    (state: any) => state.listContactsDuck.filteredContacts
  )
  const sosContacts: Array<ContactType> = useSelector(
    (state: any) => state.sosContactsDuck.sosContacts
  )
  const dispatch: Function = useDispatch()

  let notValidCount: boolean = false

  const handleCheckbox = (contact: ContactType): void => {
    let local: Array<ContactType> = [...sosContacts]
    let exists: boolean = false

    if (local.length > 0) {
      for (let i: number = 0; i < local.length; i++) {
        if (local[i].id === contact.id) {
          local.splice(i, 1)
          exists = true
          break
        }
      }
      if (!exists && local.length < 5) {
        local.push(contact)
      } else {
        notValidCount = true
      }
    } else local.push(contact)

    dispatch(setSosContacts({ sosContacts: local }))
  }

  const renderItem = ({ item }: any): JSX.Element => {
    let notValidNumber: boolean = false

    if (item.phoneNumbers) {
      if (item.phoneNumbers[0].number.toString().includes("+39")) {
        notValidNumber = false
      } else {
        notValidNumber = true
      }
    }

    if (sosContacts.length === 5) {
      notValidCount = true
    } else {
      notValidCount = false
    }

    for (let i: number = 0; i < sosContacts.length; i++) {
      if (sosContacts[i].id === item.id) {
        check = true
        break
      } else {
        check = false
      }
    }

    return (
      <Contact
        el={item}
        callbackChange={handleCheckbox}
        disableCheck={
          (notValidNumber || notValidCount) && !check ? true : false
        }
        isChecked={check}
      />
    )
  }

  return (
    <FlatList
      data={filteredContacts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={{ backgroundColor: "white" }}
    />
  )
}

export default ContactList
