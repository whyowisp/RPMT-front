import { useDispatch, useSelector } from 'react-redux'
import { Box, Input, Typography, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { editCharacter } from '../../reducers/characterReducer'
import { commonBoxSx, plainInputSx } from './themeAndStyles'

const DescriptiveStats = ({ id }) => {
  const dispatch = useDispatch()
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  const [descriptiveStats, setDescriptiveStats] = useState()

  useEffect(() => {
    setDescriptiveStats(character.descriptiveStats)
  }, [character])

  const submitUpdate = () => {
    dispatch(editCharacter())
  }

  if (!descriptiveStats) return null
  return (
    <Box component="form" sx={commonBoxSx}>
      {descriptiveStats.map((dStat) => {
        if (dStat.stat === 'Height') {
          return (
            <Stack direction="row" key={dStat.stat} sx={{ width: 100 }}>
              <Typography
                sx={{ width: dStat.stat.length * 11 }}
                variant="labelSm"
              >
                {dStat.stat}:
              </Typography>
              <Input
                sx={{ ...plainInputSx, width: '100%' }}
                defaultValue={dStat.description}
              />
            </Stack>
          )
        } else {
          return (
            <Stack direction="row" key={dStat.stat}>
              <Typography
                sx={{ width: dStat.stat.length * 11 }}
                variant="labelSm"
              >
                {dStat.stat}:
              </Typography>
              <Input
                sx={{ ...plainInputSx, width: '100%' }}
                defaultValue={dStat.description}
              />
            </Stack>
          )
        }
      })}
      <button onClick={() => submitUpdate()}>ok</button>
    </Box>
  )
  /*
  return (
    <Box component="form" sx={commonBoxSx}>
      <Stack direction="row">
        <Typography variant="labelSm" sx={{ width: 120 }}>
          Birth Name:
        </Typography>
        <Input
          sx={{ ...plainInputSx }}
          defaultValue={character.descriptiveStats.birthName}
        />
      </Stack>
      <button>ok</button>
    </Box>
    
  )*/
}

export default DescriptiveStats
