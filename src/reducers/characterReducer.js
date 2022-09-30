import { createSlice } from '@reduxjs/toolkit'
import charService from '../services/characters'

const initialState = null

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    charactersInitialization(state, action) {
      console.log(action.payload)
      return action.payload
    },
    characterEdition(state, action) {
      console.log(action.payload)
      const content = action.payload
      const character = state.find((c) => c.id === content.id)
      const editedCharacter = { ...character, content }
      return editedCharacter
    },
  },
})

// Action creators are generated for each case reducer function
export const { charactersInitialization, characterEdition } =
  characterSlice.actions

// *** START OF THUNK FUNCTIONS ***

export const initCharactersReducer = () => {
  return async (dispatch) => {
    const charactersFromDb = await charService.getAll()
    dispatch(charactersInitialization(charactersFromDb))
  }
}

export const editCharacter = (data, id) => {
  return async (dispatch) => {
    dispatch(characterEdition(data, id))
    charService
      .updateChar(data, id)
      .then((result) =>
        console.log('result of update: ' + JSON.stringify(result))
      )
  }
}

// *** END OF THUNK FUNCTIONS ***

export default characterSlice.reducer
