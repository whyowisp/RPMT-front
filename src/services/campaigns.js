import axios from 'axios'
const baseUrl = '/api/campaigns'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const campaignService = { getAll }

export default campaignService
