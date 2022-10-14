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
  Grid,
  Box,
  Stack,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx, okButton } from './themeAndStyles'

const Weapons = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )

  const [weapons, setWeapons] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setWeapons(character.weapons.concat(['']))
  }, [character])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )

    setWeapons(
      weapons.map((wpn, i) =>
        i === indexOfNewValue
          ? {
              weapon: type === 'Weapon' ? newValue : wpn.weapon,
              initModifier: type === 'Init' ? newValue : wpn.initModifier,
              attackModifier: type === 'Attack' ? newValue : wpn.attackModifier,
              defenseModifier:
                type === 'Defense' ? newValue : wpn.defenseModifier,
              damageModifier: type === 'Damage' ? newValue : wpn.damageModifier,
              load: type === 'Load' ? newValue : wpn.load,
              range: type === 'Range' ? newValue : wpn.range,
            }
          : wpn
      )
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    const weaponsEmptyValuesCleared = weapons.filter((wpn) =>
      Object.values(wpn)[0] === '' ? null : wpn
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(weaponsEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        weapons: weaponsEmptyValuesCleared,
      },
    }

    console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCharacter(data))

    //Re-render will clear these anyway, but keep them to avoid bugs
    setFieldIndex(-1)
    setWeapons([])
    // -> to rerender
  }

  if (!weapons) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Weapons</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width={200}></TableCell>
            <TableCell align="justify">Qik + Weap - Enc = INIT</TableCell>
            <TableCell align="justify">Dex + Ability + Weap = ATK</TableCell>
            <TableCell align="justify">Qik + Ability + Weap = DFN</TableCell>
            <TableCell align="justify">Str + Weap = DAM</TableCell>
            <TableCell width={50}>Load</TableCell>
            <TableCell width={50}>Range</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {weapons.map((wpn, index) => (
            <TableRow sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={wpn.weapon}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Weapon')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={wpn.initModifier}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Init')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={wpn.attackModifier}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Attack')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={wpn.defensekModifier}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Defense')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={wpn.damageModifier}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Damage')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={wpn.load}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Load')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx }}
                  defaultValue={wpn.range}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'Range')}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </TableContainer>
  )
}

export default Weapons
