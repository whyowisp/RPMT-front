import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Stack } from '@mui/material'

import { editCharacter } from '../../reducers/characterReducer'
import { plainInputSx, commonBoxSx } from './themeAndStyles'

const BasicData = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
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
    const data = {
      id: id,
      content: {
        character: characterName,
        player: player,
        saga: saga,
        setting: setting,
        currentYear: year,
        house: house,
        age: age,
        size: size,
        confidence: confidence,
      },
    }
    console.log('basicData called with content: ' + JSON.stringify(data))
    dispatch(editCharacter(data))
  }

  //Don't touch my spaghetti
  return (
    <Box sx={commonBoxSx}>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Character: </Typography>
        <Input
          sx={{ ...plainInputSx }}
          disableUnderline
          defaultValue={character.character}
          onChange={({ target }) => setCharacterName(target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Player: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.player}
          onChange={({ target }) => setPlayer(target.value)}
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
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="labelSm">Setting: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.setting}
          onChange={({ target }) => setSetting(target.value)}
        />
        <Typography variant="labelSm">Current Year: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.currentYear}
          onChange={({ target }) => setYear(target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">House: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.house}
          onChange={({ target }) => setHouse(target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Age: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.age}
          onChange={({ target }) => setAge(target.value)}
        />
        <Typography variant="label">Size: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.size}
          onChange={({ target }) => setSize(target.value)}
        />
        <Typography variant="label">Confidence: </Typography>
        <Input
          sx={plainInputSx}
          disableUnderline
          defaultValue={character.confidence}
          onChange={({ target }) => setConfidence(target.value)}
        />
      </Stack>
      <button onClick={(e) => submitUpdate(e)}>ok</button>
    </Box>
  )
}

export default BasicData
