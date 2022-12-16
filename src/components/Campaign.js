import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentCampaign } from '../reducers/loggedPlayerReducer'

const Campaign = ({ id }) => {
  const campaign = useSelector((state) =>
    state.campaigns.find((campaign) => campaign.id === id)
  )
  const player = useSelector((state) => state.loggedPlayer)

  const dispatch = useDispatch()

  useEffect(() => {
    //This launches too early maybe move !campaign before this or whatever
    dispatch(setCurrentCampaign(campaign.id, player.id)) //Note! "players"-state will not be updated.
  }, [dispatch])

  if (!campaign) return null
  return <div>{JSON.stringify(campaign)}</div>
}

export default Campaign
