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
  const [isChecked, setIsChecked] = useState(true)

  useEffect(() => {
    setCheckeds(character.fatigue.map((fat) => fat.checked))
  }, [dispatch])

  console.log('checkeds: ' + checkeds)
  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Fatigue</Typography>
      <Table size="small">
        <TableBody>
          {character.fatigue.map((fat, index) => (
            <TableRow key={fat.level}>
              <TableCell>
                <CheckBox />
              </TableCell>
              <TableCell>{fat.penalty}</TableCell>
              <TableCell>{fat.recovery}</TableCell>
              <TableCell>{fat.level}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Fatigue
