/* eslint-disable */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  initCharactersReducer,
  initializeNew,
} from '../reducers/characterReducer'
import {
  Grid,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Button,
  Link,
} from '@mui/material'

const CharacterList = ({ toPage }) => {
  const characters = useSelector((state) => state.characters)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initCharactersReducer())
  }, [dispatch])

  const createNew = (e) => {
    e.preventDefault()
    console.log('Proceed to create new')
    dispatch(initializeNew('someUserId'))
  }

  const deleteCharacter = (e, id, name) => {
    e.preventDefault()
    const areYouSure = prompt('Type character name to delete')
    if (areYouSure !== name) return
    console.log('Proceed to delete characrtete')
  }

  if (!characters) return null

  return (
    <Grid item xs={12} md={8}>
      <TableContainer component="form">
        <Table>
          <TableBody>
            {characters.map((chr) => (
              <TableRow key={chr._id}>
                <TableCell>{chr.character}</TableCell>
                <TableCell>
                  <Button a href="" onClick={toPage('characterSheet', chr._id)}>
                    play
                  </Button>

                  <Button
                    disabled
                    onClick={(e) => deleteCharacter(e, chr._id, chr.character)}
                  >
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell>
                <Button onClick={(e) => createNew(e)}>create new</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default CharacterList
