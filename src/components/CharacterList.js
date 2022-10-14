/* eslint-disable */
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  initCharactersReducer,
  initializeNew,
  deleteOne,
} from '../reducers/characterReducer'
import {
  Grid,
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
} from '@mui/material'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'

const CharacterList = ({ toPage }) => {
  const dispatch = useDispatch()

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
    dispatch(initializeNew('someUserId'))
  }

  if (!characters) return null

  return (
    <div>
      <Grid item xs={12} md={8}>
        <TableContainer component="form">
          <Table>
            <TableBody>
              {characters.map((chr) => (
                <TableRow key={chr._id}>
                  <TableCell>{chr.character}</TableCell>
                  <TableCell>
                    <Button onClick={toPage('characterSheet', chr._id)}>
                      Enter
                    </Button>

                    <Button
                      onClick={() => handleClickOpen(chr._id, chr.character)}
                    >
                      <DeleteForeverTwoToneIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell>
                  <Button onClick={() => createNew()}>create new</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
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
    </div>
  )
}

export default CharacterList
