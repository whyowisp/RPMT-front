import { createSlice } from '@reduxjs/toolkit'
import playerService from '../services/players'

const initialState = null

export const playersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPlayers(state, action) {
      return action.payload
    },
  },
})

export const { setPlayers } = playersSlice.actions

//Thunk functions
export const initializePlayers = () => {
  return async (dispatch) => {
    const allPlayers = await playerService.getAll()
    dispatch(setPlayers(allPlayers))
  }
}

export default playersSlice.reducer
