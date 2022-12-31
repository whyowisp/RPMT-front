/*eslint-disable*/
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Paper,
  Divider,
} from '@mui/material'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'

import { createFaction, removeFaction } from '../reducers/factionReducer'

const Factions = ({ toPage }) => {
  const whoIsLoggedIn = useSelector((state) => state.loggedPlayer)
  const factions = useSelector((state) => state.factions)

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [referenceTitle, setReferenceTitle] = useState('')
  const [factionId, setFactionId] = useState('')

  const handleDialogOpen = () => {
    setCreateDialogOpen(true)
  }
  const handleDeleteDialogOpen = (factionId, factionTitle) => {
    setFactionId(factionId)
    setReferenceTitle(factionTitle)
    setDeleteDialogOpen(true)
  }

  if (!factions) return null
  if (!whoIsLoggedIn) return null

  return (
    <>
      <Typography variant="h5">Factions</Typography>
      <Paper
        elevation={10}
        sx={{
          p: 1,
          paddingBottom: 10,
        }}
      >
        <List>
          {factions.map((faction) => (
            <>
              <ListItem key={faction.id}>
                <ListItemButton
                  onClick={
                    toPage(
                      faction.factionType,
                      faction.id
                    ) /*enum in factionSchema at backend must be exactly right */
                  }
                >
                  <ListItemText primary={faction.title}></ListItemText>
                </ListItemButton>
                <Button
                  onClick={() =>
                    handleDeleteDialogOpen(faction.id, faction.title)
                  }
                  disabled={
                    whoIsLoggedIn.id === whoIsLoggedIn.currentCampaign?.owner
                      ? false
                      : true
                  }
                >
                  <DeleteForeverTwoToneIcon />
                </Button>
              </ListItem>
              <Divider />
            </>
          ))}

          <ListItem>
            <ListItemButton onClick={() => handleDialogOpen()}>
              <ListItemText align="center">
                <Typography variant="h6">New Faction</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <FactionCreationDialog
          open={createDialogOpen}
          setCreateDialogOpen={setCreateDialogOpen}
          whoIsLoggedIn={whoIsLoggedIn}
        />
        <FactionDeletionDialog
          open={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          referenceTitle={referenceTitle}
          factionId={factionId}
        />
      </Paper>
    </>
  )
}
const FactionDeletionDialog = ({
  open,
  setDeleteDialogOpen,
  referenceTitle,
  factionId,
}) => {
  const [titleConfirmation, setTitleConfirmation] = useState('')
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (titleConfirmation === referenceTitle) {
      dispatch(removeFaction(factionId))
    }
    setDeleteDialogOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This function removes faction permanently
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Faction title"
          type="title"
          fullWidth
          variant="outlined"
          onChange={({ target }) => setTitleConfirmation(target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
        <Button onClick={() => handleDelete()}>Remove</Button>
      </DialogActions>
    </Dialog>
  )
}

const FactionCreationDialog = ({
  open,
  setCreateDialogOpen,
  whoIsLoggedIn,
}) => {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  const handleCreate = (factionType) => {
    const newFaction = {
      campaignId: whoIsLoggedIn.currentCampaign.id,
      title: title,
      factionType: factionType,
    }

    dispatch(createFaction(newFaction))
    setCreateDialogOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Faction Creation</DialogTitle>

      <Typography variant="body2" sx={{ ml: 3, color: 'primary.main' }}>
        Campaign: {whoIsLoggedIn.currentCampaign.title}
      </Typography>

      <DialogContent>
        <DialogContentText>Faction Name</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          factionType="title"
          fullWidth
          onChange={({ target }) => setTitle(target.value)}
        />
        <List>
          <DialogContentText>Choose Type</DialogContentText>
          <ListItem dense>
            <ListItemButton onClick={() => handleCreate('regular')}>
              <ListItemText
                primary="Regular"
                secondary="Duchies, Kingdoms, Settlements etc."
              />
            </ListItemButton>
          </ListItem>
          <ListItem dense>
            <ListItemButton onClick={() => handleCreate('covenant')}>
              <ListItemText
                primary="Covenant"
                secondary="Ars Magica Specific"
              />
            </ListItemButton>
          </ListItem>
        </List>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default Factions
