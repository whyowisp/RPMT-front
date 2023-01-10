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
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editCovenant } from '../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../themeAndStyles'

const Magi = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const [magi, setMagi] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setMagi(covenant.magi.concat(['']))
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setMagi(
      magi.map((magus, i) =>
        i === indexOfNewValue
          ? {
              name: type === 'name' ? newValue : magus.name,
              born: type === 'born' ? newValue : magus.born,
              titlesOrResponsibilities:
                type === 'title' ? newValue : magus.titlesOrResponsibilities,
              loyalty: type === 'loyalty' ? newValue : magus.loyalty,
              points: type === 'points' ? newValue : magus.points,
            }
          : magus
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear name objects that doesn't have name name
    const magiEmptyValuesCleared = magi.filter((rep) =>
      Object.values(rep)[0] === '' ? null : rep
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(magiEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        magi: magiEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
    setMagi([])
    // -> to rerender
  }

  if (!magi) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Magi</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell style={{ borderBottom: 'none' }}></TableCell>
            <TableCell sx={{ width: '13%' }}>Year Born</TableCell>
            <TableCell>Titles / Responsibilities</TableCell>
            <TableCell sx={{ width: '8%' }}>
              {window.innerWidth < 600 ? 'Lty.' : 'Loyalty'}
            </TableCell>
            <TableCell sx={{ width: '8%' }}>
              {window.innerWidth < 600 ? 'Pts.' : 'Points'}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {magi.map((magus, index) => (
            <TableRow key={magus + index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={magus.name}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'name')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={magus.born}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'born')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={magus.titlesOrResponsibilities}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'title')}
                  />
                </i>
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={magus.loyalty}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'loyalty')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={magus.points}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'points')}
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

export default Magi
