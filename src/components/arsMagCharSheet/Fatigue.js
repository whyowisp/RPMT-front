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
  const [fatigue, setFatigue] = useState([])

  useEffect(() => {
    setFatigue(character.fatigue)
  }, [dispatch])

  //Wrap fatigue to data object and dispatch
  useEffect(() => {
    const data = {
      id: id,
      content: {
        fatigue: fatigue,
      },
    }
    console.log('data to dispatch: ' + JSON.stringify(data))
    dispatch(editCharacter(data))
  }, [fatigue])

  const handleChecked = (index) => {
    setFatigue(
      fatigue.map((ftg, i) => {
        if (i !== index) return ftg
        return { ...ftg, checked: !ftg.checked }
      })
    )
  }

  console.log('fatigue: ' + JSON.stringify(fatigue))
  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Fatigue</Typography>
      <Table size="small">
        <TableBody>
          {fatigue.map((ftg, index) => (
            <TableRow key={ftg.level + index}>
              <TableCell>
                <input
                  type="checkbox"
                  disabled={index === 0 ? true : false}
                  checked={ftg.checked}
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
