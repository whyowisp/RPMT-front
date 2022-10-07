import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Divider } from '@mui/material'
import { useEffect, useState } from 'react'

import { editCharacter } from '../../reducers/characterReducer'

import { plainInputSx, commonBoxSx } from './themeAndStyles'

const Virtues = ({ id }) => {
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
    <div>
      <Typography variant="label">Virtues:</Typography>
      {virtues.map((virtue, index) => (
        <Input
          sx={{ ...plainInputSx }}
          key={virtue + index}
          defaultValue={virtue}
          onChange={({ target }) => setVirtue(target.value)}
          onBlur={() => prepareValues(index)}
        />
      ))}
      <button onClick={(e) => submitUpdate(e)}>ok</button>
    </div>
  )
}
const Flaws = () => {
  /*return (
    <div>
      <Typography variant="label">Flaws:</Typography>
      {flaws.map((flaw, index) => (
        <Input
          sx={{ ...plainInputSx }}
          key={flaw + index}
          defaultValue={flaw}
          onBlur={({ target }) =>
            setFlaws(
              flaws.map((flaw, i) => (i === index ? target.value : flaw))
            )
          }
        />
      ))}
    </div>
  )*/
}

const VirtuesFlaws = ({ id }) => {
  return (
    <Box sx={commonBoxSx}>
      <Virtues id={id} />
      <Divider />
      <Flaws id={id} />
    </Box>
  )
}

export default VirtuesFlaws
