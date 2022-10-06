import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx } from './themeAndStyles'

const DescriptiveStats = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [descriptiveAttributes, setDescriptiveAttributes] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setDescriptiveAttributes(character.descriptiveAttributes)
  }, [character])

  const prepareAttributes = (e) => {
    e.preventDefault()

    const newValue = e.target.value
    const indexOfValue = fieldIndex
    setDescriptiveAttributes(
      descriptiveAttributes.map((descAttribute, index) =>
        index === indexOfValue
          ? { attribute: descAttribute.attribute, description: newValue }
          : descAttribute
      )
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const data = {
      id: id,
      content: {
        descriptiveAttributes: descriptiveAttributes,
      },
    }
    dispatch(editCharacter(data))

    //Re-render will clear these anyway, but keep them to avoid bugs
    setFieldIndex(-1)
    setDescriptiveAttributes([])
    // -> to rerender
  }

  if (!descriptiveAttributes) return null
  return (
    <Box component="form" sx={commonBoxSx}>
      {descriptiveAttributes.map((dAttribute, index) => (
        <Stack direction="row" key={dAttribute.attribute}>
          <Typography
            sx={{ width: dAttribute.attribute.length * 12 }}
            variant="labelSm"
          >
            {dAttribute.attribute}:
          </Typography>
          <Input
            sx={{ ...plainInputSx, width: '100%' }}
            defaultValue={dAttribute.description}
            onChange={() => setFieldIndex(index)}
            onBlur={(event) => prepareAttributes(event)}
          />
        </Stack>
      ))}
      <button onClick={(e) => submitUpdate(e)}>ok</button>
    </Box>
  )
}

export default DescriptiveStats
