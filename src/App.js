import { useEffect } from 'react'
import { CssBaseline } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { initCharactersReducer } from './reducers/characterReducer'

import CharacterSheet from './components/CharacterSheet'

const App = () => {
  const characters = useSelector((state) => state.characters)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initCharactersReducer())
  }, [dispatch])

  if (!characters) return null
  console.log(characters)
  return (
    <div>
      <CssBaseline />
      <CharacterSheet id={characters[0]._id} />
    </div>
  )
}
export default App
