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

const Decrepitude = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [effectsOfAging, setEffectsOfAging] = useState([])
  const [inputField, setinputField] = useState('')
  //Helper state to follow what index is being edited. Set to -1 when nothing is being edited
  const [fieldIndex, setFieldIndex] = useState(-1)

  //Decrepitude is a pre-filled form and it's filled with already existing data + one empty field.
  useEffect(() => {
    setEffectsOfAging(character.decrepitude.effectsOfAging.concat(['']))
  }, [character]) //CONTROLS IN RE-RENDERS, TAKE NOTE, Possible source of bugs

  //This method little bit hacky. It is called by onBlur. Purpose is to set new values to the effectsOfAging array.
  //It seemed to be impossible to update it straight away in the input event (i.e. it was always lagging one re-render behind)
  //OnBlur is called always before form submit event. Possible source of bugs.
  const prepareEffects = () => {
    setEffectsOfAging(
      effectsOfAging.map((effect, index) =>
        index === fieldIndex ? inputField : effect
      )
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const withoutEmptyFields = effectsOfAging.filter((effect) =>
      effect === '' ? null : effect
    )
    const data = {
      id: id,
      content: {
        decrepitude: {
          effectsOfAging: withoutEmptyFields,
        },
      },
    }

    //Send to redux thunk functions
    dispatch(editCharacter(data))

    //These calls could be removed, since component will be re-rendered right after this method is over
    setinputField('')
    setFieldIndex(-1)
    setEffectsOfAging([])
    // -> to rerender
  }

  return (
    <Box component="form" sx={smallBoxSx}>
      <Stack direction="row">
        <Typography variant="label">Decrepitude:</Typography>
        <Input sx={{ ...plainInputSx }} value={effectsOfAging.length - 1} />
      </Stack>
      <Typography variant="labelSm">Effects of aging: </Typography>
      {effectsOfAging.map((value, i) => (
        <Input
          sx={{ ...plainInputSx }}
          key={value + i}
          defaultValue={value}
          onChange={({ target }) => {
            setinputField(target.value)
            setFieldIndex(i)
          }}
          onBlur={() => prepareEffects()}
        />
      ))}
      <button onClick={(e) => submitUpdate(e)}>ok</button>
    </Box>
  )
}

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
const BasicData = ({ id }) => {
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
    console.log('submit called for id: ' + character._id)
    /*const updatedData = {
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
      )*/
  }
  const InputVariant = (props) => {
    console.log(props)
    const fieldValue = props.fieldValue
    const onChangeMethod = props.method
    return (
      <Input
        disableUnderline
        sx={{ ...plainInputSx }}
        onBlur={() => submitUpdate()}
        defaultValue={fieldValue}
        onChange={({ target }) => onChangeMethod(target.value)}
      />
    )
  }

  return (
    <Box sx={commonBoxSx}>
      *** EXPERIMENTAL START ***
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Character: </Typography>
        <InputVariant
          fieldValue={character.character}
          method={() => setCharacterName()}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="label">Player: </Typography>
        <InputVariant
          fieldValue={character.player}
          onChange={() => setPlayer()}
        />
      </Stack>
      *** EXPERIMENTAL END ***
      <br></br>
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

const CharacterSheet = ({ id }) => {
  if (!id) return null

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
