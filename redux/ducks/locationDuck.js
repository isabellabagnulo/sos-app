import { createSlice } from "@reduxjs/toolkit";

export const setLocation = (location) => dispatch => {
    try {
        return dispatch(setLocationAction(location))
    } catch (e) {
        return console.error(e.message)
    }
}

export const initLocation = () => dispatch => {
    try {
        return dispatch(initLocationAction())
    } catch (e) {
        return console.error(e.message)
    }
}

const locationDuck = createSlice(
    {
        name: 'locationDuck',
        initialState: {
            location: {},
        },
        reducers: {
            setLocationAction: (state, action) => {
                state.location = action.payload.location
            },
            initLocationAction: (state, action) => {
                state.location = {}
            },
        },
    }
)

export default locationDuck.reducer

const { setLocationAction, initLocationAction } = locationDuck.actions