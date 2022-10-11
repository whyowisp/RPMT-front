import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/system'
import { CssBaseline, Grid, ThemeProvider } from '@mui/material'

import { testTheme } from './components/arsMagCharSheet/themeAndStyles'
import CharacterList from './components/CharacterList'
import CharacterSheet from './components/arsMagCharSheet/CharacterSheet'

const App = () => {
  return (
    <Container maxWidth="lg">
      <ThemeProvider theme={testTheme}>
        <CssBaseline />
        <Grid container spacing={1} sx={{ mt: 3 }}>
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/characters/:id" element={<CharacterSheet />} />
          </Routes>
        </Grid>
      </ThemeProvider>
    </Container>
  )
}
export default App
