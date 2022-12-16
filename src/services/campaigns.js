import axios from 'axios'
const baseUrl = '/api/campaigns'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (campaign) => {
  const res = await axios.post(baseUrl + '/new', campaign)
  return res.data
}

const campaignService = { getAll, createNew }

export default campaignService
