/* eslint-disable */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Box,
  Stack,
  Input,
  TextareaAutosize,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Paper,
  Divider,
} from '@mui/material'
import AMbackground from '../../images/AMbackground.jpg'
import { plainInputSx, commonBoxSx, okButton } from '../themeAndStyles'

const BasicAttributes = ({ factionId }) => {
  const faction = useSelector((state) =>
    state.factions.find((faction) => faction.id === factionId)
  )
  const [leaderName, setLeaderName] = useState('')
  const [description, setDescription] = useState('')

  return (
    <Paper
      elevation={10}
      sx={{
        padding: 3,
        position: 'relative',
        mb: 10,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundImage: `url(${AMbackground})`,
      }}
    >
      <Box
        component="form"
        sx={{
          ...commonBoxSx,
        }}
      >
        <Typography variant="h5" sx={{ p: 2 }}>
          Covenant Record Sheet
        </Typography>
      </Box>
    </Paper>
  )
}

export default BasicAttributes
