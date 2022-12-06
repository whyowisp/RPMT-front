/* eslint-disable */
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  initCharactersReducer,
  initializeNew,
  deleteOne,
  editCharacter,
} from '../reducers/characterReducer'
import {
  Grid,
  Container,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
  Typography,
  Collapse,
  IconButton,
  TableHead,
  Paper,
} from '@mui/material'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const CharacterList = ({ toPage }) => {
  const dispatch = useDispatch()
  const player = useSelector((state) => state.player)
  const characters = useSelector((state) => state.characters)
  const [inputName, setInputName] = useState(undefined)
  const [referenceName, setReferenceName] = useState(undefined)
  const [id, setId] = useState(undefined)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch(initCharactersReducer())
  }, [dispatch])

  const handleClickOpen = (id, name) => {
    setId(id)
    setReferenceName(name)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    if (inputName === referenceName) {
      dispatch(deleteOne(id))
    }

    setReferenceName(undefined)
    setInputName(undefined)
    setOpen(false)
  }

  const createNew = () => {
    dispatch(initializeNew(player.id))
  }

  if (!characters) return null

  return (
    <Container>
      <TableContainer component={Paper} sx={{ paddingBottom: 10 }}>
        <Table>
          <TableHead>
            <TableCell width="5%"></TableCell>
            <TableCell width="30%">Character</TableCell>
            <TableCell></TableCell>
            <TableCell
              align="center"
              sx={{
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Visibility
            </TableCell>
          </TableHead>
          <TableBody>
            {characters.map((chr) => (
              <CharacterRow
                chr={chr}
                toPage={toPage}
                handleClickOpen={handleClickOpen}
              />
            ))}

            <TableRow>
              <TableCell colspan={5} align="center">
                <Button onClick={() => createNew()}>create new</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Think it over</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This function removes your character permanently
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Character name"
            type="name"
            fullWidth
            variant="outlined"
            onChange={({ target }) => setInputName(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete()}>Remove</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

const CharacterRow = ({ chr, toPage, handleClickOpen }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const player = useSelector((state) => state.player)
  const visibilityStates = ['visible', 'disabled', 'hidden']

  const setVisibility = () => {
    const data = {
      id: chr._id,
      content: {
        visibility: solveNextState(),
      },
    }
    console.log(data)
    dispatch(editCharacter(data))
  }

  const solveNextState = () => {
    const stateIndex = visibilityStates.indexOf(chr.visibility)
    return visibilityStates[stateIndex + 1 > 2 ? 0 : stateIndex + 1]
  }

  const solveRowVisibility = () => {
    if (chr.owner === player.id) return 'table-row'
    if (chr.visibility === 'hidden') return 'none'
  }

  return (
    <>
      <TableRow
        key={chr._id}
        sx={{
          display: solveRowVisibility(),
          backgroundColor: chr.visibility === 'hidden' ? '#92A198' : 'inherit',
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          sx={{ color: chr.visibility === 'disabled' ? 'gray' : 'black' }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: chr.visibility === 'disabled' ? 'gray' : 'black' }}
          >
            {chr.character}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Button
            onClick={toPage('characterSheet', chr._id)}
            disabled={chr.visibility === 'disabled' ? true : false}
          >
            Enter
          </Button>
          <Button
            onClick={() => handleClickOpen(chr._id, chr.character)}
            disabled={player.id === chr.owner ? false : true}
          >
            <DeleteForeverTwoToneIcon />
          </Button>
        </TableCell>
        <TableCell
          align="center"
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Button
            onClick={() => setVisibility()}
            disabled={player.id === chr.owner ? false : true}
          >
            {chr.visibility ? chr.visibility : 'visible'}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small">
              <TableHead>
                <TableCell>Player</TableCell>
                <TableCell>Depiction</TableCell>
              </TableHead>
              <TableRow>
                <TableCell>{chr.player}</TableCell>
                <TableCell>
                  {chr.depiction?.depiction
                    ? chr.depiction.depiction
                    : 'No character depiction yet'}
                </TableCell>
              </TableRow>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default CharacterList
