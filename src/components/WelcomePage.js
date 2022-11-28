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

import { login } from '../reducers/playerReducer'

const Login = () => {
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
    </Box>
  )
}

const WelcomePage = () => {
  return (
    <Container maxWidth="xs" sx={{ mt: 15 }}>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <Typography textAlign="right" variant="h2" sx={{ mr: 1 }}>
            RPMT
          </Typography>
          <Typography textAlign="right" variant="h6" sx={{ mr: 1 }}>
            A Campaign Management Tool for Roleplaying Games
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
        <Grid item xs={6}>
          <Login />
        </Grid>
      </Grid>
    </Container>
  )
}

export default WelcomePage
