import {
  ThemeProvider,
  CssBaseline,
  Grid,
  Paper,
  Divider,
  Typography,
  Container,
  Box,
} from '@mui/material'
import Image from 'mui-image'

import AMbackground from '../../images/AMbackground.jpg'
import AMLogo from '../../images/arm5-logo-grey.png'
import { sheetThemeAM, commonBoxSx } from '../themeAndStyles'

import BasicAttributes from './BasicAttributes'
import Reputations from './Reputations'
import BuildPoints from './BuildPoints'

const CovenantSheet = ({ covenantId }) => {
  if (!covenantId) return
  return (
    <ThemeProvider theme={sheetThemeAM}>
      <CssBaseline />
      <Paper
        elevation={2}
        sx={{
          padding: 1,
          position: 'relative',
          mb: 10,
          backgroundSize: 'contain',
          backgroundRepeat: 'space',
          backgroundPosition: 'left',
          backgroundImage: `url(${AMbackground})`,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} order={{ xs: -3, md: -3 }}>
            <Divider variant="middle">
              <Typography sx={{ fontFamily: 'MedievalSharp', fontSize: 16 }}>
                page 1
              </Typography>
            </Divider>
          </Grid>
          <Grid item xs={12} md={8} order={{ xs: -1, md: -2 }}>
            <Box
              component="form"
              sx={{
                ...commonBoxSx,
                background: 'rgb(0,0,0,0)',
                border: 'none',
              }}
            >
              <Typography variant="h4">Covenant Record Sheet</Typography>
              <Typography variant="body2">
                Covenant record sheet / page 1 of 4
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} order={{ xs: -2, md: -1 }}>
            <Container sx={{ mt: 6, mb: 1 }}>
              <Image src={AMLogo} fit="contain" sx={{ maxWidth: '400px' }} />
            </Container>
          </Grid>
          <Grid item>
            <BasicAttributes id={covenantId} />
          </Grid>
          <Grid item xs={12}>
            <Reputations id={covenantId} />
          </Grid>
          <Grid item xs={12}>
            <BuildPoints id={covenantId} />
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  )
}
export default CovenantSheet
