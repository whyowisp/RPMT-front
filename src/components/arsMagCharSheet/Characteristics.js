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
    //Find a bug where all the data could be lost
    if (characteristics.length < 8) {
      console.log(
        'error with CHARACTERISTICS. Data after submit: ' +
          JSON.stringify(characteristics)
      )
    } else {
      dispatch(editCharacter(data))
    }

    setFieldIndex(-1)
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
}

export default Characteristics
