import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Paper,
  Typography,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Box,
  Stack,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import CasinoIcon from '@mui/icons-material/Casino'
import TitleIcon from '@mui/icons-material/Title'
import GroupIcon from '@mui/icons-material/Group'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const CampaignManagement = () => {
  const player = useSelector((state) => state.loggedPlayer)
  const campaign = useSelector((state) =>
    state.campaigns.find((campaign) => campaign.id === player.currentCampaign)
  )

  const names = ['jakke', 'jukka', 'taisto', 'nallepuhi', 'robofobiitti']
  const [visibility, setVisibility] = useState('none')

  if (!campaign) {
    console.log('campaign missing')
    return null
  }
  if (!player) {
    console.log('player missing')
    return null
  }
  console.log('management page should appear')
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
            <ListItemText primary="Game" secondary={campaign.game} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Started: " />
            <ListItemText
              primary={campaign.started}
              primaryTypographyProps={{ color: 'primary.main' }}
            />
            <ListItemText
              primary={campaign.status}
              primaryTypographyProps={{
                fontSize: '2em',
                color: 'primary.okStatus',
              }}
            />
          </ListItem>

          <Divider />

          <ListItem disablePadding>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Owner" secondary={campaign.owner.alias} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <TitleIcon />
            </ListItemIcon>
            <ListItemText primary="Title" secondary={campaign.title} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText
              primary="Players"
              secondary={names.map((name) => name + ' ')}
            />
          </ListItem>
          <Divider />
          <ListItemButton
            sx={{ color: 'primary.main', align: 'right' }}
            onClick={() => setVisibility('block')}
          >
            <ListItemText align="right" primary="Edit" />
          </ListItemButton>
          <Box sx={{ m: 1, display: visibility }}>
            <Typography variant="h6">Edit</Typography>
            <Divider />
            <Stack direction="row">
              <Typography sx={{ p: 1.7 }}>Edit Title:</Typography>
              <TextField
                margin="dense"
                variant="standard"
                defaultValue={campaign.title}
              />
            </Stack>
            <Stack direction="row">
              <Typography sx={{ p: 1.7 }}>Transfer ownership to:</Typography>
              <TextField
                margin="dense"
                variant="standard"
                defaultValue={campaign.title}
              />
            </Stack>
            <Stack direction="row">
              <Typography sx={{ p: 1.7 }}>Add/Remove player:</Typography>
              <TextField
                helperText="Type player to add"
                margin="dense"
                variant="standard"
                defaultValue={campaign.title}
              />
              <InputLabel>Player to Remove</InputLabel>
              <Select autoWidth value="player">
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
        </List>
      </Paper>
    </>
  )
}

export default CampaignManagement
