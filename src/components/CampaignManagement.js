import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Paper,
  Typography,
  Box,
  TextField,
  Divider,
  InputLabel,
} from '@mui/material'

import { setCurrentCampaign } from '../reducers/loggedPlayerReducer'

const CampaignManagement = ({ id }) => {
  const campaign = useSelector((state) =>
    state.campaigns.find((campaign) => campaign.id === id)
  )
  const player = useSelector((state) => state.loggedPlayer)
  const names = ['jakke', 'jukka', 'taisto', 'nallepuhi', 'robofobiitti']

  if (!campaign) {
    console.log('campaign missing')
    return null
  }
  if (!player) {
    console.log('player missing')
    return null
  }
  const dispatch = useDispatch()

  useEffect(() => {
    //Set player playing particular campaign
    dispatch(setCurrentCampaign(campaign.id, player.id)) //Note! "players"-state will not be updated.
  }, [dispatch])

  return (
    <>
      <Typography variant="h5">Management</Typography>
      <Paper elevation={0} sx={{ border: '1px solid', p: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 1,
          }}
          component="form"
        >
          <Typography variant="h6">{campaign.title}</Typography>
          <Divider />
          <Typography>Game: {campaign.game}</Typography>
          <Typography>Started: {campaign.started}</Typography>
          <Typography>Status: {campaign.status}</Typography>
          Owner: {campaign.owner.alias}
          <Typography>
            Players: {names.map((player) => player + ', ')}
          </Typography>
        </Box>
        <Divider sx={{ m: 1 }} />
        <Box>
          <InputLabel>Add player</InputLabel>
          <TextField
            size="small"
            label="Current"
            variant="filled"
            defaultValue={campaign.title}
            sx={{ m: 1 }}
          />
        </Box>

        <InputLabel>Edit Campaign Title</InputLabel>
        <TextField
          size="small"
          label="Current"
          variant="filled"
          defaultValue={campaign.title}
          sx={{ m: 1 }}
        />
        <Typography>
          <InputLabel>Transfer Ownership</InputLabel>
          <TextField
            size="small"
            label="Owner"
            defaultValue={campaign.owner.alias}
            sx={{ m: 1 }}
          />
        </Typography>
      </Paper>
    </>
  )
}

export default CampaignManagement
