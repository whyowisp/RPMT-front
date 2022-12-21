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
  Box,
  Paper,
} from '@mui/material'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const CharacterList = ({ toPage }) => {
  const whoIsLoggedIn = useSelector((state) => state.loggedPlayer)
  const characters = useSelector((state) => state.characters)
  console.log(whoIsLoggedIn.currentCampaign + ' = campaignId')
  const [inputName, setInputName] = useState(undefined)
  const [referenceName, setReferenceName] = useState(undefined)
  const [id, setId] = useState(undefined)
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initCharactersReducer())
  }, [dispatch])

  const handleDialogOpen = (id, name) => {
    setId(id)
    setReferenceName(name)
    setOpen(true)
  }

  const handleDialogClose = () => {
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
    dispatch(initializeNew(whoIsLoggedIn.id))
  }

  if (!characters) return null
  if (!whoIsLoggedIn) return null

  return (
    <Container>
      <Typography variant="h5">Characters</Typography>
      <Paper elevation={10}>
        <TableContainer component={Box} sx={{ paddingBottom: 10 }}>
          <Table size="small">
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
                  handleDialogOpen={handleDialogOpen}
                />
              ))}

              <TableRow>
                <TableCell
                  colspan={5}
                  align="center"
                  style={{ borderBottom: 'none' }}
                >
                  <Button onClick={() => createNew()}>create new</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleDialogClose}>
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
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={() => handleDelete()}>Remove</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  )
}

const CharacterRow = ({ chr, toPage, handleDialogOpen }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const whoIsLoggedIn = useSelector((state) => state.loggedPlayer)
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
    if (chr.owner === whoIsLoggedIn.id) return 'table-row'
    if (chr.visibility === 'hidden') return 'none'
  }

  return (
    <>
      <TableRow
        key={chr._id}
        sx={{
          display: solveRowVisibility(),
          backgroundColor: chr.visibility === 'hidden' ? '#968A5A' : 'inherit',
        }}
      >
        <TableCell style={{ borderBottom: 'none' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          sx={{ color: chr.visibility === 'disabled' ? 'gray' : 'black' }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: chr.visibility === 'disabled' ? 'gray' : 'black' }}
          >
            {chr.character}
          </Typography>
        </TableCell>
        <TableCell style={{ borderBottom: 'none' }} align="right">
          <Button
            onClick={toPage('characterSheet', chr._id)}
            disabled={chr.visibility === 'disabled' ? true : false}
          >
            Enter
          </Button>
          <Button
            onClick={() => handleDialogOpen(chr._id, chr.character)}
            disabled={whoIsLoggedIn.id === chr.owner ? false : true}
          >
            <DeleteForeverTwoToneIcon />
          </Button>
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Button
            onClick={() => setVisibility()}
            disabled={whoIsLoggedIn.id === chr.owner ? false : true}
          >
            {chr.visibility ? chr.visibility : 'visible'}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none' }}
          colSpan={12}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small">
              <TableHead>
                <TableCell>Player</TableCell>
                <TableCell>Depiction</TableCell>
              </TableHead>
              <TableRow>
                <TableCell>{chr.whoIsLoggedIn}</TableCell>
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
