import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'

import { editCharacter } from '../../reducers/characterReducer'

import { plainInputSx, commonBoxSx } from './themeAndStyles'

const PersonalityTraits = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [virtues, setVirtues] = useState([])
  const [virtue, setVirtue] = useState('')

  useEffect(() => {
    setVirtues(character.virtues.concat(['']))
  }, [character])

  const prepareValues = (virtueIndex) => {
    setVirtues(
      virtues.map((oldVirtue, i) => (i === virtueIndex ? virtue : oldVirtue))
    )
  }

  const submitUpdate = () => {
    const withoutEmptyFields = virtues.filter((v) => v !== '')
    const data = {
      id: id,
      content: {
        virtues: withoutEmptyFields,
      },
    }
    dispatch(editCharacter(data))
    setVirtues([])
  }
  return (
    <Box sx={commonBoxSx}>
      <Typography variant="label">Personality Traits:</Typography>
      {virtues.map((virtue, index) => (
        <Input
          sx={{ ...plainInputSx }}
          key={virtue + index}
          defaultValue={virtue}
          onChange={({ target }) => setVirtue(target.value)}
          onBlur={() => prepareValues(index)}
        />
      ))}
      <Button onClick={(e) => submitUpdate(e)}>ok</Button>
    </Box>
  )
}

export default PersonalityTraits
