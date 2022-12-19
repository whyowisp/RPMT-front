import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CssBaseline,
  ThemeProvider,
  Typography,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  Container,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'

import { clearPlayer, setCurrentCampaign } from './reducers/loggedPlayerReducer'

import { mainTheme } from './components/arsMagCharSheet/themeAndStyles'
import LoginPage from './components/LoginPage'
import CharacterList from './components/CharacterList'
import CharacterSheet from './components/arsMagCharSheet/CharacterSheet'
import Home from './components/Home'
import CampaignManagement from './components/CampaignManagement'

const drawerWidth = 200

const App = (props) => {
  const { window } = props
  //This player
  const player = useSelector((state) => state.loggedPlayer)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [page, setPage] = useState('home')
  const [id, setId] = useState()

  const dispatch = useDispatch()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const toPage = (page, id) => () => {
    setPage(page)
    setId(id)

    if (page === 'home' || page === 'player' || page === 'logout') {
      console.log('exiting campaign page')
      dispatch(setCurrentCampaign(null, player.id))
    }
  }

  console.log('toPage: ' + page)

  const content = () => {
    if (page === 'home') {
      return <Home toPage={toPage} />
    } else if (page === 'characterList') {
      return <CharacterList toPage={toPage} />
    } else if (page === 'characterSheet') {
      return <CharacterSheet id={id} />
    } else if (page === 'campaign') {
      return <CampaignManagement id={id} />
    }
  }

  const drawer = (
    <div>
      <Toolbar sx={{ backgroundColor: 'black' }}>
        <Typography variant="h4" sx={{ ml: 7, color: 'white' }}>
          RPMT
        </Typography>
      </Toolbar>
      <Divider />

      {player?.currentCampaign ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                align="right"
                primary="Campaign Management"
                onClick={toPage('campaign')}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                align="right"
                primary="Characters"
                onClick={toPage('characterList')}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                align="right"
                primary="Factions"
                onClick={toPage('factions')}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                align="right"
                primary="Quests"
                onClick={toPage('quests')}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                align="right"
                primary="Other"
                onClick={toPage('other')}
              />
            </ListItemButton>
          </ListItem>
        </List>
      ) : null}

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              align="right"
              primary="Home"
              onClick={toPage('home')}
            />
            <HomeIcon sx={{ m: 1 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              align="right"
              primary="Player"
              onClick={toPage('player')}
            />
            <AccessibilityNewIcon sx={{ m: 1 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              align="right"
              primary="Logout"
              onClick={() => dispatch(clearPlayer())}
            />
            <LogoutIcon sx={{ m: 1 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  //If player in store exists (is logged in) show content, else show login page
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      {player ? (
        <Box sx={{ display: 'flex' }}>
          <AppBar
            position="fixed"
            sx={{
              width: { md: `calc(100% - ${drawerWidth}px)` },
              ml: { md: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Roleplaying Game Campaign Management Tool
              </Typography>
            </Toolbar>
          </AppBar>

          <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            <Typography align="right">
              Logged in as <b>{player.alias}</b>
            </Typography>
            <Container maxWidth="md" sx={{ p: 0 }}>
              {content()}
            </Container>
          </Box>
        </Box>
      ) : (
        <LoginPage />
      )}
    </ThemeProvider>
  )
}
export default App
