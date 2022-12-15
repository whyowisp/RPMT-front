import axios from 'axios'
const baseUrl = '/api/campaigns'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (userId) => {
  const reqBody = { userId }
  const res = await axios.post(baseUrl + '/new', reqBody)
  return res.data
}

const campaignService = { getAll, createNew }

export default campaignService
