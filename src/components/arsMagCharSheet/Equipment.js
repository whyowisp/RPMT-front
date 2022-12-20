/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux'
import {
  Input,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Grid,
  Box,
  Stack,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx, okButton } from '../themeAndStyles'

const Equipment = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )

  const [equipment, seEquipment] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    seEquipment(character.equipment.concat(['']))
  }, [character])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )

    seEquipment(
      equipment.map((eqp, i) =>
        i === indexOfNewValue
          ? {
              item: type === 'Item' ? newValue : eqp.item,
              load: type === 'Load' ? newValue : eqp.load,
            }
          : eqp
      )
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const equipmentEmptyValuesCleared = equipment.filter((eqp) =>
      Object.values(eqp)[0] === '' ? null : eqp
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(equipmentEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        equipment: equipmentEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCharacter(data))

    //Re-render will clear these anyway, but keep them to avoid bugs
    setFieldIndex(-1)
    seEquipment([])
    // -> to rerender
  }

  if (!equipment) return null

  return (
    <Box sx={commonBoxSx}>
      <Typography variant="label">Equipment</Typography>
      <Grid container>
        {equipment.map((eqp, index) => (
          <Grid item xs={6} key={eqp + index}>
            <Stack direction="row" spacing={1} sx={{ pr: 1 }}>
              <Input
                sx={{ ...plainInputSx, minWidth: '70%' }}
                placeholder="Item name"
                defaultValue={eqp.item}
                onChange={() => setFieldIndex(index)}
                onBlur={(event) => prepareValues(event, 'Item')}
              />

              <Input
                sx={{ ...plainInputSx }}
                placeholder="Load"
                defaultValue={eqp.load}
                onChange={() => setFieldIndex(index)}
                onBlur={(event) => prepareValues(event, 'Load')}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default Equipment
