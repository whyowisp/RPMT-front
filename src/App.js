import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import {
  Box,
  TextField,
  Typography,
  TableRow,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
} from '@mui/material'

const defaultTextFieldStyle = {
  variant: 'standard',
}

const formBoxStyle = {
  mt: 1,
  ml: 1,
  padding: 2,
  maxWidth: 500,
  boxShadow: 6,
}

function App() {
  const [character, setCharacter] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/characters').then((response) => {
      console.log(character)
      setCharacter(response.data[0])
    })
  }, [])

  if (!character.character) return null

  return (
    <div>
      <form>
        <table>
          <tbody>
            <tr>
              <td>Character: </td>
              <td>
                <input defaultValue={character.character} />
              </td>
            </tr>
            <tr>
              <td>Player:</td>
              <td>
                <input defaultValue={character.player} />
              </td>
            </tr>
            <tr>
              <td>Saga:</td>
              <td>
                <input defaultValue={character.saga} />
              </td>
            </tr>
            <tr>
              <td>Setting: </td>
              <td>
                <input defaultValue={character.setting} />
              </td>
              <td>Current Year</td>
              <td>
                <input defaultValue={character.currentYear} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <TableContainer component={Paper} sx={{ ...formBoxStyle }}>
        <Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="none" align="left">
                  Character:
                </TableCell>
                <TableCell align="left">
                  <TextField
                    variant="standard"
                    defaultValue={character.character}
                  ></TextField>
                </TableCell>
              </TableRow>
              Player:<TextField defaultValue={character.player}></TextField>
              <TextField defaultValue={character.saga}></TextField>
              <TextField defaultValue={character.setting}></TextField>
              <TextField defaultValue={character.currentYear}></TextField>
              <TextField defaultValue={character.house}></TextField>
              <TextField defaultValue={character.age}></TextField>
              <TextField defaultValue={character.size}></TextField>
              <TextField defaultValue={character.confidence}></TextField>
            </TableHead>
          </Table>
        </Typography>
      </TableContainer>
      <br />

      <Box component="form">
        <Typography>Decrepitude: </Typography>
        <TextField
          label="Score"
          value={character.decrepitude.score}
        ></TextField>
        <Typography>Effects of aging: </Typography>
        {character.decrepitude.effectsOfAging.map((n) => (
          <TextField sx={{ ...defaultTextFieldStyle }} defaultValue={n} />
        ))}
      </Box>
      <br />

      <Box component="form">
        <Typography>Characteristics</Typography>
        {character.characteristics.map((c) => (
          <div>
            <Typography>{c.characteristic}</Typography>
            <TextField value={c.description} />
            <TextField value={c.score} />
          </div>
        ))}
      </Box>
    </div>
  )
}

export default App
