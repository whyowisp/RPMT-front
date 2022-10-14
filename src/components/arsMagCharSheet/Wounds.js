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
          {character.wounds.map((wnd) => (
            <TableRow key={wnd.level}>
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
