import { ThemeProvider, CssBaseline, Grid, Box, Paper } from '@mui/material'
//import Image from 'mui-image' might want to uninstall this

import { sheetThemeAM } from './themeAndStyles'
import Decrepitude from './Decrepitude'
import Warping from './Warping'
import BasicAttributes from './BasicAttributes'
import DescriptiveAttributes from './DescriptiveAttributes'
import Characteristics from './Characteristics'
import Abilities from './Abilities'
import VirtuesFlaws from './VirtuesFlaws'
import PersonalityTraits from './PersonalityTraits'
import Reputations from './Reputations'
import Combat from './Combat'
import Fatigue from './Fatigue'
import Wounds from './Wounds'
import Weapons from './Weapons'

import Equipment from './Equipment'

import AMbackground from '../../images/AMbackground.jpg'

const CharacterSheet = ({ id }) => {
  //Note <Grid item xs={12} md={6}> means that element takes full width(12) over sx(600px)
  //and half width(6) over md(900px). Think breakpoints as 'bigger than...'
  /*
xs, extra-small: 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px
*/
  if (!id) return null
  return (
    <ThemeProvider theme={sheetThemeAM}>
      <CssBaseline />
      <Paper
        sx={{
          position: 'relative',
          color: 'black',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left',
          backgroundImage: `url(${AMbackground})`,
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <BasicAttributes id={id} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box></Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Decrepitude id={id} />
          </Grid>
          <Grid item xs={6} md={3}>
            <Warping id={id} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DescriptiveAttributes id={id} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Characteristics id={id} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Abilities id={id} />
          </Grid>
          <Grid item xs={12} md={6}>
            <VirtuesFlaws id={id} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PersonalityTraits id={id} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Reputations id={id} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Combat id={id} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Fatigue id={id} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Wounds id={id} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Weapons id={id} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Equipment id={id} />
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  )
}

export default CharacterSheet
