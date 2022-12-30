import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './reducers/characterReducer'
import loggedPlayerReducer from './reducers/loggedPlayerReducer'
import playersReducer from './reducers/playersReducer'
import campaignReducer from './reducers/campaignReducer'
import factionReducer from './reducers/factionReducer'

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    loggedPlayer: loggedPlayerReducer,
    players: playersReducer,
    campaigns: campaignReducer,
    factions: factionReducer,
  },
})
