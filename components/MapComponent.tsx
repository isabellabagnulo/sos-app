import { FC, useEffect, useState } from "react"
import { Dimensions, Text, View } from "react-native"
import * as Location from "expo-location"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { useDispatch, useSelector } from "react-redux"

import mapComponent from "../styles/components/mapComponent"

import { LocationType } from "../types"

import { setLocation } from "../redux/ducks/locationDuck"

interface State {
  errorMsg: string
  location: LocationType
}

const initialState: State = {
  errorMsg: "",
  location: {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
}

let geocode: object = {}

const MapComponent: FC = () => {
  const [state, setState] = useState<State>(initialState)
  const dispatch: Function = useDispatch()

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = async (): Promise<void> => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      return
    }

    const position = await Location.getCurrentPositionAsync({})
    let coords = {
      region: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00001,
        longitudeDelta: 0.01,
      },
    }

    dispatch(setLocation({ location: position }))

    setState({
      ...state,
      location: coords,
    })
  }

  if (!state.location) {
    return <Text>{state.errorMsg}</Text>
  }

  return (
    <View>
      <MapView
        region={state.location.region}
        // onRegionChange={state.location.region}
        style={mapComponent.mapContainer}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
      />
    </View>
  )
}

export default MapComponent
