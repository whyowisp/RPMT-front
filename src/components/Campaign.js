import { useSelector } from 'react-redux'

const Campaign = ({ id }) => {
  const campaign = useSelector((state) =>
    state.campaigns.find((campaign) => campaign.id === id)
  )
  if (!campaign) return null
  return <div>{JSON.stringify(campaign)}</div>
}

export default Campaign
