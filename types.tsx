export type ContactType = {
  contactType: string
  firstName: string
  id: number
  imageAvailable: boolean
  image: object
  name: string
  phoneNumbers: Array<PhoneNumbers>
}

type PhoneNumbers = {
  countryCode: string
  digits: number
  id: string
  label: string
  number: string
}

export type LocationType = {
  region: {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
  }
}

export type LocationApiType = {
  coords: {
    latitude: number
    longitude: number
  }
}

export type NavigationType = {
  navigate: Function
  goBack: Function
}
