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
    //dispatch(editCharacter(data))
  }, [wounds])

  const handleChecked = (yIndex, xIndex) => {
    setWounds(
      wounds.map((wnd, y) => {
        //If new value doesn't concern this row, leave row as it is
        if (y !== yIndex) return wnd
        const checkedRow = wnd.checked.map((isChecked, x) => {
          //If new value doesn't concern this check(box), leave value as it is
          if (x !== xIndex) return isChecked
          return !isChecked
        })
        return { ...wnd, checked: checkedRow }
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
            <TableCell width="15%" />
            <TableCell width="10%">RANGE</TableCell>
            <TableCell width="40%">NUMBER</TableCell>
            <TableCell width="5%">PENALTY</TableCell>
            <TableCell width="20%">NOTES</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {wounds.map((wnd, yIndex) => (
            <TableRow key={wnd.level + yIndex}>
              <TableCell>{wnd.level}</TableCell>
              <TableCell>
                <Input defaultValue={wnd.range}></Input>
              </TableCell>
              <TableCell>
                {wnd.checked.map((isChecked, xIndex) => (
                  <Checkbox
                    checked={isChecked}
                    onChange={() => handleChecked(yIndex, xIndex)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
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
