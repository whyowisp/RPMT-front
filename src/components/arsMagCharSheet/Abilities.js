import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Input,
  Typography,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
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

  const prepareValues = (e, type) => {
    e.preventDefault()

    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )

    setCharacteristics(
      characteristics.map((chr, i) =>
        i === indexOfNewValue
          ? {
              characteristic: chr.characteristic,
              description: type === 'String' ? newValue : chr.description,
              score: type === 'Number' ? newValue : chr.score,
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

    console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCharacter(data))

    //Re-render will clear these anyway, but keep them to avoid bugs
    setFieldIndex(-1)
    setCharacteristics([])
    // -> to rerender
  }

  if (!characteristics) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Characteristics</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell width={250}>DESCRIPTION</TableCell>
            <TableCell align="center">SCORE</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {characteristics.map((chr, index) => (
            <TableRow key={chr + index} sx={{ border: 'none', m: 0 }}>
              <TableCell sx={{ border: 'none', p: 1 }}>
                <Typography sx={{ fontSize: '17px' }}>
                  {chr.characteristic}:
                </Typography>
              </TableCell>

              <TableCell align="right" sx={{ border: 'none', p: 1 }}>
                <Typography sx={{ fontSize: '14px' }}>
                  {chr.characteristic.substring(0, 3)}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                (
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={chr.description}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'String')}
                />
                )
              </TableCell>
              <TableCell align="center" sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '75%' }}
                  defaultValue={chr.score}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Number')}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <button onClick={(e) => submitUpdate(e)}>ok</button>
    </TableContainer>
  )
  /*
  return (
    <Box component="form" sx={commonBoxSx}>
      <table>
        <tr>
          <th>miksi</TableCell>
          <th>näin</TableCell>
          <th>Description</TableCell>
          <th>Score</TableCell>
        </tr>
        {characteristics.map((chr, index) => (
          <tr>
            <Typography variant="labelSm">
              <td>{chr.characteristic}:</TableCell>
              <td>{chr.characteristic.substring(0, 3)}</TableCell>
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
            </TableCell>
            <td>
              <Input
                sx={{ ...plainInputSx, width: '30%' }}
                defaultValue={chr.score}
                onChange={() => setFieldIndex(index)}
                onBlur={(event) => prepareEffects(event)}
              />
            </TableCell>
          </tr>
        ))}
      </table>
      <button onClick={(e) => submitUpdate(e)}>ok</button>
    </Box>
  )*/
}

export default Characteristics
