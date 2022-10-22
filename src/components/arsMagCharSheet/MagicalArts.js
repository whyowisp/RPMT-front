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
  Grid,
  Button,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx, okButton } from './themeAndStyles'

const ArtTable = ({
  setCellIdentifier,
  setFieldValue,
  prepareValues,
  mArt,
  index,
}) => {
  return (
    <Table size="small" padding="none" key={mArt.art + index}>
      <TableBody>
        <TableRow key={mArt + index} sx={{ border: 'none', m: 0 }}>
          <TableCell align="right" sx={{ border: 'none', p: 1 }}>
            <Typography variant="labelSm">{mArt.art}</Typography>
          </TableCell>
          <TableCell align="center" sx={{ border: 'none' }}>
            <Input
              sx={{ ...plainInputSx, width: '80%' }}
              defaultValue={mArt.score}
              onFocus={() =>
                setCellIdentifier({ rowName: mArt.art, colIndex: 0 })
              }
              onChange={({ target }) => setFieldValue(target.value)}
              onBlur={(event) => prepareValues(event)}
            />
          </TableCell>
          <TableCell sx={{ border: 'none' }}>
            <Input
              sx={{ ...plainInputSx }}
              defaultValue={mArt.exp}
              onFocus={() =>
                setCellIdentifier({ rowName: mArt.art, colIndex: 1 })
              }
              onChange={({ target }) => setFieldValue(target.value)}
              onBlur={(event) => prepareValues(event)}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

const MagicalArts = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [magicalArts, setMagicalArts] = useState([])
  const [cellIdentifier, setCellIdentifier] = useState({
    rowName: '',
    colIndex: -1,
  })
  const [fieldValue, setFieldValue] = useState('')

  useEffect(() => {
    setMagicalArts(character.magicalArts)
  }, [character])

  const prepareValues = (e) => {
    e.preventDefault()

    setMagicalArts(
      magicalArts.map((mArt) =>
        mArt.art === cellIdentifier.rowName
          ? {
              ...mArt,
              score: cellIdentifier.colIndex === 0 ? fieldValue : mArt.score,
              exp: cellIdentifier.colIndex === 1 ? fieldValue : mArt.exp,
            }
          : mArt
      )
    )
  }

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        magicalArts: magicalArts,
      },
    }
    console.log('data to send: ' + JSON.stringify(data))

    dispatch(editCharacter(data))

    setCellIdentifier({
      rowName: '',
      colIndex: -1,
    })
    setFieldValue('')
    // -> to rerender
  }

  const arts = magicalArts?.slice(0, 5)
  const firstForms = magicalArts?.slice(5, 10)
  const lastForms = magicalArts?.slice(10)

  if (!character) return null
  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Magical Arts</Typography>

      <Grid container columns={{ xs: 1, sm: 3 }}>
        <Grid item xs={3} sm={1}>
          <TableRow>
            <TableCell align="right" width="40%">
              TECHNIQUE
            </TableCell>
            <TableCell align="center">SCORE</TableCell>
            <TableCell align="center">Exp</TableCell>
          </TableRow>
          {arts.map((mArt, index) => (
            <ArtTable key={mArt.art} mArt={mArt} index={index} />
          ))}
        </Grid>
        <Grid item xs={3} sm={1}>
          <TableRow>
            <TableCell align="right" width="40%">
              FORM
            </TableCell>
            <TableCell align="center">SCORE</TableCell>
            <TableCell align="center">Exp</TableCell>
          </TableRow>
          {firstForms.map((mArt, index) => (
            <ArtTable key={mArt.art} mArt={mArt} index={index} />
          ))}
        </Grid>
        <Grid item xs={3} sm={1}>
          <TableRow>
            <TableCell align="right" width="40%">
              FORM
            </TableCell>
            <TableCell align="center">SCORE</TableCell>
            <TableCell align="center" sx={{ fontSize: '12px' }}>
              Exp
            </TableCell>
          </TableRow>
          {lastForms.map((mArt, index) => (
            <ArtTable
              key={mArt.art}
              setCellIdentifier={setCellIdentifier}
              setFieldValue={setFieldValue}
              prepareValues={prepareValues}
              mArt={mArt}
              index={index}
            />
          ))}
        </Grid>
      </Grid>

      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </TableContainer>
  )
}

export default MagicalArts
