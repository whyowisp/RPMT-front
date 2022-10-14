import { useState } from 'react'
import { Container } from '@mui/system'
import { Button, CssBaseline, ThemeProvider } from '@mui/material'

import { mainTheme } from './components/arsMagCharSheet/themeAndStyles'
import Home from './components/Home'
import CharacterList from './components/CharacterList'
import CharacterSheet from './components/arsMagCharSheet/CharacterSheet'

const App = () => {
  const [page, setPage] = useState('home')
  const [id, setId] = useState()

  const toPage = (page, id) => (event) => {
    event.preventDefault()
    setPage(page)
    setId(id)
  }

  const content = () => {
    if (page === 'home') {
      return <Home />
    } else if (page === 'characterList') {
      return <CharacterList toPage={toPage} />
    } else if (page === 'characterSheet') {
      return <CharacterSheet id={id} />
    }
  }
  return (
    <Container maxWidth="lg">
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Button sx={{ m: 1 }} variant="contained" onClick={toPage('home')}>
          home
        </Button>
        <Button variant="contained" onClick={toPage('characterList')}>
          characters
        </Button>
        <main>{content()}</main>
      </ThemeProvider>
    </Container>
  )
}

export default App
