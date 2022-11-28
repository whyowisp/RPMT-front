import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './reducers/characterReducer'
import playerReducer from './reducers/playerReducer'

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    player: playerReducer,
  },
})
