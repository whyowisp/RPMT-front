import { Stack, ThemeProvider } from '@mui/material'

import { sheetThemeAM } from './themeAndStyles'
import Decrepitude from './Decrepitude'
import Warping from './Warping'
import BasicData from './BasicData'

const CharacterSheet = ({ id }) => {
  if (!id) return null

  return (
    <div>
      <ThemeProvider theme={sheetThemeAM}>
        <BasicData id={id} />
        <Stack direction={'row'}>
          <Decrepitude id={id} />
          <Warping id={id} />
        </Stack>
      </ThemeProvider>
    </div>
  )
  /*
  return (
    <div>
      <ThemeProvider theme={sheetThemeAM}>
        <BasicData id={id} />
        <Stack direction={'row'}>
          <Decrepitude id={id} />
          <Warping id={id} />
        </Stack>
      </ThemeProvider>
    </div>
  )*/
}

export default CharacterSheet
