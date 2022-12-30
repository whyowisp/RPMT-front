import { useEffect, useState } from 'react'
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
  Select,
  InputLabel,
  MenuItem,
  Paper,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material'
import { initCampaigns, createNewCampaign } from '../reducers/campaignReducer'
import { initFactions } from '../reducers/factionReducer'
import { initCharacters } from '../reducers/characterReducer'
import { setCurrentCampaign } from '../reducers/loggedPlayerReducer'

const Home = () => {
  const campaigns = useSelector((state) => state.campaigns)
  const whoIsLoggedIn = useSelector((state) => state.loggedPlayer)
  const [dialogOpen, setDialogOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initCampaigns())
  }, [dispatch])

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const setActiveCampaign = (campaignId) => {
    console.log('setting campaign id: ' + campaignId)
    dispatch(setCurrentCampaign(campaignId, whoIsLoggedIn.id))
    //Init redux store with other data directly related to selected campaign
    dispatch(initFactions(campaignId)) //Ideally init based on (whoIsLoggedIn.currentCampaign), but it´s unreliable
    dispatch(initCharacters(campaignId))
  }

  const isPlayerInCampaign = (campaign) => {
    //Is whoIsLoggedIn along with campaign
    const playersIdsInCampaign = campaign.players.map(
      (whoIsLoggedIn) => whoIsLoggedIn.id
    )
    if (playersIdsInCampaign.includes(whoIsLoggedIn.id)) return true
    //Is whoIsLoggedIn Owner of the campaign
    if (campaign.owner.id === whoIsLoggedIn.id) return true
  }

  if (!campaigns) return null
  if (!whoIsLoggedIn) return null

  return (
    <>
      <Typography variant="h5">Campaigns</Typography>
      <Paper
        elevation={10}
        sx={{
          p: 1,
          paddingBottom: 10,
        }}
      >
        <List>
          {campaigns.map((campaign) =>
            isPlayerInCampaign(campaign) ? (
              <div key={campaign.id}>
                <ListItem>
                  <ListItemAvatar sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Avatar
                      sx={{
                        color: 'customIcon.main',
                        backgroundColor: 'customIcon.contrastText',
                      }}
                    >
                      {campaign.title.substring(0, 1)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemButton
                    onClick={() => setActiveCampaign(campaign.id)}
                  >
                    <ListItemText
                      primary={campaign.title}
                      secondary={`Game: ${
                        campaign?.game
                      } / Started: ${campaign?.started.substring(0, 10)} / ${
                        campaign?.status === 'active'
                          ? 'Continuing...'
                          : 'Closed'
                      } `}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </div>
            ) : null
          )}

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
          whoIsLoggedIn={whoIsLoggedIn}
        />
      </Paper>
    </>
  )
}

const CampaignCreationDialog = ({ open, setDialogOpen, whoIsLoggedIn }) => {
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
      playerId: whoIsLoggedIn.id,
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
