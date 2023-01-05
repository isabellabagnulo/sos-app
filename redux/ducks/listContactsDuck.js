import { createSlice } from "@reduxjs/toolkit";

export const setListContacts = (listContacts) => dispatch => {
    try {
        return dispatch(setListContactsAction(listContacts))
    } catch (e) {
        return console.error(e.message)
    }
}

export const filterListContacts = (filteredContacts) => dispatch => {
    try {
        return dispatch(filterListContactsAction(filteredContacts))
    } catch (e) {
        return console.error(e.message)
    }
}

// export const sosListContacts = (sosContacts) => dispatch => {
//     try {
//         return dispatch(sosListContactsAction(sosContacts))
//     } catch (e) {
//         return console.error(e.message)
//     }
// }

export const initListContacts = () => dispatch => {
    try {
        return dispatch(initListContactsAction())
    } catch (e) {
        return console.error(e.message)
    }
}

const listContactsDuck = createSlice(
    {
        name: 'listContactsDuck',
        initialState: {
            listContacts: [],
            filteredContacts: [],
            // sosContacts: []
        },
        reducers: {
            setListContactsAction: (state, action) => {
                state.listContacts = action.payload.listContacts
            },
            filterListContactsAction: (state, action) => {
                state.filteredContacts = action.payload.filteredContacts
            },
            // sosListContactsAction: (state, action) => {
            //     state.sosContacts = action.payload.sosContacts
            // },
            initListContactsAction: (state, action) => {
                state.listContacts = []
            },
        },
    }
)

export default listContactsDuck.reducer

const { setListContactsAction, filterListContactsAction, initListContactsAction } = listContactsDuck.actions