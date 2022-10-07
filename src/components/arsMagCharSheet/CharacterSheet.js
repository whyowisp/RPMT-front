import { createTheme, Stack, ThemeProvider, CssBaseline } from '@mui/material'

import { sheetThemeAM } from './themeAndStyles'
import Decrepitude from './Decrepitude'
import Warping from './Warping'
import BasicAttributes from './BasicAttributes'
import DescriptiveAttributes from './DescriptiveAttributes'
import Characteristics from './Characteristics'
import Abilities from './Abilities'
import VirtuesFlaws from './VirtuesFlaws'

const CharacterSheet = ({ id }) => {
  if (!id) return null

  return (
    <div>
      <ThemeProvider theme={sheetThemeAM}>
        <CssBaseline />
        <BasicAttributes id={id} />
        <Stack direction={'row'}>
          <Decrepitude id={id} />
          <Warping id={id} />
        </Stack>
        <DescriptiveAttributes id={id} />
        <Characteristics id={id} />
        <Abilities id={id} />
        <VirtuesFlaws id={id} />
      </ThemeProvider>
    </div>
  )
}

export default CharacterSheet
