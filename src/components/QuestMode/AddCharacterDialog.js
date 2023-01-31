import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
} from '@mui/material'
import { editCampaign } from '../../reducers/campaignReducer'

const AddCharacterDialog = ({
  dialogOpen,
  setDialogOpen,
  group,
  campaignID,
}) => {
  const npcs = useSelector((state) => state.npcs)
  const campaign = useSelector((state) =>
    state.campaigns.find((campaign) => campaign.id === campaignID)
  )

  const [selected, setSelected] = useState('')

  const dispatch = useDispatch()

  const handleAddCharacter = (selected) => {
    const npc = npcs.find((npc) => npc.name === selected)
    if (group.characters.find((characterID) => characterID === npc._id)) {
      alert('This character is already in this group')
      return
    }

    const data = {
      id: campaignID,
      content: {
        groups: campaign.groups.map((grp) =>
          grp._id === group._id
            ? { ...grp, characters: grp.characters.concat(npc._id) }
            : grp
        ),
      },
    }

    console.log(data)
    dispatch(editCampaign(data))
  }

  if (!npcs) return null
  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Add Character to Group</DialogTitle>
      <DialogContent>
        <InputLabel>Select</InputLabel>
        <Select
          fullWidth
          value={selected}
          onChange={({ target }) => setSelected(target.value)}
        >
          {npcs.map((npc) => (
            <MenuItem key={npc._id} value={npc.name}>
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
          Close
        </Button>
        <Button onClick={() => handleAddCharacter(selected)}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCharacterDialog
