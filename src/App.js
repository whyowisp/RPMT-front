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

import { clearPlayer } from './reducers/loggedPlayerReducer'
import { initializePlayers } from './reducers/playersReducer'

import { mainTheme } from './components/arsMagCharSheet/themeAndStyles'
import LoginPage from './components/LoginPage'
import CharacterList from './components/CharacterList'
import CharacterSheet from './components/arsMagCharSheet/CharacterSheet'
import Home from './components/Home'

const drawerWidth = 200

const App = (props) => {
  const { window } = props
  //This player
  const player = useSelector((state) => state.player)
  //All players (to store)
  const dispatch = useDispatch()
  dispatch(initializePlayers())

  const [mobileOpen, setMobileOpen] = useState(false)
  const [page, setPage] = useState('home')
  const [id, setId] = useState()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const toPage = (page, id) => (event) => {
    event.preventDefault()
    setPage(page)
    setId(id)
  }

  const content = () => {
    if (page === 'home') {
      return <Home />
    } else if (page === 'Home') {
      return <CharacterList toPage={toPage} />
    } else if (page === 'characterList') {
      return <CharacterList toPage={toPage} />
    } else if (page === 'characterSheet') {
      return <CharacterSheet id={id} />
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
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              align="right"
              primary="Home"
              onClick={() => setPage('home')}
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
              primary="Covenants"
              onClick={toPage('home')}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
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
