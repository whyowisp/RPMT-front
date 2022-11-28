import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@mui/system'
import {
  Button,
  CssBaseline,
  ThemeProvider,
  Typography,
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { mainTheme } from './components/arsMagCharSheet/themeAndStyles'
import WelcomePage from './components/WelcomePage'
import CharacterList from './components/CharacterList'
import CharacterSheet from './components/arsMagCharSheet/CharacterSheet'
import Home from './components/Home'

import { clearPlayer } from './reducers/playerReducer'

const drawerWidth = 240
const navItems = ['Home', 'About', 'Contact']

//DrawerAppBar from MaterialUI: https://mui.com/material-ui/react-app-bar/
const DrawerAppBar = (props) => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        RPMT
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            RPMT
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: 'inherit' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

const App = () => {
  const [page, setPage] = useState('home')
  const [id, setId] = useState()
  const player = useSelector((state) => state.player)

  const dispatch = useDispatch()

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
  console.log('pleieri: ' + JSON.stringify(player))

  return (
    <Container maxWidth="lg">
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        {!player ? (
          <WelcomePage display />
        ) : (
          <main>
            <Typography>
              Logged in as <b>{player.alias}</b>
            </Typography>
            <menu>
              <Button variant="contained" onClick={toPage('welcome')}>
                home
              </Button>
              <Button variant="contained" onClick={toPage('characterList')}>
                characters
              </Button>
              <Button
                variant="outlined"
                onClick={() => dispatch(clearPlayer())}
              >
                Logout
              </Button>
              <DrawerAppBar />
            </menu>
            {content()}
          </main>
        )}
      </ThemeProvider>
    </Container>
  )
}

export default App
