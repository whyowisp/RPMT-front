import { useState } from 'react'
import {
  Box,
  Input,
  Typography,
  Stack,
  createTheme,
  ThemeProvider,
} from '@mui/material'

import charService from '../services/characters'

const plainInputSx = {
  '& input': { backgroundColor: 'white', padding: 1 },
  '& input:hover': { backgroundColor: 'whitesmoke' },
  '& input:focus': { backgroundColor: '#cad9ec', borderBottom: '1px dotted' },
  width: '100%',
}

const smallBoxSx = {
  p: 2,
  maxWidth: 230,
  border: '1px solid',
  margin: '10px',
}

const commonBoxSx = {
  p: 2,
  maxWidth: 500,
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
  const [score, setScore] = useState(character.score)
  const [effectsOfAge, setEffectsOfAge] = useState(
    character.decrepitude.effectsOfAging
  )

  const appendField = () => {
    setEffectsOfAge(effectsOfAge.concat(['']))
  }

  const removeEmptyFields = () => {
    setEffectsOfAge(
      effectsOfAge.filter((value) => (value === '' ? null : value))
    )
  }

  const handleInputChange = (e, indexOfValue) => {
    e.preventDefault()
    const newValue = e.target.value

    setEffectsOfAge(effectsOfAge.fill(newValue, indexOfValue, indexOfValue + 1))
    if (newValue === '') {
      removeEmptyFields()
    }
  }

  const submitUpdate = () => {
    console.log('submit called for id: ' + character._id)
    const updatedData = {
      decrepitude: {
        score: score,
        effectsOfAging: effectsOfAge,
      },
    }
    charService
      .updateChar(updatedData, character._id)
      .then((result) =>
        console.log('result of update: ' + JSON.stringify(result))
      )
  }

  console.log(
    'effectOfAge array content: ' +
      effectsOfAge +
      '. Array length: ' +
      effectsOfAge.length
  )

  return (
    <Box sx={smallBoxSx}>
      <Stack direction="row">
        <Typography variant="label">Decrepitude:</Typography>
        <Input
          sx={{ ...plainInputSx }}
          defaultValue={character.decrepitude.score}
          onChange={({ target }) => setScore(target.value)}
          onBlur={() => submitUpdate()}
        />
      </Stack>
      <Typography variant="labelSm">Effects of aging: </Typography>
      {effectsOfAge.map((value, index) => (
        <Input
          sx={{ ...plainInputSx }}
          key={value}
          defaultValue={value}
          onChange={(event) => handleInputChange(event, index)}
          onBlur={() => submitUpdate()}
        />
      ))}
      {effectsOfAge.length < score ? (
        <button onClick={() => appendField()}>+</button>
      ) : (
        <button onClick={() => removeEmptyFields()}>-</button>
      )}
    </Box>
  )
}
const Warping = ({ character }) => {
  return (
    <Box sx={smallBoxSx}>
      <Stack direction="row">
        <Typography variant="label">Warping:</Typography>
        <Input
          sx={{ ...plainInputSx }}
          defaultValue={character.warping.score}
        />
      </Stack>
      <Typography variant="labelSm">Effects of warping: </Typography>
      {character.warping.effectsOfWarping.map((n) => (
        <Input sx={{ ...plainInputSx }} key={n} defaultValue={n} />
      ))}
    </Box>
  )
}
const BasicData = ({ character }) => {
  const [characterName, setCharacterName] = useState(character.character)
  const [player, setPlayer] = useState(character.player)
  const [saga, setSaga] = useState(character.saga)
  const [setting, setSetting] = useState(character.setting)
  const [year, setYear] = useState(character.year)
  const [house, setHouse] = useState(character.house)
  const [age, setAge] = useState(character.age)
  const [size, setSize] = useState(character.size)
  const [confidence, setConfidence] = useState(character.confidence)

  const submitUpdate = () => {
    console.log('submit called for id: ' + character._id)
    const updatedData = {
      character: characterName,
      player: player,
      saga: saga,
      setting: setting,
      currentYear: year,
      house: house,
      age: age,
      size: size,
      confidence: confidence,
    }
    charService
      .updateChar(updatedData, character._id)
      .then((result) =>
        console.log('result of update: ' + JSON.stringify(result))
      )
  }

  return (
    <Box sx={commonBoxSx}>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Character: </Typography>
        <Input
          sx={{ ...plainInputSx }}
          disableUnderline
          defaultValue={character.character}
          onChange={({ target }) => setCharacterName(target.value)}
          onBlur={() => submitUpdate()}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Player: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.player}
          onChange={({ target }) => setPlayer(target.value)}
          onBlur={() => submitUpdate()}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <Typography variant="label">Saga: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          variant="filled"
          defaultValue={character.saga}
          onChange={({ target }) => setSaga(target.value)}
          onBlur={() => submitUpdate()}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="labelSm">Setting: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.setting}
          onChange={({ target }) => setSetting(target.value)}
          onBlur={() => submitUpdate()}
        />
        <Typography variant="labelSm">Current Year: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.currentYear}
          onChange={({ target }) => setYear(target.value)}
          onBlur={() => submitUpdate()}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">House: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.house}
          onChange={({ target }) => setHouse(target.value)}
          onBlur={() => submitUpdate()}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Age: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.age}
          onChange={({ target }) => setAge(target.value)}
          onBlur={() => submitUpdate()}
        />
        <Typography variant="label">Size: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.size}
          onChange={({ target }) => setSize(target.value)}
          onBlur={() => submitUpdate()}
        />
        <Typography variant="label">Confidence: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.confidence}
          onChange={({ target }) => setConfidence(target.value)}
          onBlur={() => submitUpdate()}
        />
      </Stack>
    </Box>
  )
}

const CharacterSheet = ({ character }) => {
  if (!character) return null

  return (
    <div>
      <ThemeProvider theme={sheetThemeAM}>
        <BasicData character={character} />
        <Stack direction={'row'}>
          <Decrepitude character={character} />
          <Warping character={character} />
        </Stack>
      </ThemeProvider>
    </div>
  )
}

export default CharacterSheet
