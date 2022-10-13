import { useState } from 'react'
import { Container } from '@mui/system'
import { Button, CssBaseline, Grid, ThemeProvider } from '@mui/material'

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
        <Grid container spacing={1} sx={{ mt: 3 }}>
          <Button variant="contained" a href="" onClick={toPage('home')}>
            home
          </Button>
          <Button
            variant="contained"
            a
            href=""
            onClick={toPage('characterList')}
          >
            characters
          </Button>
          <main>{content()}</main>
        </Grid>
      </ThemeProvider>
    </Container>
  )
}

export default App
