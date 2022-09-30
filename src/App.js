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

  console.log(characters)

  if (!characters) return null

  return (
    <div>
      <CssBaseline />
      <CharacterSheet character={characters[0]} />
    </div>
  )
}
export default App
