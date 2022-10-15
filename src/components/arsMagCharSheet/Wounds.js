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

const Wounds = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [wounds, setWounds] = useState([])

  useEffect(() => {
    setWounds(character.wounds)
  }, [dispatch])

  //Wrap wounds to data object and dispatch
  useEffect(() => {
    const data = {
      id: id,
      content: {
        wounds: wounds,
      },
    }
    console.log('data to dispatch: ' + JSON.stringify(data))
    dispatch(editCharacter(data))
  }, [wounds])

  const handleChecked = (index) => {
    setWounds(
      wounds.map((ftg, i) => {
        if (i !== index) return ftg
        return { ...ftg, checked: !ftg.checked }
      })
    )
  }

  if (!character) return null
  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Wounds</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width="20%" />
            <TableCell width="10%">RANGE</TableCell>
            <TableCell width="30%">NUMBER</TableCell>
            <TableCell width="10%">PENALTY</TableCell>
            <TableCell width="20%">NOTES</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {wounds.map((wnd, index) => (
            <TableRow key={wnd.level + index}>
              <TableCell>{wnd.level}</TableCell>
              <TableCell>
                <Input defaultValue={wnd.range}></Input>
              </TableCell>
              <TableCell>
                {[0, 0, 0, 0, 0].map((n) => (
                  <CheckBox key={n} />
                ))}
              </TableCell>
              <TableCell>{wnd.penalty}</TableCell>
              <TableCell>
                <Input defaultValue={wnd.notes}></Input>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Wounds
