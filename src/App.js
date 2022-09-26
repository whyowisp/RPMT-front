import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'

const defaultTextFieldStyle = {
  variant: 'standard',
}

function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/characters').then((response) => {
      console.log(response.data)
      setCharacters(response.data)
    })
  }, [])

  if (characters.length === 0) return null

  return (
    <div>
      <Box component="form">
        <Typography>Character: </Typography>
        <TextField defaultValue={characters[0].character}></TextField>
      </Box>
      <br />
      <Box component="form">
        <Typography>Decrepitude: </Typography>
        <TextField
          label="Helper text"
          value={characters[0].decrepitude.score}
        ></TextField>
        <Typography>Effects of aging: </Typography>
        {characters[0].decrepitude.effectsOfAging.map((n) => (
          <TextField
            placeholder={1}
            sx={{ ...defaultTextFieldStyle }}
            defaultValue={n}
          />
        ))}
      </Box>
      <br />
      <Box component="form">
        <Typography>Characteristics</Typography>
        {characters[0].characteristics.map((c) => (
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
