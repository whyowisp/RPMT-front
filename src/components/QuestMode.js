/* eslint-disable */
import { useState } from 'react'
import {
  Grid,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Paper,
  TextField,
  Stack,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Collapse,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone'
import GroupRemoveOutlinedIcon from '@mui/icons-material/GroupRemoveOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonRemoveIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'

import Header from './Header'
import { useSelector } from 'react-redux'
import NpcSheet from './NpcSheet/NpcSheet'

const headerData = {
  title: 'Quest Mode',
  sections: [
    { name: 'Item 1', alt: 'I1' },
    { name: 'Item 2', alt: 'I2' },
  ],
}
const defaultGroups = [
  {
    name: 'Group 1',
    characters: [],
  },
]

const QuestMode = () => {
  const npcs = useSelector((state) => state.npcs)
  const characters = useSelector((state) => state.characters)
  const [groups, setGroups] = useState(defaultGroups)

  const addGroup = () => {
    setGroups(
      groups.concat({ name: `Group ${groups.length + 1}`, characters: [] })
    )
  }

  const removeGroup = (index) => {
    setGroups(groups.filter((group, i) => (i === index ? null : group)))
  }

  const editName = (newName, index) => {
    console.log(newName, index)
    const updatedGroup = {
      ...groups.find((group, i) => i === index),
      name: newName,
    }
    console.log(updatedGroup)
    setGroups(groups.map((group, i) => (i === index ? updatedGroup : group)))
  }

  const handleAddCharacter = (selected, index) => {
    const npc = npcs.find((npc) => npc.name === selected)
    const groupToUpdate = groups.find((group, i) => i === index)
    const updatedGroup = {
      name: groupToUpdate.name,
      characters: groupToUpdate.characters.concat(npc),
    }
    setGroups(groups.map((group, i) => (i === index ? updatedGroup : group)))
  }

  const handleRemoveCharacter = (groupIndex, characterId) => {
    const groupToUpdate = groups.find((group, i) => i === groupIndex)
    const updatedGroup = {
      name: groupToUpdate.name,
      characters: groupToUpdate.characters.filter(
        (character) => character._id !== characterId
      ),
    }
    setGroups(
      groups.map((group, i) => (i === groupIndex ? updatedGroup : group))
    )
  }

  console.log(groups)

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Header headerData={headerData} />
      </Grid>
      {groups.map((group, index) => (
        <Grid key={group.name} item xs={12} md={6}>
          <Group
            group={group}
            index={index}
            removeGroup={removeGroup}
            editName={editName}
            handleAddCharacter={handleAddCharacter}
            handleRemoveCharacter={handleRemoveCharacter}
          />
        </Grid>
      ))}
      <Grid item xs={1}>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="group"
          sx={{ mr: 1 }}
          onClick={() => addGroup()}
        >
          <GroupAddTwoToneIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

const Group = ({
  group,
  index,
  removeGroup,
  editName,
  handleAddCharacter,
  handleRemoveCharacter,
}) => {
  const [newName, setNewName] = useState('')
  const [nameEditVisible, setNameEditVisible] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleNewName = () => {
    editName(newName, index)
    setNameEditVisible(false)
  }

  return (
    <Paper elevation={3} sx={{ paddingBottom: 10 }}>
      <Toolbar
        variant="dense"
        sx={{
          borderRadius: 1,
        }}
      >
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="group"
          sx={{ mr: 1 }}
          onClick={() => removeGroup(index)}
        >
          <GroupRemoveOutlinedIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: nameEditVisible ? 'none' : 'block' }}
        >
          {group.name}
        </Typography>
        <Stack
          direction="row"
          sx={{ display: nameEditVisible ? 'block' : 'none' }}
        >
          <TextField
            size="small"
            onChange={({ target }) => setNewName(target.value)}
            sx={{ width: '100%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="large"
                    edge="end"
                    onClick={() => handleNewName()}
                  >
                    <CheckOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="group"
          sx={{ mr: 0, display: nameEditVisible ? 'none' : 'block' }}
          onClick={() => setNameEditVisible(!nameEditVisible)}
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="group"
          onClick={() => setDialogOpen(true)}
        >
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </Toolbar>

      <Table size="small" padding="none">
        <TableHead>
          <TableCell></TableCell>
          <TableCell sx={{ pt: 1, pl: 1 }}>Character</TableCell>
          <TableCell></TableCell>
        </TableHead>
        <TableBody>
          {group.characters.map((character) => (
            <CharacterRow
              character={character}
              handleRemoveCharacter={handleRemoveCharacter}
              index={index}
            />
          ))}
        </TableBody>
      </Table>

      <AddCharacterDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleAddCharacter={handleAddCharacter}
        index={index}
      />
    </Paper>
  )
}

const CharacterRow = ({
  character,
  handleRemoveCharacter,
  index = { index },
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow key={character._id}>
        <TableCell style={{ borderBottom: 'none' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <Typography
          variant="subtitle1"
          sx={{
            color: character.visibility === 'disabled' ? '#bf4e30' : 'black',
          }}
        >
          {character.name}
        </Typography>
        <TableCell style={{ borderBottom: 'none' }}>
          <IconButton
            edge="end"
            onClick={() => handleRemoveCharacter(index, character._id)}
          >
            <PersonRemoveIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            borderBottom: 'none',
          }}
          colSpan={12}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <NpcSheet npcId={character._id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

/*<NpcSheet npcId={character._id} /> */
const AddCharacterDialog = ({
  dialogOpen,
  setDialogOpen,
  handleAddCharacter,
  index,
}) => {
  const npcs = useSelector((state) => state.npcs)
  const [selected, setSelected] = useState('')

  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Add Character to Group</DialogTitle>
      <DialogContent>
        <InputLabel>Select</InputLabel>
        <Select
          autoWidth
          value={selected}
          onChange={({ target }) => setSelected(target.value)}
        >
          {npcs.map((npc) => (
            <MenuItem key={npc.id} value={npc.name}>
              {npc.name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setDialogOpen(false)}
          sx={{ color: 'warning.dark' }}
        >
          Cancel
        </Button>
        <Button onClick={() => handleAddCharacter(selected, index)}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default QuestMode
