import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { addPlayer } from '../reducers/playersReducer'

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
          type="password"
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

const CreateAccount = ({ toPage, setPage }) => {
  const players = useSelector((state) => state.players)

  const [username, setUsername] = useState('')
  const [alias, setAlias] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [aliasError, setAliasError] = useState('')

  const dispatch = useDispatch()

  const handleAlias = (event) => {
    event.preventDefault()
    setAlias(event.target.value)
    const existingAlias = players.find(
      (player) => player.alias === event.target.value
    )
    if (event.target.value.length < 5) setAliasError('Alias too short')
    else if (existingAlias) setAliasError('Player alias must be unique')
    else setAliasError('')
  }

  const createPlayer = async (event) => {
    event.preventDefault()

    const credentials = {
      username,
      alias,
      password,
    }

    //Final checks before dispatch
    if (
      credentials.username.length > 4 &&
      credentials.alias.length > 4 &&
      credentials.password.length > 7 &&
      credentials.password === confirmation
    ) {
      dispatch(addPlayer(credentials))
      setPage('login')
    } else {
      alert('Something went wrong')
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5">Create New Account</Typography>
      <form onSubmit={createPlayer}>
        <TextField
          color={username && username.length < 5 ? 'warning' : 'success'}
          helperText={username && username.length < 5 ? 'Too short' : ''}
          sx={{ mt: 1 }}
          label="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          sx={{ mt: 1 }}
          color={aliasError ? 'warning' : 'success'}
          label="Alias"
          helperText={aliasError ? aliasError : ''}
          onChange={(event) => handleAlias(event)}
        />
        <TextField
          color={password && password.length < 8 ? 'warning' : 'success'}
          helperText={password && password.length < 8 ? 'Too short' : ''}
          type="password"
          sx={{ mt: 1 }}
          label="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <TextField
          type="password"
          color={
            confirmation && confirmation === password ? 'success' : 'warning'
          }
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
    if (page === 'createAccount')
      return <CreateAccount toPage={toPage} setPage={setPage} />
  }

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
