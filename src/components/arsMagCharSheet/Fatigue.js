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
  Checkbox,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx, okButton } from './themeAndStyles'
import { CheckBox } from '@mui/icons-material'

const Fatigue = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [checkeds, setCheckeds] = useState([])

  useEffect(() => {
    setCheckeds(character.fatigue.map((ftg) => ftg.checked))
  }, [dispatch])

  const handleChecked = (index) => {
    setCheckeds(
      checkeds.map((checked, i) => (i === index ? !checked : checked))
    )

    const data = {
      id: character._id,
      content: { checked: checkeds },
    }
    dispatch(editCharacter(data))
  }

  if (!character) return null
  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Fatigue</Typography>
      <Table size="small">
        <TableBody>
          {character.fatigue.map((ftg, index) => (
            <TableRow key={ftg.level}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={index === 0 ? true : checkeds[index]}
                  onChange={() => handleChecked(index)}
                />
              </TableCell>
              <TableCell>{ftg.penalty}</TableCell>
              <TableCell>{ftg.recovery}</TableCell>
              <TableCell>{ftg.level}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Fatigue

/*<input
                  type="checkbox"
                  checked={index === 0 ? true : checkeds[index]}
                  onChange={() => handleChecked(index)}
                />*/
