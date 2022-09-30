import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './reducers/characterReducer'

export const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
})
