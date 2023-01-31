import { createSlice } from '@reduxjs/toolkit'

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const defaultGroups = [
  {
    _id: toString(generateId()),
    name: 'Group 1',
    characters: [],
  },
]
/*eslint-disable */
export const groupsSlice = createSlice({
  name: 'groups',
  initialState: defaultGroups,
  reducers: {
    groupInitialization(state, action) {
      console.log(action.payload)
      return action.payload
    },
    groupCreation(state) {
      state.push({
        name: `Group ${state.length + 1}`,
        characters: [],
      })
    },
    groupEdition(state, action) {
      const groupID = action.payload.groupID
      const newName = action.payload.newName

      return state.map((group) =>
        group._id === groupID ? { ...group, name: newName } : group
      )
    },
    groupDeletion(state, action) {
      console.log(action.payload)
      const id = action.payload
      return state.filter((group) => group._id !== id)
    },
    characterAddition(state, action) {
      const groupID = action.payload.groupID
      const characterID = action.payload.characterID

      const groupToUpdate = state.find((group) => group._id === groupID)
      const updatedGroup = {
        _id: groupToUpdate._id,
        name: groupToUpdate.name,
        characters: groupToUpdate.characters.concat(characterID),
      }

      return state.map((group) =>
        group._id !== groupID ? group : updatedGroup
      )
    },
    characterDeletion(state, action) {
      const groupID = action.payload.groupID
      const characterID = action.payload.characterID
      const groupToUpdate = state.find((group) => group._id === groupID)
      console.log('groupToupdate: ' + JSON.stringify(groupToUpdate))
      const updatedGroup = {
        ...groupToUpdate,
        characters: groupToUpdate.characters.filter(
          (character) => character !== characterID
        ),
      }
      console.log('updatedGRoup: ' + JSON.stringify(updatedGroup))
      return state.map((group) =>
        group._id === groupID ? updatedGroup : group
      )
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  groupInitialization,
  groupEdition,
  groupCreation,
  groupDeletion,
  characterAddition,
  characterDeletion,
} = groupsSlice.actions

// *** START OF THUNK FUNCTIONS ***

export const addCharacter = (data) => {
  return async (dispatch) => {
    dispatch(characterAddition(data))
  }
}

export const removeCharacter = (data) => {
  console.log(data)
  return async (dispatch) => {
    dispatch(characterDeletion(data))
  }
}

export const initGroups = (group) => {
  return async (dispatch) => {
    dispatch(groupInitialization(group))
  }
}

export const editGroupName = (data) => {
  return async (dispatch) => {
    dispatch(groupEdition(data))
  }
}

export const createGroup = () => {
  return async (dispatch) => {
    dispatch(groupCreation())
  }
}

export const deleteGroup = (groupID) => {
  return async (dispatch) => {
    dispatch(groupDeletion(groupID))
  }
}

// *** END OF THUNK FUNCTIONS ***

export default groupsSlice.reducer
