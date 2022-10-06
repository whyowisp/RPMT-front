import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx } from './themeAndStyles'

const Characteristics = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [characteristics, setCharacteristics] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setCharacteristics(character.characteristics)
  }, [character])

  const prepareEffects = (e) => {
    e.preventDefault()

    const newValue = e.target.value
    const indexOfValue = fieldIndex
    setCharacteristics(
      characteristics.map((chr, index) =>
        index === indexOfValue
          ? {
              characteristic: chr.characteristic,
              description: newValue,
            }
          : chr
      )
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const data = {
      id: id,
      content: {
        characteristics: characteristics,
      },
    }
    //dispatch(editCharacter(data))

    //Re-render will clear these anyway, but keep them to avoid bugs
    setFieldIndex(-1)
    setCharacteristics([])
    // -> to rerender
  }

  if (!characteristics) return null
  return (
    <Box component="form" sx={commonBoxSx}>
      <table>
        <tr>
          <th>miksi</th>
          <th>näin</th>
          <th>Description</th>
          <th>Score</th>
        </tr>
        {characteristics.map((chr, index) => (
          <tr>
            <Typography variant="labelSm">
              <td>{chr.characteristic}:</td>
              <td>{chr.characteristic.substring(0, 3)}</td>
            </Typography>
            <td>
              (
              <Input
                sx={{ ...plainInputSx, width: '90%' }}
                defaultValue={chr.description}
                onChange={() => setFieldIndex(index)}
                onBlur={(event) => prepareEffects(event)}
              />
              )
            </td>
            <td>
              <Input
                sx={{ ...plainInputSx, width: '30%' }}
                defaultValue={chr.score}
                onChange={() => setFieldIndex(index)}
                onBlur={(event) => prepareEffects(event)}
              />
            </td>
          </tr>
        ))}
      </table>
      <button onClick={(e) => submitUpdate(e)}>ok</button>
    </Box>
  )
}

export default Characteristics
