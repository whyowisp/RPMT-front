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
      const id = action.payload.id
      const content = action.payload.content
      const charInEdit = state.find((character) => character._id === id)

      //Thanks Immer, state can be mutated
      charInEdit.decrepitude = content.decrepitude
      console.log(charInEdit)
      state.map((character) => (character._id !== id ? character : charInEdit))
    },
    appendEmptyField(state, action) {
      console.log('empty field called')
      const id = action.payload
      const charInEdit = state.find((character) => character._id === id)
      charInEdit.decrepitude.effectsOfAging.push([''])
    },
  },
})

// Action creators are generated for each case reducer function
export const { charactersInitialization, characterEdition, appendEmptyField } =
  characterSlice.actions

// *** START OF THUNK FUNCTIONS ***

export const initCharactersReducer = () => {
  return async (dispatch) => {
    const charactersFromDb = await charService.getAll()
    console.log(charactersFromDb)
    dispatch(charactersInitialization(charactersFromDb))
  }
}

export const editCharacter = (data) => {
  console.log(data)
  return async (dispatch) => {
    dispatch(characterEdition(data))
    await charService
      .updateChar(data.content, data.id)
      .then((result) =>
        console.log('result of update: ' + JSON.stringify(result))
      )
  }
}

// *** END OF THUNK FUNCTIONS ***

export default characterSlice.reducer
