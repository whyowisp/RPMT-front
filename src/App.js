import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@mui/system'
import { styled, useTheme } from '@mui/material/styles'
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
} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { mainTheme } from './components/arsMagCharSheet/themeAndStyles'
import WelcomePage from './components/WelcomePage'
import CharacterList from './components/CharacterList'
import CharacterSheet from './components/arsMagCharSheet/CharacterSheet'
import Home from './components/Home'

import { clearPlayer } from './reducers/playerReducer'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `0px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const App = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const player = useSelector((state) => state.player)
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState('home')
  const [id, setId] = useState()

  const toPage = (page, id) => (event) => {
    event.preventDefault()
    setPage(page)
    setId(id)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
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

  console.log('player: ' + JSON.stringify(player))

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      {player ? (
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography noWrap component="div">
                Roleplaying Game Campaign Management Tool
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="temporary"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary="Home"
                    onClick={() => setPage('home')}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary="Characters"
                    onClick={toPage('characterList')}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Covenants" onClick={toPage('home')} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary="Logout"
                    onClick={() => dispatch(clearPlayer())}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <Main open={open}>
            <main>
              <DrawerHeader />
              <Container maxWidth="md" sx={{ p: 0 }}>
                {content()}
              </Container>
            </main>
          </Main>
        </Box>
      ) : (
        <WelcomePage />
      )}
    </ThemeProvider>
  )
}

export default App
