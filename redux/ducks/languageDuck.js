import { createSlice } from "@reduxjs/toolkit";

export const setLanguage = (language) => dispatch => {
    try {
        return dispatch(setLanguageAction(language))
    } catch (e) {
        return console.error(e.message)
    }
}

export const initLanguage = () => dispatch => {
    try {
        return dispatch(initLanguageAction())
    } catch (e) {
        return console.error(e.message)
    }
}

const languageDuck = createSlice(
    {
        name: 'languageDuck',
        initialState: {
            language: '',
        },
        reducers: {
            setLanguageAction: (state, action) => {
                state.language = action.payload.language
            },
            initLanguageAction: (state, action) => {
                state.language = ''
            },
        },
    }
)

export default languageDuck.reducer

const { setLanguageAction, initLanguageAction } = languageDuck.actions