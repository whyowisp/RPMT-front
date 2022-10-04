import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Input,
  Typography,
  Stack,
  createTheme,
  ThemeProvider,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../reducers/characterReducer'

//remove
//import charService from '../services/characters'

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

/*const commonBoxSx = {
  p: 2,
  maxWidth: 500,
}*/

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

const Decrepitude = ({ id }) => {
  //Get character
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )

  //State to represent form state 'now'
  const [effectsOfAging, setEffectsOfAging] = useState([])

  //Helper state to follow changes in 'effects' field. Appended to effectOfAging right after edit.
  const [effectField, setEffectField] = useState('')
  //Helper state to follow what index is being edited. Set to -1 when nothing is being edited
  const [fieldIndex, setFieldIndex] = useState(-1)

  //Decrepitude is a pre-filled form and it's filled with already existing data + one empty field.
  useEffect(() => {
    console.log('Use effect called')
    setEffectsOfAging(character.decrepitude.effectsOfAging.concat(['']))
  }, [character]) //CONTROLS RE-RENDERS, TAKE NOTE

  const dispatch = useDispatch()

  const prepareEffects = () => {
    setEffectsOfAging(
      effectsOfAging.map((effect, index) =>
        index === fieldIndex ? effectField : effect
      )
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        decrepitude: {
          effectsOfAging: effectsOfAging,
        },
      },
    }

    dispatch(editCharacter(data))
    setEffectField('')
    setFieldIndex(-1)
    //setEffectsOfAging([])
  }
  console.log(
    'effectFieldValue: ' + effectField + ' field index: ' + fieldIndex
  )
  console.log('effectsOfAging NOW: ' + effectsOfAging)

  //Prefilled form
  return (
    <Box component="form" sx={smallBoxSx}>
      <Stack direction="row">
        <Typography variant="label">Decrepitude:</Typography>
        <Input sx={{ ...plainInputSx }} value={effectsOfAging.length} />
      </Stack>
      <Typography variant="labelSm">Effects of aging: </Typography>
      {effectsOfAging.map((value, i) => (
        <Input
          sx={{ ...plainInputSx }}
          key={value}
          defaultValue={value}
          onChange={({ target }) => {
            setEffectField(target.value)
            setFieldIndex(i)
          }}
          onBlur={() => prepareEffects()}
        />
      ))}
      <button onClick={(e) => submitUpdate(e)}>ok</button>
    </Box>
  )
  /*const removeEmptyFields = () => {
    setEffects(effects.filter((value) => (value === '' ? null : value)))
  }

  const appendField = () => {
    const data = {
      id: id,
      content: {
        decrepitude: {
          effectsOfAging: effects.concat(['']),
        },
      },
    }
    dispatch(editCharacter(data))
  }

  const handleInputChange = (e, indexOfValue) => {
    e.preventDefault()

    setEffects(
      effects.map((effect, i) => {
        if (e.target.value === '') {
          setEffects(effects.pop())
          const data = {
            id: id,
            content: {
              decrepitude: {
                effectsOfAging: effects,
              },
            },
          }
          dispatch(editCharacter(data))
          return
        }
        return i === indexOfValue ? e.target.value : effect
      })
    )
    console.log(effects)
  }

  const submitUpdate = () => {
    const data = {
      id: id,
      content: {
        decrepitude: {
          effectsOfAging: effects,
        },
      },
    }
    dispatch(editCharacter(data))
  }*/
}
/*
const Warping = ({ id }) => {
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
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
}*/

const CharacterSheet = ({ id }) => {
  if (!id) return null

  return (
    <div>
      <ThemeProvider theme={sheetThemeAM}>
        <Decrepitude id={id} />
      </ThemeProvider>
    </div>
  )
  /*
  return (
    <div>
      <ThemeProvider theme={sheetThemeAM}>
        <BasicData id={id} />
        <Stack direction={'row'}>
          <Decrepitude id={id} />
          <Warping id={id} />
        </Stack>
      </ThemeProvider>
    </div>
  )*/
}

export default CharacterSheet
