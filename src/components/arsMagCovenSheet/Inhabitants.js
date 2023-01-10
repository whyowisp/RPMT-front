/* eslint-disable */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Stack, Input, Typography, Button, Grid } from '@mui/material'
import { plainInputSx, commonBoxSx, okButton } from '../themeAndStyles'

import { editCovenant } from '../../reducers/covenantReducer'

const Inhabitants = ({ id }) => {
  const covenant = useSelector((state) =>
    state.covenants.find((covenant) => covenant.id === id)
  )

  const [governanceType, setGovernanceType] = useState(covenant.governanceType)
  const [baseLoyaltyPoints, setBaseLoyaltyPoints] = useState(
    covenant.baseLoyaltyPoints
  )
  const [currentLoyaltyPoints, setCurrentLoyaltyPoints] = useState(
    covenant.currentLoyaltyPoints
  )
  const [prevailingLoyaltyScore, setPrevailingLoyaltyScore] = useState(
    covenant.prevailingLoyaltyScore
  )
  const [sitModLivingConditions, setSitModLivingConditions] = useState(
    covenant.sitModLivingConditions
  )
  const [sitModEquipment, setSitModEquipment] = useState(
    covenant.sitModEquipment
  )
  const [sitModMoney, setSitModMoney] = useState(covenant.sitModMoney)
  const [sitModSpecialists, setSitModSpecialists] = useState(
    covenant.sitModSpecialists
  )

  const dispatch = useDispatch()

  const submitUpdate = (e) => {
    e.preventDefault()
    const data = {
      id: id,
      content: {
        inhabitants: {
          governanceType,
          baseLoyaltyPoints,
          currentLoyaltyPoints,
          prevailingLoyaltyScore,
          sitModLivingConditions,
          sitModEquipment,
          sitModMoney,
          sitModSpecialists,
        },
      },
    }

    dispatch(editCovenant(data))
  }

  return (
    <Box
      sx={{
        ...commonBoxSx,
        background: 'rgba(0, 0, 0, 0.0)',
        p: 2,
      }}
    >
      <Typography variant="label">Inhabitants</Typography>

      <Stack direction="row" spacing={0}>
        <Typography variant="labelXs">Type of Governance:</Typography>
        <Input
          sx={{ ...plainInputSx, width: '50%' }}
          disableUnderline
          defaultValue={covenant.governanceType}
          onChange={({ target }) => setGovernanceType(target.value)}
        />
      </Stack>
      <Grid container>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">
              Base Loyalty Points (Due to Magi)
            </Typography>
            <Input
              sx={{ ...plainInputSx, width: '20%' }}
              disableUnderline
              defaultValue={covenant.baseLoyaltyPoints}
              onChange={({ target }) => setBaseLoyaltyPoints(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Current Loyalty Points:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '40%' }}
              disableUnderline
              defaultValue={covenant.currentLoyaltyPoints}
              onChange={({ target }) => setCurrentLoyaltyPoints(target.value)}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack direction="row" spacing={1}>
            <Typography variant="labelXs">Prevailing Loyalty Score:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '40%' }}
              disableUnderline
              defaultValue={covenant.prevailingLoyaltyScore}
              onChange={({ target }) => setPrevailingLoyaltyScore(target.value)}
            />
          </Stack>
        </Grid>
      </Grid>

      <Typography variant="labelSm" sx={{ color: '#555' }}>
        Situational Modifiers for...
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Stack direction="row">
            <Typography variant="labelXs">Living Conditions:</Typography>
            <Input
              sx={{ ...plainInputSx, width: '50%' }}
              disableUnderline
              defaultValue={covenant.sitModLivingConditions}
              onChange={({ target }) => setSitModLivingConditions(target.value)}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack direction="row">
            <Typography variant="labelXs">Equipment:</Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={covenant.sitModEquipment}
              onChange={({ target }) => setSitModEquipment(target.value)}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack direction="row">
            <Typography variant="labelXs">Money:</Typography>
            <Input
              sx={{ ...plainInputSx }}
              disableUnderline
              defaultValue={covenant.sitModMoney}
              onChange={({ target }) => setSitModMoney(target.value)}
            />
          </Stack>
        </Grid>
      </Grid>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </Box>
  )
}

export default Inhabitants
