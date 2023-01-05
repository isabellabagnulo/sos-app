import { createSlice } from "@reduxjs/toolkit";

export const setSosContacts = (sosContacts) => dispatch => {
    try {
        return dispatch(setSosContactsAction(sosContacts))
    } catch (e) {
        return console.error(e.message)
    }
}

export const initSosContacts = () => dispatch => {
    try {
        return dispatch(initSosContactsAction())
    } catch (e) {
        return console.error(e.message)
    }
}

const sosContactsDuck = createSlice(
    {
        name: 'sosContactsDuck',
        initialState: {
            sosContacts: [],
        },
        reducers: {
            setSosContactsAction: (state, action) => {
                state.sosContacts = action.payload.sosContacts
            },
            initSosContactsAction: (state, action) => {
                state.sosContacts = []
            },
        },
    }
)

export default sosContactsDuck.reducer

const { setSosContactsAction, initSosContactsAction } = sosContactsDuck.actions