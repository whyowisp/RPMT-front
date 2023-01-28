import {
  Box,
  Typography,
  ThemeProvider,
  CssBaseline,
  Divider,
} from '@mui/material'

import { sheetThemeAM } from '../themeAndStyles'
import AMbackground from '../../images/AMbackground.jpg'

import BasicStats from './BasicStats'
import Characteristics from './Characteristics'
import VirtuesAndFlaws from './VirtuesAndFlaws'
import Abilities from './Abilities'
import PersonalityTraits from './PersonalityTraits'
import Reputations from './Reputations'
import Combat from './Combat'
import Wounds from './Wounds'
import Fatigue from './Fatigue'
import Weapons from './Weapons'
import Equipment from './Equipment'
import Depiction from './Depiction'
import Vis from './Vis'
import Powers from './Powers'

const NpcSheet = ({ npcId }) => {
  return (
    <ThemeProvider theme={sheetThemeAM}>
      <CssBaseline />

      <Box
        sx={{
          padding: 1,
          margin: 1,
          position: 'relative',
          mb: 10,
          backgroundSize: 'contain',
          backgroundRepeat: 'space',
          backgroundPosition: 'top',
          backgroundImage: `url(${AMbackground})`,
          border: '2px solid',
        }}
      >
        <Box display="flex" justifyContent="center" sx={{ p: 1, pb: 0 }}>
          <Typography variant="label">- Ars Magica -</Typography>
        </Box>
        <Box display="flex" justifyContent="center" sx={{ p: 1, pb: 0 }}>
          <Typography variant="labelSm">NPC & CREATURE SHEET</Typography>
        </Box>
        <BasicStats npcId={npcId} />
        <Divider />
        <Characteristics npcId={npcId} />
        <Divider />
        <VirtuesAndFlaws npcId={npcId} />
        <Divider />
        <Abilities npcId={npcId} />
        <Divider />
        <PersonalityTraits npcId={npcId} />
        <Divider />
        <Reputations npcId={npcId} />
        <Divider />
        <Combat npcId={npcId} />
        <Divider />
        <Wounds npcId={npcId} />
        <Divider />
        <Fatigue npcId={npcId} />
        <Divider />
        <Weapons npcId={npcId} />
        <Divider />
        <Equipment npcId={npcId} />
        <Divider />
        <Depiction npcId={npcId} />
        <Divider />
        <Vis npcId={npcId} />
        <Divider />
        <Powers npcId={npcId} />
      </Box>
    </ThemeProvider>
  )
}

export default NpcSheet
