import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Stack } from '@mui/material'
import { useEffect, useState } from 'react'

import { editCharacter } from '../../reducers/characterReducer'

import { plainInputSx, smallBoxSx } from './themeAndStyles'

const Warping = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [effectsOfWarping, setEffectsOfWarping] = useState([])
  const [inputField, setinputField] = useState('')
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setEffectsOfWarping(character.warping.effectsOfWarping.concat(['']))
  }, [character])

  const prepareEffects = () => {
    setEffectsOfWarping(
      effectsOfWarping.map((effect, index) =>
        index === fieldIndex ? inputField : effect
      )
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const withoutEmptyFields = effectsOfWarping.filter((effect) =>
      effect === '' ? null : effect
    )
    const data = {
      id: id,
      content: {
        warping: {
          effectsOfWarping: withoutEmptyFields,
        },
      },
    }

    dispatch(editCharacter(data))

    setinputField('')
    setFieldIndex(-1)
    setEffectsOfWarping([])
    // -> to rerender
  }

  return (
    <Box sx={smallBoxSx}>
      <Stack direction="row">
        <Typography variant="label">Warping:</Typography>
        <Input sx={{ ...plainInputSx }} value={effectsOfWarping.length - 1} />
      </Stack>
      <Typography variant="labelSm">Effects of warping: </Typography>
      {effectsOfWarping.map((value, index) => (
        <Input
          sx={{ ...plainInputSx }}
          key={value + index}
          defaultValue={value}
          onChange={({ target }) => {
            setinputField(target.value)
            setFieldIndex(index)
          }}
          onBlur={() => prepareEffects()}
        />
      ))}
      <button onClick={(e) => submitUpdate(e)}>ok</button>
    </Box>
  )
}

export default Warping
