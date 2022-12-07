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

//This component must be rewritten at some point.
const CreateAccount = ({ toPage, setPage }) => {
  const players = useSelector((state) => state.players)

  const [username, setUsername] = useState('')
  const [alias, setAlias] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [aliasError, setAliasError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmationError, setConfirmationError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleUsername = (event) => {
    event.preventDefault()
    const name = event.target.value
    if (name.length < 5) {
      setUsernameError(true)
    } else {
      setUsernameError(false)
      setUsername(name)
    }
  }

  const handlePassword = (event) => {
    event.preventDefault()
    const password = event.target.value
    if (password.length < 7) {
      setPasswordError(true)
      setErrorMessage('Password must be more than 7 characters')
    } else {
      setPasswordError(false)
      setErrorMessage('')
      setPassword(password)
    }
  }

  const createPlayer = (event) => {
    event.preventDefault()

    if (password.length < 7) {
      setPasswordError(true)
      setErrorMessage('Password must be more than 7 characters')
      setTimeout(() => {
        setPasswordError(false)
        setErrorMessage('')
      }, 4000)
      return
    }

    const credentials = {
      username,
      alias,
      password,
    }

    if (credentials.password !== confirmation) {
      setConfirmationError(true)
      setErrorMessage('Passwords not matching')
      setTimeout(() => {
        setConfirmationError(false)
        setErrorMessage('')
      }, 4000)
      return
    }

    //Note. I´m bypassing store, since there is no sense to write reducers for this single action.
    playerService
      .createPlayer(credentials)
      .then(() => setPage('login'))
      .catch((error) => {
        setAliasError(true)
        setErrorMessage(error.response.data.error)

        setTimeout(() => {
          setAliasError(false)
          setErrorMessage('')
        }, 4000)
      })

    setUsername('')
    setAlias('')
    setPassword('')
    setConfirmation('')
  }
  console.log('allplayers: ' + players)
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5">Create New Account</Typography>
      <form onSubmit={createPlayer}>
        <TextField
          error={usernameError}
          helperText={usernameError ? 'Too short' : ''}
          sx={{ mt: 1 }}
          label="Username"
          onChange={(event) => handleUsername(event)}
        />
        <TextField
          sx={{ mt: 1 }}
          error={aliasError}
          label="Alias"
          helperText={aliasError ? 'Must be unique' : ''}
          onChange={({ target }) => setAlias(target.value)}
        />
        <TextField
          error={passwordError}
          helperText={passwordError ? errorMessage : ''}
          type="password"
          sx={{ mt: 1 }}
          label="Password"
          onChange={(event) => handlePassword(event)}
        />
        <TextField
          type="password"
          error={confirmationError}
          sx={{ mt: 1 }}
          label="Confirm password"
          helperText={confirmationError ? errorMessage : 'Confirm password'}
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
