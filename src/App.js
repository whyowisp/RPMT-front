/* eslint-disable */
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import {
  Box,
  Input,
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
  TextField,
} from '@mui/material'

const basicInputSx = {
  '& input': { backgroundColor: 'white', padding: 1 },
  '& input:hover': { backgroundColor: 'whitesmoke' },
  '& input:focus': { backgroundColor: '#cad9ec', borderBottom: '1px dotted' },
  width: '100%',
}

const sheetThemeAM = createTheme({
  typography: {
    fontFamily: 'serif',
    label: {
      fontFamily: 'MedievalSharp',
      fontSize: '1.5rem',
      textAlign: 'center',
    },
    labelSm: {
      fontSize: '1.1rem',
      fontFamily: 'serif',
    },
  },
})

const Decrepitude = ({ character }) => {
  return (
    <Box
      sx={{
        p: 2,
        maxWidth: 230,
        border: '1px solid',
      }}
    >
      <Stack direction="row">
        <Typography variant="label">Decrepitude:</Typography>
        <Input
          sx={{ ...basicInputSx }}
          defaultValue={character.decrepitude.score}
        />
      </Stack>
      <Typography variant="labelSm">Effects of aging: </Typography>
      {character.decrepitude.effectsOfAging.map((n) => (
        <Input sx={{ ...basicInputSx }} key={n} defaultValue={n} />
      ))}
    </Box>
  )
}
const Warping = ({ character }) => {
  return (
    <Box
      sx={{
        p: 2,
        maxWidth: 230,
        border: '1px solid',
      }}
    >
      <Stack direction="row">
        <Typography variant="label">Warping:</Typography>
        <Input
          sx={{ ...basicInputSx }}
          defaultValue={character.warping.score}
        />
      </Stack>
      <Typography variant="labelSm">Effects of warping: </Typography>
      {character.warping.effectsOfWarping.map((n) => (
        <Input sx={{ ...basicInputSx }} key={n} defaultValue={n} />
      ))}
    </Box>
  )
}
const BasicData = ({ character }) => {
  return (
    <Box
      sx={{
        p: 2,
        maxWidth: 500,
      }}
    >
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Character: </Typography>
        <Input
          sx={{ ...basicInputSx }}
          disableUnderline
          defaultValue={character.character}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Player: </Typography>
        <Input
          sx={basicInputSx}
          disableUnderline
          defaultValue={character.player}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <Typography variant="label">Saga: </Typography>
        <Input
          sx={basicInputSx}
          disableUnderline
          variant="filled"
          defaultValue={character.saga}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Setting: </Typography>
        <Input
          sx={basicInputSx}
          disableUnderline
          defaultValue={character.setting}
        />
        <Typography variant="label">Current Year: </Typography>
        <Input
          sx={basicInputSx}
          disableUnderline
          defaultValue={character.currentYear}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">House: </Typography>
        <Input
          sx={basicInputSx}
          disableUnderline
          defaultValue={character.house}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Age: </Typography>
        <Input
          sx={basicInputSx}
          disableUnderline
          defaultValue={character.age}
        />
        <Typography variant="label">Size: </Typography>
        <Input
          sx={basicInputSx}
          disableUnderline
          defaultValue={character.size}
        />
        <Typography variant="label">Confidence: </Typography>
        <Input
          sx={basicInputSx}
          disableUnderline
          defaultValue={character.confidence}
        />
      </Stack>
    </Box>
  )
}

const App = () => {
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
    <div>
      <CssBaseline />
      <ThemeProvider theme={sheetThemeAM}>
        <BasicData character={character} />
        <Decrepitude character={character} />
        <Warping character={character} />
      </ThemeProvider>
    </div>
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
