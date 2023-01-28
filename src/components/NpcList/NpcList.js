import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { initNpcs, initializeNew, deleteOne } from '../../reducers/npcReducer'
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
  Typography,
  Box,
  Paper,
} from '@mui/material'

import NpcColumn from './NpcColumn'
import dragonCastle from '../../images/dragonCastle.png'

const NpcList = () => {
  const whoIsLoggedIn = useSelector((state) => state.loggedPlayer)
  const allNpcs = useSelector((state) => state.npcs)
  const npcs = allNpcs.filter((npc) => !npc.isCreature)
  const creatures = allNpcs.filter((npc) => npc.isCreature)

  const [inputName, setInputName] = useState()
  const [referenceName, setReferenceName] = useState()
  const [id, setId] = useState()
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initNpcs(whoIsLoggedIn.currentCampaign.id))
  }, [dispatch])

  const handleDialogOpen = (id, name) => {
    setId(id)
    setReferenceName(name ? name : '') //if name is undef, bugses: Can't remove but one npc per page reload
    setOpen(true)
  }

  const handleDialogClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    if (inputName === referenceName) {
      dispatch(deleteOne(id))
    }

    setReferenceName('')
    setInputName('')
    setOpen(false)
  }

  const createNew = (isCreature) => {
    dispatch(
      initializeNew(
        whoIsLoggedIn.id,
        whoIsLoggedIn.currentCampaign.id,
        isCreature
      )
    )
  }

  if (!allNpcs) return null
  if (!whoIsLoggedIn) return null

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          maxWidth: 'md',
          position: 'relative',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${dragonCastle})`,
        }}
      >
        <Box
          sx={{
            backgroundSize: 'cover',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            mb: 2,
            pt: 6,
            pb: 6,
          }}
        >
          <Typography variant="h3" align="right" sx={{ mr: '30%', ml: 1 }}>
            Npc's & Creatures
          </Typography>
        </Box>
      </Paper>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <NpcColumn
            typeOfNpcs={npcs}
            handleDialogOpen={handleDialogOpen}
            createNew={createNew}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <NpcColumn
            typeOfNpcs={creatures}
            handleDialogOpen={handleDialogOpen}
            createNew={createNew}
            isCreature={true}
          />
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Remove NPC</DialogTitle>
        <DialogContent>
          <DialogContentText>Remove this NPC permanently?</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="NPC name"
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
    </>
  )
}

export default NpcList
