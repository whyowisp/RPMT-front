import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
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
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material'
import { initCampaigns, createNewCampaign } from '../reducers/campaignReducer'

const Home = ({ toPage }) => {
  const campaigns = useSelector((state) => state.campaigns)
  const player = useSelector((state) => state.loggedPlayer)
  const [dialogOpen, setDialogOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initCampaigns())
  }, [dispatch])

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  if (!campaigns) return null
  if (!player) return null

  return (
    <>
      <Typography variant="h5">Campaigns</Typography>
      <Box
        sx={{
          p: 1,
          paddingBottom: 10,
        }}
      >
        <List>
          {campaigns.map((campaign) => (
            <ListItem key={campaign.id}>
              <ListItemButton onClick={toPage('campaign', campaign.id)}>
                <ListItemText
                  primary={campaign.title}
                  secondary={
                    'Game: ' +
                    campaign?.game +
                    ' Started: ' +
                    campaign.started.substring(0, 10) +
                    ' Owner: ' +
                    (campaign.owner.alias ? campaign.owner.alias : player.alias)
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem>
            <ListItemButton onClick={() => handleDialogOpen()}>
              <ListItemText align="center">
                <Typography variant="h6">Start New</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <CampaignCreationDialog
          open={dialogOpen}
          setDialogOpen={setDialogOpen}
          player={player}
        />
      </Box>
    </>
  )
}

const CampaignCreationDialog = ({ open, setDialogOpen, player }) => {
  const availableGames = [
    'Ars Magica',
    'Dungeons&Dragons (disabled)',
    '2300AD (disabled)',
  ]
  const [selectedGame, setSelectedGame] = useState('Ars Magica')
  const [title, setTitle] = useState('')

  const dispatch = useDispatch()

  const handleCreate = () => {
    const newCampaign = {
      title: title,
      game: selectedGame,
      playerId: player.id,
    }

    dispatch(createNewCampaign(newCampaign))
    setDialogOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Campaign Creation</DialogTitle>
      <DialogContent>
        <DialogContentText>New Campaign</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="title"
          fullWidth
          onChange={({ target }) => setTitle(target.value)}
        />
        <InputLabel>Select Game</InputLabel>
        <Select
          autoWidth
          value={selectedGame}
          onChange={({ target }) => setSelectedGame(target.value)}
        >
          {availableGames.map((game) => (
            <MenuItem key={game} value={game}>
              {game}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        <Button onClick={() => handleCreate()}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Home
