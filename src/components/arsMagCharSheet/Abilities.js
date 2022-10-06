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

const Abilities = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )

  const [abilities, setAbilites] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setAbilites(character.abilities.concat(['']))
  }, [character])

  // { experience: Number, ability: String, specialty: String, score: Number }
  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )

    setAbilites(
      abilities.map((abi, i) =>
        i === indexOfNewValue
          ? {
              experience: type === 'Exp' ? newValue : abi.experience,
              ability: type === 'Ability' ? newValue : abi.ability,
              specialty: type === 'Specialty' ? newValue : abi.specialty,
              score: type === 'Score' ? newValue : abi.score,
            }
          : abi
      )
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear ability objects that doesn't have ability name
    const abilitiesEmptyValuesCleared = abilities.filter((abi) =>
      Object.values(abi)[1] === '' ? null : abi
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(abilitiesEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        abilities: abilitiesEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCharacter(data))

    //Re-render will clear these anyway, but keep them to avoid bugs
    setFieldIndex(-1)
    setAbilites([])
    // -> to rerender
  }

  if (!abilities) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Abilities</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Exp</TableCell>
            <TableCell>ABILITY</TableCell>
            <TableCell>SPECIALTY</TableCell>
            <TableCell>SCORE</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {abilities.map((abi, index) => (
            <TableRow key={abi + index} sx={{ border: 'none', m: 0 }}>
              <TableCell sx={{ border: 'none', p: 1 }}>
                [
                <Input
                  sx={{ ...plainInputSx, width: '90%' }}
                  defaultValue={abi.experience}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Exp')}
                />
                ]
              </TableCell>
              <TableCell align="right" sx={{ border: 'none', p: 1 }}>
                <Input
                  sx={{ fontSize: '14px' }}
                  defaultValue={abi.ability}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Ability')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                (
                <Input
                  sx={{ ...plainInputSx, width: '90%' }}
                  defaultValue={abi.specialty}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Specialty')}
                />
                )
              </TableCell>
              <TableCell align="center" sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={abi.score}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Score')}
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

export default Abilities
