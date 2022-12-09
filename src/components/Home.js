import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'

const Home = () => {
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
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary="Merx Lo Vult"
                secondary="Ars Magica, Campaign start date 09.12.2022"
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary="Ghosts of Cruciferae"
                secondary="Dungeons & Dragons, Campaign start date 09.12.1997"
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
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
