import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './reducers/characterReducer'
import loggedPlayerReducer from './reducers/loggedPlayerReducer'

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    player: loggedPlayerReducer,
  },
})
