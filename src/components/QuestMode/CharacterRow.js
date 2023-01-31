import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  IconButton,
  Typography,
  Collapse,
  TableRow,
  TableCell,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonRemoveIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'

import NpcSheet from '../NpcSheet/NpcSheet'
import { editCampaign } from '../../reducers/campaignReducer'

const CharacterRow = ({ characterID, group, campaignID }) => {
  const character = useSelector((state) =>
    state.npcs.find((npc) => npc._id === characterID)
  )
  const campaign = useSelector((state) =>
    state.campaigns.find((campaign) => campaign.id === campaignID)
  )

  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  /* eslint-disable */
  const removeCharacter = () => {
    const data = {
      id: campaignID,
      content: {
        groups: campaign.groups.map((grp) =>
          grp._id === group._id
            ? {
                ...grp,
                characters: grp.characters.filter(
                  (chrID) => chrID !== characterID
                ),
              }
            : grp
        ),
      },
    }
    /* eslint-enable */

    console.log(data)
    dispatch(editCampaign(data))
  }

  console.log('hello from ROW: ' + characterID, group)
  if (!character) return null
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
        <TableCell style={{ borderBottom: 'none' }}>
          <Typography
            sx={{
              color: character.visibility === 'disabled' ? '#bf4e30' : 'black',
            }}
          >
            {character.name}
          </Typography>
        </TableCell>
        <TableCell style={{ borderBottom: 'none' }}>
          <IconButton edge="end" onClick={() => removeCharacter()}>
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

export default CharacterRow
