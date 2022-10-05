import { createSlice } from '@reduxjs/toolkit'
import charService from '../services/characters'

//ABOUT ACTION NAMING
//Regular action naming convention: name actions as event (broader terms than simply 'setters')
//House action naming rules: name as what is about to happen:
//For example: What is about to happen? - characterInitialization is about to happen.

export const characterSlice = createSlice({
  name: 'characters',
  initialState: null,
  reducers: {
    charactersInitialization(state, action) {
      return action.payload
    },
    characterEdition(state, action) {
      console.log(action)
      const id = action.payload.id
      const content = action.payload.content

      const charInEdit = state.find((character) => character._id === id)
      const editedChar = Object.assign(charInEdit, content)

      state.map((character) => (character._id !== id ? character : editedChar))
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

/*
Pass data to this function:
Use format:

{
  id: <characterId>,
  content: {<theData>}
}
*/
export const editCharacter = (data) => {
  console.log('edit character thunk called')
  //console.log(data)
  return async (dispatch) => {
    dispatch(characterEdition(data))
    await charService.updateChar(data.content, data.id)
    //.then((result) =>console.log('result of update: ' + JSON.stringify(result)))
  }
}

// *** END OF THUNK FUNCTIONS ***

export default characterSlice.reducer
