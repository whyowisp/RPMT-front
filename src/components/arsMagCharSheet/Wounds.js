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
  TextareaAutosize,
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
  const [range, setRange] = useState('')

  useEffect(() => {
    setWounds(character.wounds)
  }, [dispatch])

  //Wrap wounds to data object and dispatch
  useEffect(() => {
    //useEffect is eager to launch in first render, before any data has initialized.
    if (wounds.length === 0) return
    const data = {
      id: id,
      content: {
        wounds: wounds,
      },
    }

    dispatch(editCharacter(data))
  }, [wounds])

  const handleChecked = (yIndex, xIndex) => {
    setWounds(
      wounds.map((wnd, y) => {
        if (y !== yIndex) return wnd //If new value doesn't concern this row, leave row as it is
        const checkedRow = wnd.checked.map((isChecked, x) => {
          if (x !== xIndex) return isChecked //If new value doesn't concern this check(box), leave value as it is
          return !isChecked
        })
        return { ...wnd, checked: checkedRow }
      })
    )
  }

  const prepareValues = (index) => {
    console.log(range, index)
    setWounds(
      wounds.map((wnd, i) =>
        i === index
          ? {
              ...wnd,
              range: range,
            }
          : wnd
      )
    )
  }

  if (!character) return null
  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Wounds</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell width="1%">RANGE</TableCell>
            <TableCell>NUMBER</TableCell>
            <TableCell>PENALTY</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {wounds.map((wnd, yIndex) => (
            <TableRow key={wnd.level + yIndex}>
              <TableCell>{wnd.level}</TableCell>
              <TableCell>
                <Input
                  defaultValue={wnd.range}
                  onChange={({ target }) => setRange(target.value)}
                  onBlur={() => prepareValues(yIndex)}
                ></Input>
              </TableCell>
              <TableCell sx={{ p: 0 }}>
                {wnd.checked.map((isChecked, xIndex) => (
                  <Checkbox
                    key={xIndex}
                    sx={{ p: '0.3rem' }}
                    checked={isChecked}
                    onChange={() => handleChecked(yIndex, xIndex)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                ))}
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                {wnd.penalty}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TextareaAutosize
        sx={{ ...plainInputSx }}
        minRows={5}
        style={{ width: '100%' }}
        placeholder="Example: Cannot use right hand (note, this field cannot be saved yet"
      />
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </TableContainer>
  )
}

export default Wounds
