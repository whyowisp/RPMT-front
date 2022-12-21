import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Paper,
  Typography,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'
import CasinoIcon from '@mui/icons-material/Casino'
import TitleIcon from '@mui/icons-material/Title'
import GroupIcon from '@mui/icons-material/Group'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { editCampaign } from '../reducers/campaignReducer'

const CampaignManagement = () => {
  const whoIsLoggedIn = useSelector((state) => state.loggedPlayer)
  const players = useSelector((state) => state.players)
  const campaign = useSelector((state) =>
    state.campaigns.find(
      (campaign) => campaign.id === whoIsLoggedIn.currentCampaign
    )
  )

  const [transferDialogOpen, setTransferDialogOpen] = useState(false)
  const [selectedOwner, setSelectedOwner] = useState('')

  const [addRemoveDialogOpen, setAddRemoveDialogOpen] = useState(false)
  const [addRemoveWho, setAddRemoveWho] = useState('')

  const [titleDialogOpen, setTitleDialogOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const dispatch = useDispatch()

  //Transferring ownership is disabled for now. Unnecessary complication.
  const handleTransferOwnership = () => {
    const data = {
      id: campaign.id,
      content: selectedOwner,
    }
    console.log('dataToSubmit: ' + JSON.stringify(data))
    //dispatch etc.
  }

  const handleRemovePlayer = () => {
    //Does player in THIS campaign exist?
    const playerToRemove = campaign.players.find(
      (player) => player.alias === addRemoveWho
    )
    if (!playerToRemove) {
      alert('No such player')
      return
    }

    const updatedCampaignPlayers = campaign.players.filter(
      (player) => player.id !== playerToRemove.id
    )
    const data = {
      id: campaign.id,
      content: {
        players: updatedCampaignPlayers,
      },
    }
    dispatch(editCampaign(data))

    setAddRemoveDialogOpen(false)
    setAddRemoveWho('')
  }

  const handleAddPlayer = () => {
    const playerInDb = players.find((player) => player.alias === addRemoveWho)
    const playerInCampaign = campaign.players.find(
      (player) => player.alias === addRemoveWho
    )
    if (!playerInDb) {
      alert('player does not exist')
      return
    }
    if (playerInCampaign) {
      alert('campaign already has this player')
      return
    }

    const updatedCampaignPlayers = campaign.players.concat(playerInDb)
    const data = {
      id: campaign.id,
      content: {
        players: updatedCampaignPlayers,
      },
    }
    dispatch(editCampaign(data))

    setAddRemoveDialogOpen(false)
    setAddRemoveWho('')
  }

  const handleEditCampaignTitle = () => {
    const data = {
      id: campaign.id,
      content: {
        title: newTitle,
      },
    }
    dispatch(editCampaign(data))

    setTitleDialogOpen(false)
    setNewTitle('')
  }

  return (
    <>
      <Typography variant="h5">Management</Typography>
      <Paper
        component="form"
        elevation={10}
        sx={{
          width: '100%',
          maxWidth: 'sm',
          p: 2,
        }}
      >
        <Typography variant="h6">Campaign Info</Typography>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <CasinoIcon />
            </ListItemIcon>
            <ListItemText primary="Game" secondary={campaign?.game} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Started: " />
            <ListItemText
              primary={campaign?.started}
              primaryTypographyProps={{ color: 'primary.main' }}
            />
            <ListItemText
              primary={campaign?.status}
              primaryTypographyProps={{
                fontSize: '2em',
                color: 'success.main',
              }}
            />
          </ListItem>

          <Divider />

          <ListItem disablePadding>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Owner" secondary={campaign?.owner.alias} />
            <Button
              sx={{ color: 'primary.main', m: 1 }}
              onClick={() => setTransferDialogOpen(true)}
            >
              Transfer
            </Button>
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <TitleIcon />
            </ListItemIcon>
            <ListItemText primary="Title" secondary={campaign?.title} />
            <Button
              sx={{ color: 'primary.main', m: 1 }}
              onClick={() => setTitleDialogOpen(true)}
            >
              Change
            </Button>
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText
              primary="Players"
              secondary={campaign?.players.map((player) => player.alias + ' ')}
            />
            <Button
              sx={{ color: 'primary.main', m: 1 }}
              onClick={() => setAddRemoveDialogOpen(true)}
            >
              Add/Remove
            </Button>
          </ListItem>
        </List>
      </Paper>

      <Dialog open={transferDialogOpen}>
        <DialogTitle>Transfer Ownership To?</DialogTitle>
        <DialogContent>
          <InputLabel>Select Player</InputLabel>
          <Select
            autoWidth
            value={selectedOwner}
            onChange={({ target }) => setSelectedOwner(target.value)}
          >
            {campaign.players.map((whoIsLoggedIn) => (
              <MenuItem key={whoIsLoggedIn.alias} value={whoIsLoggedIn.alias}>
                {whoIsLoggedIn.alias}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setTransferDialogOpen(false)}
            sx={{ color: 'warning.dark' }}
          >
            Cancel
          </Button>
          <Button disabled onClick={() => handleTransferOwnership()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addRemoveDialogOpen}>
        <DialogTitle>Add/Remove Player</DialogTitle>
        <DialogContent>
          <DialogContentText>Who?</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Alias"
            fullWidth
            onChange={({ target }) => setAddRemoveWho(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAddRemoveDialogOpen(false)}
            sx={{ color: 'warning.dark' }}
          >
            Cancel
          </Button>
          <Button onClick={() => handleAddPlayer()}>Add</Button>
          <Button onClick={() => handleRemovePlayer()}>Remove</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={titleDialogOpen}>
        <DialogTitle>Edit Title</DialogTitle>
        <DialogContent>
          <DialogContentText>New Title</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setTitleDialogOpen(false)}
            sx={{ color: 'warning.dark' }}
          >
            Cancel
          </Button>
          <Button onClick={() => handleEditCampaignTitle()}>Change</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CampaignManagement
