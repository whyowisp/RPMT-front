import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { initCampaigns, createNewCampaign } from '../reducers/campaignReducer'

const Home = () => {
  const campaigns = useSelector((state) => state.campaigns)
  const player = useSelector((state) => state.player)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initCampaigns())
  }, [dispatch])

  if (!campaigns) return null

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
              <ListItemButton>
                <ListItemText
                  primary={campaign.title}
                  secondary={
                    'Game: ' +
                    campaign?.game +
                    ' Started: ' +
                    campaign.started.substring(0, 10) +
                    ' Owner: ' +
                    campaign?.owner.alias
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem>
            <ListItemButton
              onClick={() => dispatch(createNewCampaign(player.id))}
            >
              <ListItemText align="center">
                <Typography variant="h6">Start New</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  )
}

export default Home
