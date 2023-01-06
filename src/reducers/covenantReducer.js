import { createSlice } from '@reduxjs/toolkit'
import covenantService from '../services/covenants'

//ABOUT ACTION NAMING
//Regular action naming convention: name actions as event (broader terms than simply 'setters')
//House action naming rules: name as what is about to happen:
//For example: What is about to happen? - characterInitialization is about to happen.

export const covenantSlice = createSlice({
  name: 'covenants',
  initialState: [],
  reducers: {
    covenantInitialization(state, action) {
      return action.payload
    },
    covenantCreation(state, action) {
      console.log(action.payload)
      state.push(action.payload)
    },
    covenantEdition(state, action) {
      console.log(action.payload.content)
      const id = action.payload.id
      const content = action.payload.content

      const covenantInEdit = state.find((covenant) => covenant.id === id)
      const editedCovenant = Object.assign(covenantInEdit, content)

      state.map((covenant) => (covenant.id !== id ? covenant : editedCovenant))
    },
    covenantRemoval(state, action) {
      const id = action.payload
      return state.filter((covenant) => covenant.id !== id)
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  covenantInitialization,
  covenantEdition,
  covenantCreation,
  covenantRemoval,
} = covenantSlice.actions

// *** START OF THUNK FUNCTIONS ***

export const initCovenants = (campaignId) => {
  return async (dispatch) => {
    const covenantsFromDb = await covenantService.getAll(campaignId)
    dispatch(covenantInitialization(covenantsFromDb))
  }
}

export const createNewCovenant = (covenant) => {
  console.log(covenant)
  return async (dispatch) => {
    const newCovenant = await covenantService.createNew(covenant)
    dispatch(covenantCreation(newCovenant))
  }
}
/*
Pass data to this function:
Use format:

{
  id: <covenantId>,
  content: {<theData>}
}
*/
export const editCovenant = (data) => {
  return async (dispatch) => {
    dispatch(covenantEdition(data))
    await covenantService.updateCovenant(data.content, data.id)
    //.then((result) =>console.log('result of update: ' + JSON.stringify(result)))
  }
}

export const removeCovenant = (id) => {
  console.log(id)
  return async (dispatch) => {
    dispatch(covenantRemoval(id))
    await covenantService.deleteCovenant(id)
  }
}

// *** END OF THUNK FUNCTIONS ***

export default covenantSlice.reducer
