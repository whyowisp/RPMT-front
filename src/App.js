import { useEffect, useState } from 'react'
import { CssBaseline } from '@mui/material'
import charService from './services/characters'

import CharacterSheet from './components/CharacterSheet'

const App = () => {
  const [characters, setCharacter] = useState()

  useEffect(() => {
    charService.getAll().then((response) => {
      setCharacter(response)
    })
    // eslint-disable-next-line
  }, [])
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
