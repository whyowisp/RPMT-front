import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Input,
  Typography,
  Stack,
  Grid,
  Button,
  TextareaAutosize,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx, okButton } from './themeAndStyles'

const Spell = ({ charId, spellId }) => {
  //SPELL

  //Huolehtii yksittäisen spellin tulostuksesta ja sen updatesta. Huolehtii myös ettei tyhjää titleä tallenneta.

  //tulostuksessa jaa kenttiin spellin valuet
  //jos valueita muuttuu, updatee ne
  //submit lähettää muuttuneet valuet suoraan dispatchillä
  const dispatch = useDispatch()
  console.log(' char ID: ' + charId + ' spell ID: ' + spellId)

  const spells = useSelector((state) =>
    state.characters.find((cs) => cs._id === charId)
  ).spells

  const spell = spells.find((s) => s._id === spellId)

  const [spellName, setSpellName] = useState('')
  const [technique, setTechnique] = useState('')
  const [form, setForm] = useState('')
  const [level, setLevel] = useState('')
  const [bonus, setBonus] = useState('')
  const [range, setRange] = useState('')
  const [duration, setDuration] = useState('')
  const [spellTarget, setSpellTarget] = useState('')
  const [exp, setExp] = useState('')
  const [mastery, setMastery] = useState('')
  const [notes, setNotes] = useState('')

  const [editedSpell, setEditedSpell] = useState('')

  const prepareSpell = () => {
    console.log('spell preparing')
    const spell = {
      spell: spellName,
      technique: technique,
      form: form,
      level: level,
      bonus: bonus,
      range: range,
      duration: duration,
      target: spellTarget,
      exp: exp,
      mastery: mastery,
      notes: notes,
      _id: spellId ? spellId : null,
    }
    setEditedSpell(spell)
  }

  const submitSpell = (e) => {
    //check if new spell. edit data accordingly
    e.preventDefault()
    console.log('from submitSpell ' + JSON.stringify(editedSpell))
    const data = {
      id: charId,
      content: {
        //if-else structure to check if spell is old or new and returns spell array accordingly. map if old, concat if new
        spells: editedSpell._id
          ? spells.map((spell) =>
              spell._id === editedSpell._id ? editedSpell : spell
            )
          : spells.concat(editedSpell),
      },
    }
    console.log('dada: ' + JSON.stringify(data))
    dispatch(editCharacter(data))
  }

  if (!spells) return null
  console.log('from spell: ' + JSON.stringify(editedSpell))
  return (
    <Box
      component="form"
      sx={[
        { ...commonBoxSx },
        {
          '&:hover': {
            borderColor: 'green',
          },
        },
      ]}
    >
      <Stack direction="row" spacing={2}>
        <Typography variant="label" sx={{ fontSize: 18 }}>
          SPELL
        </Typography>
        <Input
          fullWidth
          defaultValue={spell?.spell}
          placeholder={'Title of a Mighty Spell'}
          onChange={({ target }) => setSpellName(target.value)}
          onBlur={() => prepareSpell()}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="labelSm">Technique</Typography>
        <Input
          defaultValue={spell?.technique}
          onChange={({ target }) => setTechnique(target.value)}
        />
        <Typography variant="labelSm">Form</Typography>
        <Input
          defaultValue={spell?.form}
          onChange={({ target }) => setForm(target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Typography variant="labelSm">Level</Typography>
        <Input
          defaultValue={spell?.level}
          onChange={({ target }) => setLevel(target.value)}
        />
        <Typography variant="labelSm">Bonus</Typography>
        <Input
          defaultValue={spell?.bonus}
          onChange={({ target }) => setBonus(target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Typography variant="labelSm">Range</Typography>
        <Input
          defaultValue={spell?.range}
          placeholder={'Sight'}
          onChange={({ target }) => setRange(target.value)}
        />
        <Typography variant="labelSm">Duration</Typography>
        <Input
          defaultValue={spell?.duration}
          placeholder={'Moon'}
          onChange={({ target }) => setDuration(target.value)}
        />
        <Typography variant="labelSm">Target</Typography>
        <Input
          defaultValue={spell?.target}
          placeholder={'Circle'}
          onChange={({ target }) => setSpellTarget(target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Typography variant="labelSm">Exp</Typography>
        <Input
          defaultValue={spell?.exp}
          onChange={({ target }) => setExp(target.value)}
        />
        <Typography variant="labelSm">Mastery</Typography>
        <Input
          defaultValue={spell?.mastery}
          onChange={({ target }) => setMastery(target.value)}
        />
      </Stack>
      <Typography variant="labelSm">Notes</Typography>
      <TextareaAutosize
        sx={{ ...plainInputSx }}
        minRows={5}
        style={{ width: '100%' }}
        placeholder="Spell description"
        defaultValue={spell?.notes}
        onChange={({ target }) => setNotes(target.value)}
      />
      <Button sx={okButton} onClick={(e) => submitSpell(e)}>
        ok
      </Button>
    </Box>
  )
}

const Spells = ({ id }) => {
  //SPELLS

  //Huolehtii spellsien jakamisesta. Huolehtii ettei ole tyhjiä. Huolehtii että lopussa on yksi tyhjä.

  //Hae tämä character
  //aseta spellsit
  //Lisää tyhjä spell loppuun
  //tulostuksessa mappaa spellsit
  const dispatch = useDispatch()

  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  if (!character) return null

  //Tämän voi siirtää lopuksi suoraan returniin. Pidetään vielä, jotta voidaan lukea spellsin sisältö ennen toimitusta
  const [spells, setSpells] = useState(
    character.spells
      .filter((spl) => (Object.values(spl)[0] === '' ? null : spl))
      .concat('')
  )

  console.log('from array: ' + JSON.stringify(spells))

  return (
    <Grid container>
      {spells.map((spell, index) => (
        <Grid key={spell.spell + index} item xs={12} sm={6}>
          <Spell charId={character._id} spellId={spell._id} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Spells
