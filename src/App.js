/* eslint-disable */
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import {
  Box,
  TextField,
  Typography,
  TableRow,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  Paper,
  TableBody,
  Stack,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material'
import { border } from '@mui/system'
import { alpha, styled } from '@mui/material/styles'
import CloisterBlackLight from './media/CloisterBlackLight-axjg.ttf'

const CustomTableCell = styled(TableCell)({
  padding: 0,
  border: 'none',
})

const defaultTextFieldStyle = {
  variant: 'standard',
}

const formBoxStyle = {
  mt: 1,
  ml: 1,
  padding: 1,
  maxWidth: 500,
  boxShadow: 6,
}

const theme = createTheme({
  typography: {
    fontFamily: ['CloisterBlackLight', 'Roboto'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'CloisterBlackLight';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('CloisterBlackLight-axjg.ttf'), local('CloisterBlackLight-axjg.ttf'), url(${CloisterBlackLight}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
})

function App() {
  const [character, setCharacter] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/characters').then((response) => {
      console.log(character)
      setCharacter(response.data[0])
    })
    // eslint-disable-next-line
  }, [])

  if (!character.character) return null

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Box
          sx={{
            fontFamily: 'CloisterBlackLight',
            border: '1px solid',
            p: 2,
            maxWidth: 600,
          }}
        >
          <Stack direction="row" spacing={2}>
            <Typography>Character: </Typography>
            <TextField variant="filled" defaultValue={character.character} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>Player: </Typography>
            <TextField
              variant="filled"
              size="small"
              defaultValue={character.player}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>Saga: </Typography>
            <TextField variant="filled" defaultValue={character.saga} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>Setting: </Typography>
            <TextField
              variant="filled"
              size="small"
              defaultValue={character.setting}
            />
            <Typography>Current Year: </Typography>
            <TextField
              variant="filled"
              size="small"
              defaultValue={character.currentYear}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>House: </Typography>
            <TextField variant="filled" defaultValue={character.house} />
          </Stack>

          <Stack direction="row" spacing={2}>
            <Typography>Age: </Typography>
            <TextField variant="filled" defaultValue={character.age} />
            <Typography>Size: </Typography>
            <TextField variant="filled" defaultValue={character.size} />
            <Typography>Confidence: </Typography>
            <TextField variant="filled" defaultValue={character.confidence} />
          </Stack>
        </Box>
      </div>
    </ThemeProvider>
  )
}

/*
<TableContainer variant="form" sx={{ maxWidth: 600, p: 1 }}>
        <Table>
          <TableRow>
            <CustomTableCell>Character: </CustomTableCell>
            <CustomTableCell>
              <CustomTextField defaultValue={character.character} />
            </CustomTableCell>
          </TableRow>
          <TableRow size="small">
            <CustomTableCell>Player:</CustomTableCell>
            <CustomTableCell>
              <CustomTextField defaultValue={character.player} />
            </CustomTableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell>Saga:</CustomTableCell>
            <CustomTableCell>
              <CustomTextField defaultValue={character.saga} />
            </CustomTableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell>Setting: </CustomTableCell>
            <CustomTableCell>
              <CustomTextField defaultValue={character.setting} />
            </CustomTableCell>
            <CustomTableCell>Current Year</CustomTableCell>
            <CustomTableCell>
              <CustomTextField defaultValue={character.currentYear} />
            </CustomTableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell>House:</CustomTableCell>
            <CustomTableCell>
              <CustomTextField defaultValue={character.house} />
            </CustomTableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell>Age: </CustomTableCell>
            <CustomTableCell>
              <CustomTextField defaultValue={character.age} />
            </CustomTableCell>
            <CustomTableCell>Size: </CustomTableCell>
            <CustomTableCell>
              <CustomTextField defaultValue={character.size} />
            </CustomTableCell>
            <CustomTableCell>Confidence: </CustomTableCell>
            <CustomTableCell>
              <CustomTextField defaultValue={character.confidence} />
            </CustomTableCell>
          </TableRow>
        </Table>
      </TableContainer>

      <br />
<Box component="form">
        <Typography>Decrepitude: </Typography>
        <CustomTextField
          label="Score"
          value={character.decrepitude.score}
        ></CustomTextField>
        <Typography>Effects of aging: </Typography>
        {character.decrepitude.effectsOfAging.map((n) => (
          <CustomTextField sx={{ ...defaultTextFieldStyle }} defaultValue={n} />
        ))}
      </Box>
      <br />

      <Box component="form">
        <Typography>Characteristics</Typography>
        {character.characteristics.map((c) => (
          <div>
            <Typography>{c.characteristic}</Typography>
            <CustomTextField value={c.description} />
            <CustomTextField value={c.score} />
          </div>
        ))}
      </Box>
      */
export default App
