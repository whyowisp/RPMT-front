import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Container,
  Typography,
  Divider,
  Grid,
  TextField,
  Box,
  Button,
} from '@mui/material'

import { login } from '../reducers/loggedPlayerReducer'
import playerService from '../services/players'

const Login = ({ toPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()

    const credentials = {
      username,
      password,
    }

    dispatch(login(credentials))
  }
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          sx={{ mt: 1 }}
          label="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          sx={{ mt: 1 }}
          label="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
      <Divider>New user?</Divider>
      <Button variant="filled" onClick={toPage('createAccount')}>
        Create account
      </Button>
    </Box>
  )
}

const CreateAccount = ({ toPage }) => {
  const [username, setUsername] = useState('')
  const [alias, setAlias] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    if (password !== confirmation) {
      alert('Unmatching password confirmation')
      return
    }
    const credentials = {
      username,
      alias,
      password,
    }

    playerService.createPlayer(credentials)
    setUsername('')
    setAlias('')
    setPassword('')
    setConfirmation('')
    alert('New Player created successfully')
  }
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5">Create New Account</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          sx={{ mt: 1 }}
          label="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          sx={{ mt: 1 }}
          size="small"
          label="Alias "
          helperText="must be unique"
          onChange={({ target }) => setAlias(target.value)}
        />
        <TextField
          sx={{ mt: 1 }}
          label="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <TextField
          sx={{ mt: 1 }}
          label="Confirm password"
          onChange={({ target }) => setConfirmation(target.value)}
        />
        <Button type="submit">Create</Button>
      </form>
      <Divider></Divider>
      <Button variant="filled" onClick={toPage('login')}>
        Back
      </Button>
    </Box>
  )
}

const WelcomePage = () => {
  const [page, setPage] = useState('login')

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }
  const content = () => {
    if (page === 'login') return <Login toPage={toPage} />
    if (page === 'createAccount') return <CreateAccount toPage={toPage} />
  }
  console.log(page)
  return (
    <Container maxWidth="xs" sx={{ mt: 13 }}>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <Typography textAlign="right" variant="h2" sx={{ mr: 1 }}>
            RPMT
          </Typography>
          <Divider sx={{ mr: 1 }} />
          <Typography textAlign="right" variant="h6" sx={{ mr: 1 }}>
            A Campaign Management Tool for Roleplaying Games
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
        <Grid item xs={6}>
          {content()}
        </Grid>
      </Grid>
    </Container>
  )
}

export default WelcomePage
